/* ===============================================
   CARRITO DE COMPRAS - COMPARTIDO EN TODO EL SITIO
   Usa localStorage: el carrito persiste mientras el
   usuario navega entre productos.html, academia.html
   y carrito.html (en el MISMO navegador).
   =============================================== */

const CARRITO_KEY = 'hankel_carrito';

function obtenerCarrito() {
    const data = localStorage.getItem(CARRITO_KEY);
    return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
    actualizarBadgeCarrito();
}

// tipo: 'producto' o 'curso' (para diferenciar en el resumen/checkout)
function agregarAlCarrito(id, nombre, precio, imagen, tipo = 'producto') {
    const carrito = obtenerCarrito();
    const existente = carrito.find(item => item.id === id && item.tipo === tipo);

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, imagen, tipo, cantidad: 1 });
    }

    guardarCarrito(carrito);
    mostrarNotificacion(`✔️ ${nombre} agregado al carrito`);
}

function cambiarCantidad(id, tipo, delta) {
    let carrito = obtenerCarrito();
    const item = carrito.find(i => i.id === id && i.tipo === tipo);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => !(i.id === id && i.tipo === tipo));
    }
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === 'function') renderizarCarrito();
}

function eliminarDelCarrito(id, tipo) {
    let carrito = obtenerCarrito().filter(i => !(i.id === id && i.tipo === tipo));
    guardarCarrito(carrito);
    if (typeof renderizarCarrito === 'function') renderizarCarrito();
}

function calcularTotalCarrito() {
    return obtenerCarrito().reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function contarItemsCarrito() {
    return obtenerCarrito().reduce((sum, item) => sum + item.cantidad, 0);
}

function actualizarBadgeCarrito() {
    const badge = document.getElementById('cartBadge');
    if (badge) badge.textContent = contarItemsCarrito();
}

function mostrarNotificacion(texto) {
    let toast = document.getElementById('hankelToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'hankelToast';
        toast.style.cssText = `
            position: fixed; bottom: 24px; right: 24px;
            background: #00bcd4; color: #0a0c10; padding: 14px 22px;
            border-radius: 8px; font-weight: bold; z-index: 9999;
            opacity: 0; transition: opacity 0.3s; box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = texto;
    toast.style.opacity = '1';
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => { toast.style.opacity = '0'; }, 2200);
}

document.addEventListener('DOMContentLoaded', actualizarBadgeCarrito);
