/* ===============================================
   PRODUCTOS - LEÍDOS DESDE GOOGLE SHEETS
   ===============================================
   ¿Cómo funciona?
   1. Tienes una hoja de Google Sheets con columnas:
      codigo | nombre | precio | stock | descripcion | imagen
   2. La conviertes en un enlace JSON gratis con opensheet.elk.sh
      (ver instrucciones completas en README.md)
   3. Esta página la lee cada vez que alguien visita productos.html
   4. Tú actualizas el stock/precio/imagen editando la hoja
      (o importando tu Excel: Archivo > Importar > Reemplazar hoja)
      y el cambio se ve en la web al instante, sin tocar código.
   =============================================== */

// El ID viene de js/config.js (SHEET_ID). Si el admin lo probó desde el
// panel en este mismo navegador, se usa esa versión de prueba primero.
function obtenerSheetIdActivo() {
    return localStorage.getItem('hankel_sheet_id_preview') || (typeof SHEET_ID !== 'undefined' ? SHEET_ID : '');
}

function construirSheetUrl() {
    const id = obtenerSheetIdActivo();
    return id ? `https://opensheet.elk.sh/${id}/Productos` : null;
}

// Datos de respaldo por si el Sheet aún no está configurado o falla la red
const productosRespaldo = [
    { codigo: "HI01", nombre: "MCU ARM Cortex-M4", precio: "45.90", stock: "12", descripcion: "Microcontrolador de alto rendimiento 32-bit con DSP", imagen: "" },
    { codigo: "HI02", nombre: "STM32F103C8T6", precio: "28.50", stock: "8", descripcion: "Blue Pill - Ideal para prototipado y proyectos educativos", imagen: "" },
];

let productosCache = [];

function getStockClass(stock) {
    if (stock > 10) return 'stock-alto';
    if (stock > 0) return 'stock-medio';
    return 'stock-bajo';
}

function getStockTexto(stock) {
    if (stock > 10) return `✓ ${stock} unidades disponibles`;
    if (stock > 0) return `⚠️ Solo ${stock} unidades`;
    return '❌ Agotado';
}

function generarImagenGenerica(codigo) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%231a1f2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300bcd4' font-family='Arial, sans-serif' font-size='24' font-weight='bold'%3E${codigo}%3C/text%3E%3C/svg%3E`;
}

function mostrarProductos(lista) {
    const container = document.getElementById('productosContainer');
    if (!container) return;

    if (lista.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:60px;grid-column:1/-1;">🔍 No se encontraron productos</div>';
        return;
    }

    container.innerHTML = lista.map(prod => {
        const precio = parseFloat(prod.precio) || 0;
        const stock = parseInt(prod.stock) || 0;
        const imgSrc = prod.imagen && prod.imagen.trim() !== '' ? prod.imagen : generarImagenGenerica(prod.codigo);

        return `
        <div class="producto-card">
            <img src="${imgSrc}" alt="${prod.nombre}" class="producto-imagen"
                 onerror="this.src='${generarImagenGenerica(prod.codigo)}'">
            <div class="producto-info">
                <div class="producto-codigo">${prod.codigo}</div>
                <div class="producto-nombre">${prod.nombre}</div>
                <div class="producto-descripcion">${prod.descripcion}</div>
                <div class="producto-precio">S/ ${precio.toFixed(2)}</div>
                <div class="producto-stock ${getStockClass(stock)}">${getStockTexto(stock)}</div>
                <button class="btn-comprar ${stock === 0 ? 'sin-stock' : ''}" ${stock === 0 ? 'disabled' : ''}
                        onclick="agregarAlCarrito('${prod.codigo}', '${prod.nombre.replace(/'/g, "\\'")}', ${precio}, '${imgSrc.replace(/'/g, "\\'")}', 'producto')">
                    ${stock > 0 ? '🛒 Agregar al carrito' : '❌ Sin stock'}
                </button>
            </div>
        </div>`;
    }).join('');
}

function filtrarYOrdenar() {
    const busqueda = (document.getElementById('searchInput')?.value || '').toLowerCase();
    const stockFiltro = document.getElementById('stockFilter')?.value || 'todos';
    const sortBy = document.getElementById('sortBy')?.value || 'codigo';

    let filtrados = productosCache.filter(prod => {
        const stock = parseInt(prod.stock) || 0;
        const match = prod.nombre.toLowerCase().includes(busqueda) ||
                      prod.codigo.toLowerCase().includes(busqueda) ||
                      (prod.descripcion || '').toLowerCase().includes(busqueda);
        if (!match) return false;
        if (stockFiltro === 'alto') return stock > 10;
        if (stockFiltro === 'medio') return stock > 0 && stock <= 10;
        if (stockFiltro === 'bajo') return stock === 0;
        return true;
    });

    if (sortBy === 'precio-asc') filtrados.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
    if (sortBy === 'precio-desc') filtrados.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
    if (sortBy === 'codigo') filtrados.sort((a, b) => a.codigo.localeCompare(b.codigo));
    if (sortBy === 'stock') filtrados.sort((a, b) => (parseInt(b.stock) || 0) - (parseInt(a.stock) || 0));

    mostrarProductos(filtrados);
}

async function cargarProductos() {
    const container = document.getElementById('productosContainer');
    const sheetUrl = construirSheetUrl();

    if (!sheetUrl) {
        console.warn('SHEET_ID no configurado (ver js/config.js o el panel Admin). Usando datos de respaldo.');
        productosCache = productosRespaldo;
        filtrarYOrdenar();
        return;
    }

    try {
        const res = await fetch(sheetUrl);
        if (!res.ok) throw new Error('No se pudo leer el Google Sheet');
        productosCache = await res.json();
        if (!Array.isArray(productosCache) || productosCache.length === 0) throw new Error('Sheet vacío');
    } catch (err) {
        console.warn('Usando datos de respaldo:', err.message);
        productosCache = productosRespaldo;
    }
    filtrarYOrdenar();
}

document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('productosContainer')) return;
    cargarProductos();
    document.getElementById('searchInput')?.addEventListener('input', filtrarYOrdenar);
    document.getElementById('stockFilter')?.addEventListener('change', filtrarYOrdenar);
    document.getElementById('sortBy')?.addEventListener('change', filtrarYOrdenar);
});
