"""
Genera las imagenes faltantes del sitio de Hankel Instruments usando la API
de Gemini (Imagen 4.0) y las guarda en /images con el nombre esperado por el HTML.

Uso:
    python scripts/generate_images.py            # genera todas las faltantes
    python scripts/generate_images.py bg-fabricacion.jpg   # genera solo una
"""
import os
import sys
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

from google import genai
from google.genai import types

MODEL = "imagen-4.0-generate-001"
STYLE = (
    "Fotografia profesional de ingenieria industrial, paleta azul petroleo oscuro "
    "y turquesa (#0d1117, #151a24, #3a7a8e, #5b9aaa, #7db5c4), iluminacion cinematografica "
    "de bajo contraste, ambiente tecnico y confiable, sin texto ni logotipos, "
    "sin personas, sin manos, sin rostros, escena vacia enfocada solo en equipos e "
    "instrumentos, composicion limpia apta para superponer texto blanco encima."
)
NEGATIVE_PROMPT = "personas, gente, humanos, manos, rostros, cuerpo, siluetas humanas"

IMAGES = {
    "bg-fabricacion.jpg": (
        "Taller de electronica de precision: placa de circuito impreso a medio ensamblar "
        "sobre una mesa de trabajo, estacion de soldadura encendida, osciloscopio y "
        "herramientas de precision ordenadas, sin nadie presente. " + STYLE
    ),
    "bg-capacitacion.jpg": (
        "Sala de capacitacion tecnica vacia: pantalla proyectando diagramas tecnicos y "
        "graficos de incertidumbre de medicion, pizarra con formulas, filas de sillas y "
        "laptops abiertas sobre las mesas, ambiente de aula corporativa sin personas. " + STYLE
    ),
    "bg-instrumentacion.jpg": (
        "Fotografia macro de placas de desarrollo, microcontroladores, sensores y modulos "
        "electronicos organizados sobre una mesa de laboratorio, cables y componentes de "
        "precision, enfoque tecnico detallado, sin personas. " + STYLE
    ),
    "bg-proyectos-hero.jpg": (
        "Banner panoramico ancho: planos y esquemas tecnicos desplegados sobre una mesa "
        "junto a equipo de laboratorio de metrologia e instrumentos de medicion, escena sin "
        "personas, composicion horizontal amplia. " + STYLE
    ),
    "bg-academy-hero.jpg": (
        "Banner panoramico ancho para una academia tecnica: aula moderna de formacion en "
        "metrologia, pizarra con formulas de incertidumbre, instrumentos de calibracion "
        "sobre la mesa, sala vacia sin personas, composicion horizontal amplia. " + STYLE
    ),
    "proyecto-acreditacion.jpg": (
        "Laboratorio de metrologia acreditado bajo ISO/IEC 17025: instrumentos de "
        "calibracion, certificados y equipos de referencia trazables ordenados sobre la "
        "mesa, tablet mostrando un checklist digital apoyada sobre la mesa, ambiente de "
        "control de calidad sin personas. " + STYLE
    ),
    "proyecto-hardware.jpg": (
        "Diseno y fabricacion de hardware especializado: placas de circuito impreso en "
        "proceso de ensamblado, componentes SMD bajo microscopio, estacion de trabajo "
        "electronica con multimetro y fuente de poder, sin personas. " + STYLE
    ),
    "proyecto-ensayos.jpg": (
        "Laboratorio de ensayos especializados con equipo de espectroscopia FTIR y "
        "microscopio SEM, muestra de material lista para analisis, pantallas mostrando "
        "espectros y graficos de analisis elemental, sin personas. " + STYLE
    ),
    "proyecto-software.jpg": (
        "Sala de control con monitores mostrando un panel de adquisicion de datos en "
        "tiempo real, graficos y curvas de sensores, interfaz de software de laboratorio "
        "con tema oscuro y acentos turquesa, sin personas. " + STYLE
    ),
}

OUT_DIR = ROOT / "images"


def main():
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("ERROR: GEMINI_API_KEY no encontrada en .env")
        sys.exit(1)

    targets = sys.argv[1:] or list(IMAGES.keys())
    client = genai.Client(api_key=api_key)

    for name in targets:
        if name not in IMAGES:
            print(f"SKIP: '{name}' no esta en la lista de imagenes conocidas")
            continue

        out_path = OUT_DIR / name
        print(f"Generando {name} ...")
        response = client.models.generate_images(
            model=MODEL,
            prompt=IMAGES[name],
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
                output_mime_type="image/jpeg",
                person_generation="dont_allow",
                negative_prompt=NEGATIVE_PROMPT,
            ),
        )
        if not response.generated_images:
            print(f"  ERROR: sin resultado para {name}")
            continue

        image_bytes = response.generated_images[0].image.image_bytes
        out_path.write_bytes(image_bytes)
        print(f"  OK -> {out_path}")


if __name__ == "__main__":
    main()
