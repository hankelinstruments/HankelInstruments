/* ===============================================
   RENDER DEL CARRITO + CHECKOUT POR WHATSAPP
   ===============================================
   Mientras se termina de implementar la pasarela de pago
   propia (backend/generar-token.php + Izipay), todos los
   enlaces de compra y consulta del sitio van por WhatsApp.
   El pedido se arma como mensaje de texto (ver
   HankelCart.checkoutViaWhatsApp en js/carrito.js) y el
   link de pago se genera manualmente por Mercado Pago del
   lado del equipo, según la conversación con el cliente.
   =============================================== */

function cambiarCantidad(id, delta) {
    const item = window.HankelCart.getItems().find(i => i.id === id);
    if (!item) return;
    window.HankelCart.setQty(id, item.cantidad + delta);
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    window.HankelCart.remove(id);
    renderizarCarrito();
}

function renderizarCarrito() {
    const carrito = window.HankelCart.getItems();
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
            <div class="carrito-item-info">
                <strong>${item.nombre}</strong><br>
                <span class="carrito-item-precio">${typeof item.precio === 'number' ? 'S/ ' + item.precio.toFixed(2) : 'Consultar'}</span>
                <div class="carrito-qty">
                    <button onclick="cambiarCantidad('${item.id}', -1)">−</button>
                    <span>${item.cantidad}</span>
                    <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="carrito-eliminar" onclick="eliminarDelCarrito('${item.id}')">🗑️</button>
        </div>
    `).join('');

    const total = window.HankelCart.getTotal();
    document.getElementById('totalCarrito').textContent = `S/ ${total.toFixed(2)}`;
}

function continuarPorWhatsApp() {
    if (window.HankelCart.getItems().length === 0) return;
    window.HankelCart.checkoutViaWhatsApp();
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    document.getElementById('btnPagar')?.addEventListener('click', continuarPorWhatsApp);
});
