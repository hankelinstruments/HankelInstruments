#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
============================================================
 generar_productos.py — Hankel Instruments
============================================================
Convierte el Excel maestro de stock en el archivo de datos
que consume la web (js/productos-data.js).

USO
---
    python tools/generar_productos.py

    # o indicando rutas distintas
    python tools/generar_productos.py --excel MASTER_STOCK.xlsx --salida js/productos-data.js

QUÉ HACE
--------
  1. Lee la hoja del Excel maestro (por defecto la primera).
  2. Valida: IDs y slugs únicos, precios numéricos, campos obligatorios.
  3. Redondea los precios de venta a números enteros (sin decimales).
  4. NO exporta el costo ni el margen: son datos internos.
  5. Escribe js/productos-data.js con la lista lista para el sitio.

DEPENDENCIA
-----------
    pip install openpyxl
============================================================
"""
import argparse
import json
import re
import sys
import unicodedata
from datetime import datetime
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit("Falta openpyxl. Instálalo con:  pip install openpyxl")


# ---------------------------------------------------------------
# Correspondencia entre las columnas del Excel y las claves del JS.
# Si renombras una columna en el Excel, cámbiala aquí y nada más.
# ---------------------------------------------------------------
COLUMNAS = {
    "ID web (slug)":               "id",
    "ID":                          "sku",
    "Marca":                       "marca",
    "Familia":                     "familia",
    "Familia SoC":                 "familia_soc",
    "Categoría":                   "categoria",
    "Placa":                       "nombre",
    "Stock (unidades)":            "stock",
    "Imagen":                      "imagen",
    "SoC/Microcontrolador":        "soc",
    "Tipo":                        "tipo",
    "Precio de venta (S/.)":       "precio",
    "CPU/Arquitectura":            "cpu",
    "Núcleos":                     "nucleos",
    "Frecuencia (MHz)":            "frecuencia_mhz",
    "RAM":                         "ram",
    "Flash / Almacenamiento":      "flash",
    "Conectividad principal":      "conectividad_principal",
    "Conectividad y periféricos":  "perifericos",
    "IDE/Plataformas":             "ide",
    "Ficha":                       "ficha",
    "Link (documentación)":        "link",
}

# Columnas internas que NUNCA se publican en la web
NO_EXPORTAR = {"Costo (S/.)", "Margen bruto (%)", "Búsqueda AliExpress",
               "Título del proveedor", "Stock mínimo", "Archivo de imagen"}

OBLIGATORIOS = ["id", "nombre", "categoria", "precio", "imagen"]

# Sección de la web a la que pertenece cada categoría del Excel.
# Todo lo que no aparezca aquí cae en "mcu" por defecto.
SECCION_POR_CATEGORIA = {
    "MCU IoT":              "mcu",
    "MCU / Desarrollo":     "mcu",
    "Placas Linux / SBC":   "mcu",
    "Microchip Curiosity":  "mcu",
    "Arduino":              "mcu",
    "Arduino / STM32":      "mcu",
    "Instrumentos":         "instrumentos",
    "Sensores":             "instrumentos",
    "Cámaras climáticas":   "camaras",
}


def slugify(texto):
    t = unicodedata.normalize("NFKD", str(texto)).encode("ascii", "ignore").decode()
    return re.sub(r"-+", "-", re.sub(r"[^a-zA-Z0-9]+", "-", t).lower()).strip("-")


def limpiar(valor):
    """Normaliza una celda a texto plano."""
    if valor is None:
        return ""
    if isinstance(valor, float) and valor.is_integer():
        return str(int(valor))
    return str(valor).strip()


def leer_excel(ruta, hoja=None):
    wb = openpyxl.load_workbook(ruta, data_only=True)
    ws = wb[hoja] if hoja else wb.worksheets[0]

    encabezados = [limpiar(ws.cell(1, c).value) for c in range(1, ws.max_column + 1)]
    faltantes = [c for c in COLUMNAS if c not in encabezados]
    if faltantes:
        sys.exit(f"El Excel no tiene estas columnas: {', '.join(faltantes)}\n"
                 f"Columnas encontradas: {', '.join(encabezados)}")

    pos = {nombre: i + 1 for i, nombre in enumerate(encabezados)}

    productos, avisos = [], []
    for r in range(2, ws.max_row + 1):
        if not limpiar(ws.cell(r, pos["Placa"]).value):
            continue

        p = {}
        for col_excel, clave in COLUMNAS.items():
            p[clave] = limpiar(ws.cell(r, pos[col_excel]).value)

        # --- precio: entero, sin decimales ---
        crudo = ws.cell(r, pos["Precio de venta (S/.)"]).value
        try:
            p["precio"] = int(round(float(crudo)))
        except (TypeError, ValueError):
            avisos.append(f"fila {r}: precio no numérico ('{crudo}') en «{p['nombre']}»")
            p["precio"] = None

        # --- stock: entero ---
        try:
            p["stock"] = int(float(p["stock"] or 0))
        except ValueError:
            p["stock"] = 0

        # --- slug de respaldo ---
        if not p["id"]:
            p["id"] = slugify(p["nombre"])

        # --- sección de la web ---
        p["seccion"] = SECCION_POR_CATEGORIA.get(p["categoria"], "mcu")

        for campo in OBLIGATORIOS:
            if p.get(campo) in (None, ""):
                avisos.append(f"fila {r}: falta «{campo}» en «{p['nombre']}»")

        productos.append(p)

    return productos, avisos


def validar(productos):
    """Devuelve la lista de errores encontrados."""
    errores = []
    for clave, etiqueta in [("id", "slug"), ("sku", "ID"), ("imagen", "código de imagen")]:
        vistos = {}
        for p in productos:
            v = p.get(clave)
            if not v:
                continue
            if v in vistos:
                errores.append(f"{etiqueta} repetido «{v}»: «{vistos[v]}» y «{p['nombre']}»")
            vistos[v] = p["nombre"]

    for p in productos:
        if p["precio"] is None:
            errores.append(f"«{p['nombre']}» no tiene precio válido")
        elif p["precio"] <= 0:
            errores.append(f"«{p['nombre']}» tiene precio {p['precio']}")
    return errores


def escribir_js(productos, destino, origen):
    orden_claves = ["id", "sku", "seccion", "categoria", "marca", "familia", "familia_soc",
                    "nombre", "imagen", "soc", "tipo", "precio", "stock", "cpu", "nucleos",
                    "frecuencia_mhz", "ram", "flash", "conectividad_principal",
                    "perifericos", "ide", "ficha", "link"]

    limpios = [{k: p[k] for k in orden_claves if k in p} for p in productos]
    cuerpo = json.dumps(limpios, ensure_ascii=False, indent=2)

    contenido = f"""/* ============================================================
   js/productos-data.js — Hankel Instruments
   ------------------------------------------------------------
   ARCHIVO GENERADO AUTOMÁTICAMENTE. NO LO EDITES A MANO.

   Para actualizar el catálogo:
     1. Edita el Excel maestro ({Path(origen).name})
     2. Ejecuta:  python tools/generar_productos.py
     3. Sube el archivo generado a GitHub

   Cualquier cambio hecho aquí se perderá en la próxima
   generación. Los precios están en soles, sin decimales.
   Generado: {datetime.now().strftime('%d/%m/%Y %H:%M')}
   Productos: {len(limpios)}
   ============================================================ */

window.PRODUCTS_DATA = {cuerpo};
"""
    Path(destino).parent.mkdir(parents=True, exist_ok=True)
    Path(destino).write_text(contenido, encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description="Genera js/productos-data.js desde el Excel maestro.")
    ap.add_argument("--excel", default="MASTER_STOCK_INTEGRADO.xlsx", help="Ruta del Excel maestro")
    ap.add_argument("--hoja", default=None, help="Nombre de la hoja (por defecto, la primera)")
    ap.add_argument("--salida", default="js/productos-data.js", help="Archivo JS de salida")
    args = ap.parse_args()

    if not Path(args.excel).exists():
        sys.exit(f"No encuentro el Excel: {args.excel}")

    productos, avisos = leer_excel(args.excel, args.hoja)
    errores = validar(productos)

    print(f"Leídos {len(productos)} productos de {args.excel}")

    if avisos:
        print(f"\nAvisos ({len(avisos)}):")
        for a in avisos[:15]:
            print("   -", a)

    if errores:
        print(f"\nERRORES ({len(errores)}) — no se generó el archivo:")
        for e in errores[:15]:
            print("   *", e)
        sys.exit(1)

    escribir_js(productos, args.salida, args.excel)

    por_seccion = {}
    for p in productos:
        por_seccion[p["seccion"]] = por_seccion.get(p["seccion"], 0) + 1

    print(f"\nGenerado: {args.salida}")
    for s, n in sorted(por_seccion.items()):
        print(f"   {s:14s} {n:3d} productos")
    bajo50 = sum(1 for p in productos if p["precio"] < 50)
    print(f"   {'bajo S/.50':14s} {bajo50:3d} productos")
    print(f"\nRango de precios: S/.{min(p['precio'] for p in productos)} "
          f"– S/.{max(p['precio'] for p in productos)}")


if __name__ == "__main__":
    main()
