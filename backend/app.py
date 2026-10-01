import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

paquete = joblib.load("modelo_vark.joblib")
modelo, scaler = paquete["modelo"], paquete["scaler"]
le, columnas = paquete["label_encoder"], paquete["columnas"]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Entrada(BaseModel):
    respuestas: dict[str, list[str]]

@app.post("/clasificar")
def clasificar(datos: Entrada):
    fila = {c: 0 for c in columnas}
    for id_preg, letras in datos.respuestas.items():
        for letra in letras:
            col = f"{letra}{id_preg}"
            if col in fila:
                fila[col] = 1

    X = pd.DataFrame([fila], columns=columnas)
    X_in = scaler.transform(X) if scaler is not None else X

    proba = modelo.predict_proba(X_in)[0]
    idx = int(proba.argmax())
    return {
        "estilo": le.inverse_transform([idx])[0],
        "probabilidades": {c: float(p) for c, p in zip(le.classes_, proba)},
    }