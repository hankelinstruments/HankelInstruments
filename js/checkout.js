/* ===============================================
   RENDER DEL CARRITO + CHECKOUT CON IZIPAY
   ===============================================
   IMPORTANTE: el token de pago (formToken) se pide
   a backend/generar-token.php, que es el ÚNICO lugar
   donde vive tu Clave API secreta de Izipay. Nunca la
   pongas aquí en el JS del navegador.
   =============================================== */

// 🔧 Cambia esto por la URL real donde subas backend/generar-token.php
const ENDPOINT_GENERAR_TOKEN = "/backend/generar-token.php";

// 🔧 Tu Clave Pública de Izipay (esta SÍ es segura de exponer en el navegador)
const IZIPAY_CLAVE_PUBLICA = "TEST_PUBLICKEY_xxxxxxxxxxxxxxxxxxxxxxxxxxxx";

function renderizarCarrito() {
    const carrito = obtenerCarrito();
    const container = document.getElementById('carritoItems');
    const resumenContainer = document.getElementById('resumenContainer');
    if (!container) return;

    if (carrito.length === 0) {
        container.innerHTML = `<div class="carrito-vacio">
            <p>🛒 Tu carrito está vacío</p>
            <a href="productos.html" class="btn" style="margin-top:16px;">Ver productos</a>
        </div>`;
        if (resumenContainer) resumenContainer.style.display = 'none';
        return;
    }

    if (resumenContainer) resumenContainer.style.display = 'block';

    container.innerHTML = carrito.map(item => `
        <div class="carrito-item">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
                <strong>${item.nombre}</strong><br>
                <span class="carrito-item-precio">S/ ${item.precio.toFixed(2)}</span>
                ${item.tipo === 'curso' ? ' <span style="color:#9aa3b5;font-size:0.8rem;">(curso virtual)</span>' : ''}
                <div class="carrito-qty">
                    <button onclick="cambiarCantidad('${item.id}', '${item.tipo}', -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad('${item.id}', '${item.tipo}', 1)">+</button>
                </div>
            </div>
            <button class="carrito-eliminar" onclick="eliminarDelCarrito('${item.id}', '${item.tipo}')">🗑️</button>
        </div>
    `).join('');

    const total = calcularTotalCarrito();
    document.getElementById('totalCarrito').textContent = `S/ ${total.toFixed(2)}`;
}

// ===== CHECKOUT CON IZIPAY =====
async function iniciarPagoIzipay() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) return;

    const total = calcularTotalCarrito();
    const boton = document.getElementById('btnPagar');
    boton.disabled = true;
    boton.textContent = 'Generando pago seguro...';

    try {
        // 1. Pedimos el "formToken" a NUESTRO backend (no a Izipay directamente)
        const res = await fetch(ENDPOINT_GENERAR_TOKEN, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                monto: total, // en soles, el backend lo convierte a céntimos
                orden: 'HANKEL-' + Date.now(),
                items: carrito
            })
        });

        if (!res.ok) throw new Error('No se pudo generar el token de pago');
        const data = await res.json();

        // 2. Inicializamos el formulario embebido de Izipay con ese token
        document.getElementById('izipayFormContainer').style.display = 'block';
        KR.setFormConfig({
            formToken: data.formToken,
            'kr-public-key': IZIPAY_CLAVE_PUBLICA
        });
        await KR.attachForm('#izipayForm');
        await KR.showForm('#izipayForm');

        boton.style.display = 'none';

        // 3. Cuando el pago se confirme, limpiamos el carrito
        KR.onSubmit((paymentData) => {
            if (paymentData?.clientAnswer?.orderStatus === 'PAID') {
                localStorage.removeItem(CARRITO_KEY);
                window.location.href = 'gracias.html';
            }
            return true;
        });

    } catch (err) {
        console.error(err);
        alert('Hubo un problema iniciando el pago. Intenta de nuevo o contáctanos.');
        boton.disabled = false;
        boton.textContent = '💳 Pagar con Izipay';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    document.getElementById('btnPagar')?.addEventListener('click', iniciarPagoIzipay);
});
