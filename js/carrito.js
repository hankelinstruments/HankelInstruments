/* ============================================================
   js/carrito.js — Hankel Instruments
   Carrito de compras autocontenido para sitio estático.

   - Persiste en localStorage (sin backend).
   - No verifica stock: la disponibilidad se confirma
     internamente al recibir el pedido por WhatsApp.
   - El checkout arma un mensaje de texto con el detalle del
     pedido y abre WhatsApp con ese mensaje precargado.

   Expone window.HankelCart con la siguiente API:
     HankelCart.add(producto, cantidad = 1)
     HankelCart.remove(id)
     HankelCart.setQty(id, cantidad)
     HankelCart.clear()
     HankelCart.getItems()
     HankelCart.getTotal()
     HankelCart.getCount()
     HankelCart.checkoutViaWhatsApp()
     HankelCart.updateBadge()

   Cada vez que el carrito cambia se dispara el evento
   "hankel:cart:updated" en window, con el detalle actualizado
   en event.detail, para que otras páginas (p. ej. carrito.html)
   puedan reaccionar sin acoplarse a este archivo.
   ============================================================ */

(function () {
  const STORAGE_KEY = 'hankel_cart_v1';

  function leerCarrito() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items : [];
    } catch (err) {
      console.error('No se pudo leer el carrito almacenado:', err);
      return [];
    }
  }

  function guardarCarrito(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (err) {
      console.error('No se pudo guardar el carrito:', err);
    }
    notificarCambio(items);
    actualizarBadge(items);
  }

  function notificarCambio(items) {
    window.dispatchEvent(new CustomEvent('hankel:cart:updated', {
      detail: { items: items.slice() }
    }));
  }

  function actualizarBadge(items) {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const total = items.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = String(total);
  }

  function agregar(producto, cantidad) {
    if (!producto || !producto.id) {
      console.error('HankelCart.add: producto inválido', producto);
      return;
    }
    cantidad = Number.isFinite(cantidad) && cantidad > 0 ? cantidad : 1;

    const items = leerCarrito();
    const existente = items.find(item => item.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      items.push({
        id: producto.id,
        nombre: producto.nombre || producto.id,
        precio: typeof producto.precio === 'number' ? producto.precio : null,
        categoria: producto.categoria || '',
        cantidad: cantidad
      });
    }

    guardarCarrito(items);
  }

  function eliminar(id) {
    const items = leerCarrito().filter(item => item.id !== id);
    guardarCarrito(items);
  }

  function establecerCantidad(id, cantidad) {
    const items = leerCarrito();
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (cantidad <= 0) {
      eliminar(id);
      return;
    }
    item.cantidad = cantidad;
    guardarCarrito(items);
  }

  function vaciar() {
    guardarCarrito([]);
  }

  function obtenerItems() {
    return leerCarrito();
  }

  function obtenerTotal() {
    return leerCarrito().reduce((acc, item) => {
      const precio = typeof item.precio === 'number' ? item.precio : 0;
      return acc + precio * item.cantidad;
    }, 0);
  }

  function obtenerCantidadTotal() {
    return leerCarrito().reduce((acc, item) => acc + item.cantidad, 0);
  }

  function formatoPrecioLocal(valor) {
    const simbolo = (window.HANKEL_CONFIG && window.HANKEL_CONFIG.CURRENCY_SYMBOL) || 'S/.';
    if (typeof valor !== 'number') return 'Consultar';
    return simbolo + ' ' + valor.toFixed(2).replace(/\.00$/, '');
  }

  function construirMensajeWhatsApp() {
    const items = leerCarrito();
    const config = window.HANKEL_CONFIG || {};
    const nombreSitio = config.SITE_NAME || 'Hankel Instruments';

    if (items.length === 0) {
      return `Hola, quisiera hacer una consulta en ${nombreSitio}.`;
    }

    const lineas = items.map((item, i) => {
      const precioUnitario = typeof item.precio === 'number'
        ? formatoPrecioLocal(item.precio)
        : 'Consultar';
      return `${i + 1}. ${item.nombre} — Cantidad: ${item.cantidad} — Precio unitario: ${precioUnitario}`;
    });

    const total = obtenerTotal();
    const hayPreciosDesconocidos = items.some(item => typeof item.precio !== 'number');

    let mensaje = `Hola, quisiera hacer el siguiente pedido en ${nombreSitio}:\n\n`;
    mensaje += lineas.join('\n');
    mensaje += `\n\nTotal estimado: ${formatoPrecioLocal(total)}`;
    if (hayPreciosDesconocidos) {
      mensaje += ' (incluye ítems a confirmar)';
    }
    mensaje += '\n\nQuedo atento(a) a la confirmación de disponibilidad y al siguiente paso.';

    return mensaje;
  }

  function checkoutViaWhatsApp() {
    const config = window.HANKEL_CONFIG || {};
    const numero = config.WHATSAPP_NUMBER;

    if (!numero) {
      console.error('HankelCart.checkoutViaWhatsApp: falta HANKEL_CONFIG.WHATSAPP_NUMBER');
      return;
    }

    const mensaje = construirMensajeWhatsApp();
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  window.HankelCart = {
    add: agregar,
    remove: eliminar,
    setQty: establecerCantidad,
    clear: vaciar,
    getItems: obtenerItems,
    getTotal: obtenerTotal,
    getCount: obtenerCantidadTotal,
    checkoutViaWhatsApp: checkoutViaWhatsApp,
    buildWhatsAppMessage: construirMensajeWhatsApp,
    updateBadge: function () { actualizarBadge(leerCarrito()); }
  };

  document.addEventListener('DOMContentLoaded', function () {
    actualizarBadge(leerCarrito());
  });
})();
