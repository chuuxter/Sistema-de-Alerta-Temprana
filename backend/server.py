from pathlib import Path
from typing import Dict, List
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
PREFIJO = "rf_"                         # rf_Algebra.joblib -> curso "Algebra"

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
    """'Álgebra ' -> 'algebra' (sin tildes, minúsculas; '_' cuenta como espacio)."""
    t = unicodedata.normalize("NFD", texto.replace("_", " "))
    t = "".join(c for c in t if unicodedata.category(c) != "Mn")
    return " ".join(t.lower().split())


def normalizar_col(texto: str) -> str:
    """Para comparar nombres de columnas: ignora tildes, mayúsculas, comas y paréntesis."""
    t = normalizar(texto)
    t = "".join(ch for ch in t if ch.isalnum() or ch == " ")
    return " ".join(t.split())


# ---------------------------------------------------------------
# MODELOS DE PREDICCIÓN (acepta modelo directo o paquete dict)
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
#
# Numeración del cuestionario (11 preguntas):
#   P1 género            P2 con quién vive     P3 nivel papá
#   P4 nivel mamá        P5 estudia fuera      P6 entorno de estudio
#   P7 horas de estudio  P8 comidas al día     P9 internet
#   P10 trabajo          P11 responsabilidades domésticas
# ---------------------------------------------------------------
NIVELES = {
    "a": "Primaria",
    "b": "Secundaria",
    "c": "Superior técnico",
    "d": "Superior Universitario",
    "e": "Estudios de posgrado",
    "f": None,
}

MAPA = {
    "P2": {"a": None, "b": "Solo con mi mamá", "c": "Solo con mi papá",
           "d": "Otros (abuelos, tíos, tutor, etc.)"},
    "P7": {"a": None, "b": "Entre 1 y 2 horas", "c": "Entre 2 y 3 horas",
           "d": "Más de 3 horas"},
    "P8": {"a": None, "b": "Dos comidas al día", "c": "Tres comidas al día",
           "d": "Cuatro o más comidas al día"},
    "P9": {"a": "Sí, con internet estable",
           "b": "Sí, pero a veces se corta o es lento",
           "c": None,
           "d": None},
    "P10": {"a": None, "b": "Trabajo solo fines de semana o vacaciones",
            "c": "Trabajo algunas horas entre semana",
            "d": "Trabajo todos los días después del colegio"},
    "P11": {"a": None, "b": "Ayudo en casa, pero no interfiere con mis estudios",
            "c": "Tengo bastantes y a veces interfieren con mis estudios",
            "d": "Tengo muchas y casi siempre interfieren con mis estudios"},
}


class Respuestas(BaseModel):
    genero: str
    con_quien_vive: str
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
    return {
        "cursos_disponibles": list(MODELOS.keys()),
        "vark_disponible": VARK is not None,
    }


@app.post("/predecir/{curso}")
def predecir(curso: str, r: Respuestas):
    clave = normalizar(curso)
    modelo = MODELOS.get(clave)
    if modelo is None:
        raise HTTPException(404, f"Curso no disponible: {curso}")

    columnas = COLUMNAS[clave]

    # tolera espacios al final, tildes, mayúsculas y comas en los nombres
    idx = {normalizar_col(c): c for c in columnas}
    fila = {c: 0 for c in columnas}

    def columna(nombre):
        k = normalizar_col(nombre)
        if k not in idx:
            prefijo = nombre.split("_")[0]
            similares = [c.strip() for c in columnas
                         if c.strip().split("_")[0] == prefijo]
            raise HTTPException(
                500,
                f"Columna no encontrada en el modelo: {nombre}. "
                f"Columnas {prefijo} del modelo: {similares}",
            )
        return idx[k]

    def activar(nombre):
        if nombre is not None:
            fila[columna(nombre)] = 1

    # Binarias
    fila[columna("P1_Hombre")] = 1 if r.genero == "a" else 0
    fila[columna("P5")] = 1 if r.estudia_fuera_horario == "a" else 0   # a = Sí
    fila[columna("P6")] = 1 if r.entorno_estudio == "a" else 0         # a = Sí

    # Con quién vive (P2). Si el modelo se entrenó sin esta pregunta, se ignora.
    vive = elegir(MAPA["P2"], r.con_quien_vive, "con_quien_vive")
    if vive and any(c.strip().startswith("P2_") for c in columnas):
        activar(f"P2_{vive}")

    # Padres (antes P2 y P3, ahora P3 y P4)
    papa = elegir(NIVELES, r.nivel_academico_papa, "nivel_academico_papa")
    mama = elegir(NIVELES, r.nivel_academico_mama, "nivel_academico_mama")
    if papa:
        activar(f"P3_{papa}")
    if mama:
        activar(f"P4_{mama}")
    fila[columna("TieneAmbosPadres")] = 1 if (papa and mama) else 0

    # Categóricas
    for pregunta, letra, campo in [
        ("P7", r.horas_estudio, "horas_estudio"),
        ("P8", r.comidas_dia, "comidas_dia"),
        ("P9", r.acceso_internet, "acceso_internet"),
        ("P10", r.trabajo_fuera_horario, "trabajo_fuera_horario"),
        ("P11", r.responsabilidades_domesticas, "responsabilidades_domesticas"),
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

# ---------------------------------------------------------------
# VARK (clasificación de estilo de aprendizaje)
# Si falla al cargar, NO afecta a la predicción.
# ---------------------------------------------------------------
VARK = None
try:
    _vark = joblib.load(MODELOS_DIR / "modelo_vark.joblib")
    VARK = {
        "modelo": _vark["modelo"],
        "scaler": _vark["scaler"],
        "le": _vark["label_encoder"],
        "columnas": _vark["columnas"],
    }
    print("Modelo VARK cargado")
except Exception as e:
    print(f"ATENCIÓN: no se pudo cargar el modelo VARK: {type(e).__name__}: {e}")


class EntradaVark(BaseModel):
    respuestas: Dict[str, List[str]]


@app.post("/clasificar")
def clasificar(datos: EntradaVark):
    if VARK is None:
        raise HTTPException(503, "El modelo VARK no está disponible en este servidor")

    fila = {c: 0 for c in VARK["columnas"]}
    for id_preg, letras in datos.respuestas.items():
        for letra in letras:
            col = f"{letra}{id_preg}"
            if col in fila:
                fila[col] = 1

    X = pd.DataFrame([fila], columns=VARK["columnas"])
    X_in = VARK["scaler"].transform(X) if VARK["scaler"] is not None else X

    proba = VARK["modelo"].predict_proba(X_in)[0]
    idx = int(proba.argmax())
    return {
        "estilo": VARK["le"].inverse_transform([idx])[0],
        "probabilidades": {c: float(p) for c, p in zip(VARK["le"].classes_, proba)},
    }