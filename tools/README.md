# tools/ — Generación del catálogo

## Flujo de trabajo

```
MASTER_STOCK_INTEGRADO.xlsx  ──►  tools/generar_productos.py  ──►  js/productos-data.js
        (editas tú)                    (script)                     (generado, no editar)
```

## Actualizar el catálogo

1. Edita el Excel maestro: precios, stock, productos nuevos.
2. Coloca el Excel en la raíz del repo con el nombre `MASTER_STOCK_INTEGRADO.xlsx`.
3. Ejecuta:

```bash
pip install openpyxl          # solo la primera vez
python tools/generar_productos.py
```

4. Revisa que no haya errores y haz commit de `js/productos-data.js`.

## Opciones

```bash
python tools/generar_productos.py --excel otro.xlsx --salida js/productos-data.js
python tools/generar_productos.py --hoja "MASTER"
```

## Validaciones automáticas

El script se detiene y NO genera el archivo si encuentra:

- IDs, slugs o códigos de imagen repetidos
- Precios no numéricos, cero o negativos

Si faltan campos no críticos, avisa pero continúa.

## Qué NO se publica

El costo, el margen y el enlace de compra en AliExpress se quedan
en el Excel. El archivo generado solo lleva el precio de venta.

## Precios

Se redondean a números enteros de soles, sin decimales.

## Secciones

La sección de la web se asigna según la columna `Categoría`, con el mapa
`SECCION_POR_CATEGORIA` que está dentro del script:

| Categoría en el Excel | Sección web |
|---|---|
| MCU IoT, MCU / Desarrollo, Placas Linux / SBC, Microchip Curiosity, Arduino, Arduino / STM32 | `mcu` |
| Instrumentos, Sensores | `instrumentos` |
| Cámaras climáticas | `camaras` |

Cualquier categoría no listada cae en `mcu`. Para dar de alta productos
en las otras dos secciones, basta con usar esas categorías en el Excel.
