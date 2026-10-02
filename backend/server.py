from pathlib import Path
import traceback
import unicodedata

import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ---------------------------------------------------------------
# Configuración
# ---------------------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent
MODELOS_DIR = BASE_DIR / "Modelos_ML"   # carpeta junto a server.py
PREFIJO = "rf_"                     # rf3_Algebra.joblib -> curso "Algebra"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
    ],  # cambia por tu dominio al publicar
    allow_methods=["*"],
    allow_headers=["*"],
)


def normalizar(texto: str) -> str:
    """'Álgebra ' -> 'algebra' (sin tildes, minúsculas)."""
    t = unicodedata.normalize("NFD", texto)
    return "".join(c for c in t if unicodedata.category(c) != "Mn").lower().strip()


# ---------------------------------------------------------------
# Carga de modelos (acepta modelo directo o paquete dict)
# ---------------------------------------------------------------
MODELOS = {}
COLUMNAS = {}

print("Buscando en:", MODELOS_DIR)
for ruta in MODELOS_DIR.glob(f"{PREFIJO}*.joblib"):
    curso = ruta.stem[len(PREFIJO):]
    obj = joblib.load(ruta)

    if isinstance(obj, dict):
        modelo = obj["modelo"]
        columnas = obj.get("columnas") or list(modelo.feature_names_in_)
    else:
        modelo = obj
        columnas = list(modelo.feature_names_in_)

    clave = normalizar(curso)
    MODELOS[clave] = modelo
    COLUMNAS[clave] = columnas
    print(f"Modelo cargado: {curso} ({len(columnas)} columnas)")

if not MODELOS:
    print(f"ATENCIÓN: no se encontraron modelos en {MODELOS_DIR}")

# ---------------------------------------------------------------
# Mapeo de las letras del cuestionario a las columnas del modelo
# None = categoría base (todas las dummies de esa pregunta en 0)
# ---------------------------------------------------------------
NIVELES = {
    "a": "Primaria",
    "b": "Secundaria",
    "c": "Superior técnico",
    "d": "Superior Universitario",   # U mayúscula, como en tu dataset
    "e": "Estudios de posgrado",
    "f": None,                       # No tengo papá / mamá
}

MAPA = {
    "P6": {"a": None, "b": "Entre 1 y 2 horas", "c": "Entre 2 y 3 horas",
           "d": "Más de 3 horas"},
    "P7": {"a": None, "b": "Dos comidas al día", "c": "Tres comidas al día",
           "d": "Cuatro o más comidas al día"},
    "P8": {"a": "Si, tengo internet estable todo el tiempo",
           "b": "Si, pero a veces se corta o es lento",
           "c": None,   # "Solo a veces": sin columna propia, verifica con tu dataset
           "d": None},
    "P9": {"a": None, "b": "Trabajo ocasionalmente (fines de semana o vacaciones)",
           "c": "Trabajo algunas horas entre semana",
           "d": "Trabajo todos los días después del colegio"},
    "P10": {"a": None, "b": "Ayudo en casa pero no interfiere con mis estudios",
            "c": "Tengo bastantes responsabilidades que a veces interfieren",
            "d": "Tengo muchas responsabilidades que frecuentemente interfieren con mis estudios"},
}


class Respuestas(BaseModel):
    genero: str
    nivel_academico_papa: str
    nivel_academico_mama: str
    estudia_fuera_horario: str
    entorno_estudio: str
    horas_estudio: str
    comidas_dia: str
    acceso_internet: str
    trabajo_fuera_horario: str
    responsabilidades_domesticas: str


def elegir(mapa: dict, letra: str, campo: str):
    if letra not in mapa:
        raise HTTPException(422, f"Respuesta inválida en '{campo}': {letra}")
    return mapa[letra]


@app.get("/")
def estado():
    return {"cursos_disponibles": list(MODELOS.keys())}


@app.post("/predecir/{curso}")
def predecir(curso: str, r: Respuestas):
    clave = normalizar(curso)
    modelo = MODELOS.get(clave)
    if modelo is None:
        raise HTTPException(404, f"Curso no disponible: {curso}")

    columnas = COLUMNAS[clave]
    print("COLUMNAS DEL MODELO:", columnas)   # temporal, bórralo cuando todo funcione

    idx = {c.strip(): c for c in columnas}    # tolera espacios al final
    fila = {c: 0 for c in columnas}

    def columna(nombre):
        if nombre not in idx:
            raise HTTPException(500, f"Columna no encontrada en el modelo: {nombre}")
        return idx[nombre]

    def activar(nombre):
        if nombre is not None:
            fila[columna(nombre)] = 1

    # Binarias
    fila[columna("P1_Hombre")] = 1 if r.genero == "a" else 0
    fila[columna("P4")] = 1 if r.estudia_fuera_horario == "a" else 0   # a = Sí
    fila[columna("P5")] = 1 if r.entorno_estudio == "a" else 0         # a = Sí

    # Padres
    papa = elegir(NIVELES, r.nivel_academico_papa, "nivel_academico_papa")
    mama = elegir(NIVELES, r.nivel_academico_mama, "nivel_academico_mama")
    if papa:
        activar(f"P2_{papa}")
    if mama:
        activar(f"P3_{mama}")
    fila[columna("TieneAmbosPadres")] = 1 if (papa and mama) else 0

    # Categóricas
    for pregunta, letra, campo in [
        ("P6", r.horas_estudio, "horas_estudio"),
        ("P7", r.comidas_dia, "comidas_dia"),
        ("P8", r.acceso_internet, "acceso_internet"),
        ("P9", r.trabajo_fuera_horario, "trabajo_fuera_horario"),
        ("P10", r.responsabilidades_domesticas, "responsabilidades_domesticas"),
    ]:
        nombre = elegir(MAPA[pregunta], letra, campo)
        if nombre:
            activar(f"{pregunta}_{nombre}")

    # Predicción (si falla, el error real llega al navegador y a la terminal)
    try:
        X = pd.DataFrame([fila])[columnas]
        pred = modelo.predict(X)[0]
        proba = modelo.predict_proba(X)[0]
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(500, f"Error del modelo: {type(e).__name__}: {e}")

    # Label booleano: False = en riesgo, True = aprueba
    en_riesgo = str(pred).lower() == "false"
    probs = {str(c).lower(): float(p) for c, p in zip(modelo.classes_, proba)}

    return {
        "en_riesgo": en_riesgo,
        "prob_riesgo": round(probs.get("false", 0.0), 3),
        "prob_aprueba": round(probs.get("true", 0.0), 3),
    }