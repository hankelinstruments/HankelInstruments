# Hankel Instruments — Sitio web

## 📁 Estructura del proyecto

```
hankel-web/
├── index.html          → Página de inicio
├── productos.html      → Catálogo (lee stock desde Google Sheets)
├── academia.html       → Hankel Academy (cursos, S/30/hora)
├── carrito.html        → Carrito + botón de pago Izipay
├── admin.html          → Panel para gestionar inventario
├── gracias.html        → Confirmación post-compra
├── css/style.css        → Todos los estilos (tipografía estilo Tesla: Inter)
├── js/
│   ├── config.js         → 🔑 ÚNICO archivo con el ID de tu Google Sheet
│   ├── main.js           → Menú, logo, scroll
│   ├── carrito.js        → Lógica del carrito (compartida en todo el sitio)
│   ├── productos.js      → Lee productos desde Google Sheets
│   ├── academia.js       → Lista de cursos
│   ├── checkout.js       → Renderiza carrito + inicia pago Izipay
│   └── admin.js          → Panel de inventario
├── backend/
│   ├── generar-token.php → ÚNICO archivo con lógica de servidor (Izipay)
│   └── ipn.php            → Confirmación de pago servidor-a-servidor (opcional pero recomendado)
├── logo.jpg              → Tu logo (el mismo que ya tienes en tu repo)
└── flag.png               → Fondo del hero (el mismo que ya tienes en tu repo)
```

Todo es HTML/CSS/JS puro, **excepto** `backend/generar-token.php` (y opcionalmente
`backend/ipn.php`), que son los únicos dos archivos con código de servidor —
son indispensables porque Izipay exige mantener tu clave secreta fuera del navegador.

**Tipografía**: se usa [Inter](https://fonts.google.com/specimen/Inter) (Google
Fonts, gratuita) para lograr el look geométrico/minimalista tipo Tesla —
títulos en mayúsculas de peso alto, texto de cuerpo delgado. No se usa la
tipografía propietaria real de Tesla porque tiene licencia comercial cerrada.

---

## 🧩 Paso 1: Conecta tu Google Sheet (stock con Excel)

Ahora esto se hace desde el propio sitio, con el botón 🔒 **Admin** en el menú:

1. Crea tu hoja en [sheets.google.com](https://sheets.google.com) con la pestaña
   llamada exactamente `Productos` y encabezados en la fila 1:
   ```
   codigo | nombre | precio | stock | descripcion | imagen
   ```
2. ¿Ya tienes tu Excel armado? **Archivo → Importar → Subir** tu `.xlsx` →
   "Reemplazar hoja actual".
3. Para imágenes: sube cada foto a Google Drive ("Obtener enlace" → "Cualquier
   persona con el enlace") y pega ese link en la columna `imagen`.
4. Comparte la hoja como "Cualquiera con el enlace: **Lector**" (para que la
   web pueda leerla) — pero solo tú debes tener acceso de **Editor**.
5. En tu sitio, entra a `admin.html` (ícono 🔒 en el menú), pega la URL o el
   ID de tu Sheet en el campo de arriba, y presiona **Conectar**. Verás la
   vista previa de tus productos ahí mismo.
6. Copia el código que te aparece (`const SHEET_ID = "...";`) y pégalo en
   `js/config.js` en tu repo de GitHub (edítalo directo en github.com con el
   ícono del lápiz, o vuelve a subir el archivo) — **este paso es el que hace
   que el cambio se vea para todos tus visitantes**, no solo en tu navegador.

✅ Listo: ahora `productos.html` y `admin.html` leen tu inventario en vivo.

---

## 💳 Paso 2: Configura Izipay

### 2.1 Afiliación y credenciales
1. Afíliate en [izipay.pe](https://www.izipay.pe) con tu asesor comercial.
2. Entra al **Back Office Vendedor** → sección **API REST** → "Ver claves".
   Ahí obtienes:
   - Identificador de tienda (`USERNAME`)
   - Clave de Test / Clave de Producción (`PASSWORD`)
   - Clave Pública de Test / Producción (`PUBLIC_KEY`)
   - Clave HMAC-SHA-256 (para validar el IPN)

### 2.2 Configura el backend (`backend/generar-token.php`)
Abre el archivo y reemplaza:
```php
define('IZIPAY_USERNAME', 'CHANGE_ME_ID_TIENDA');
define('IZIPAY_PASSWORD', 'CHANGE_ME_CLAVE_TEST');
```
con tus credenciales reales (empieza con las de **Test**).

Sube este archivo a un hosting con soporte PHP (casi cualquier hosting
compartido peruano lo tiene: subes por FTP o el administrador de archivos de
tu panel cPanel/Plesk).

### 2.3 Configura el frontend
En `carrito.html`, reemplaza:
```html
kr-public-key="TEST_PUBLICKEY_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```
y en `js/checkout.js`:
```js
const IZIPAY_CLAVE_PUBLICA = "TEST_PUBLICKEY_xxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const ENDPOINT_GENERAR_TOKEN = "/backend/generar-token.php"; // ajusta la ruta según tu hosting
```

### 2.4 Configura el IPN (recomendado)
En el Back Office Vendedor → API REST → Notificación IPN, pega la URL pública
de `backend/ipn.php` (ej: `https://tudominio.com/backend/ipn.php`), y en ese
archivo reemplaza `IZIPAY_PASSWORD` con la misma clave que usaste en
`generar-token.php`.

### 2.5 Prueba en modo Sandbox
El script de `carrito.html` ya apunta a
`https://sandbox-checkout.izipay.pe/...` — úsalo con tarjetas de prueba
(Izipay te las da en su documentación) antes de pasar a producción.

### 2.6 Pasar a producción
Cuando todo funcione en pruebas:
1. Cambia `sandbox-checkout.izipay.pe` por el dominio de producción que te
   indique tu Back Office.
2. Cambia las claves de Test por las de Producción en los 3 lugares
   (`generar-token.php`, `ipn.php`, `carrito.html`/`checkout.js`).

---

## 🎓 Paso 3: Hankel Academy

Los cursos están en `js/academia.js` como una lista simple (arreglo). El
precio por hora está en la constante `PRECIO_HORA = 30.00`. Para agregar un
curso nuevo, solo copia un bloque como este dentro del arreglo `cursos`:
```js
{ id: "CUR05", nombre: "Nombre del curso", horas: 3, descripcion: "...", imagen: "" },
```
El precio total se calcula solo (`horas × 30`). Si más adelante quieres
gestionar cursos igual que el stock (desde Google Sheets), se hace exactamente
igual que en `productos.js`, solo apuntando a otra pestaña del mismo Sheet
(ej. una pestaña llamada "Cursos").

---

## 🔒 Paso 4: Panel Admin (`admin.html`)

Cambia la clave de acceso básica en `js/admin.js`:
```js
const ADMIN_CLAVE = "hankel2026";
```
Recuerda: esto es solo un filtro de cortesía (cualquier sitio 100% estático
no puede tener un login real sin servidor). La seguridad real de tu
inventario está en los permisos de edición de tu Google Sheet — compártelo
en modo "Editor" únicamente con tu cuenta.

---

## 🌐 Paso 5: Subir el sitio a internet

Como es HTML/CSS/JS puro + 2 archivos PHP, cualquier hosting compartido con
PHP funciona (Hostinger, GoDaddy, etc.), subiendo todo por FTP o el
administrador de archivos. También puedes usar Netlify/Vercel para el sitio
estático y solo el `backend/` en un hosting con PHP aparte — en ese caso,
ajusta `ENDPOINT_GENERAR_TOKEN` en `checkout.js` a la URL completa
(ej: `https://tuhosting.com/backend/generar-token.php`).

---

## ✅ Checklist rápido antes de lanzar

- [ ] Confirmar que `logo.jpg` y `flag.png` están en la raíz del repo (ya los tienes)
- [ ] Conectar Google Sheet desde `admin.html` y pegar el código en `js/config.js`
- [ ] Pegar credenciales de Izipay (Test) en `generar-token.php`, `ipn.php`, `carrito.html`, `checkout.js`
- [ ] Probar una compra completa en modo Sandbox
- [ ] Cambiar clave de `admin.html` (`ADMIN_CLAVE` en `js/admin.js`)
- [ ] Configurar el IPN en el Back Office de Izipay
- [ ] Pasar credenciales y URLs a modo Producción
- [ ] Subir todo al hosting
