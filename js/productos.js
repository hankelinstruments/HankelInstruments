/* ============================================================
   js/productos.js — Hankel Instruments
   Catálogo de productos (microcontroladores, SBC, kits de
   evaluación e instrumentación). Datos embebidos localmente
   (sin llamadas externas ni a IA) para carga rápida en un
   sitio estático.
   Requiere: js/config.js (HANKEL_CONFIG) cargado antes que este archivo.
   ============================================================ */

// Número de WhatsApp de la empresa para consultas
const WHATSAPP_NUMBER = '51935344937';

/* Ruta y extensión de las fotos de producto.
   Los archivos se llaman según el indicativo del catálogo: HI01, HI02, ... HI44.
   Si algún día mueves las fotos de carpeta o cambias de formato, solo se
   modifican estas dos constantes. */
const IMAGES_BASE_PATH = 'images/';
const IMAGES_EXTENSION = '.png';

/* Los datos del catálogo viven en js/productos-data.js, generado
   automáticamente desde el Excel maestro con tools/generar_productos.py.
   Ese archivo debe cargarse ANTES que este en el HTML. */
const PRODUCTS = Array.isArray(window.PRODUCTS_DATA) ? window.PRODUCTS_DATA : [];

if (!PRODUCTS.length) {
  console.error('No se cargó js/productos-data.js. Genera el archivo con: python tools/generar_productos.py');
}

/* ---------- Utilidades ---------- */

function formatoPrecio(valor) {
  const simbolo = (window.HANKEL_CONFIG && window.HANKEL_CONFIG.CURRENCY_SYMBOL) || 'S/.';
  if (valor === null || valor === undefined || isNaN(valor)) return 'Consultar';
  return simbolo + ' ' + Math.round(valor).toLocaleString('es-PE');
}

function normalizarTexto(texto) {
  return (texto || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function truncar(texto, maxLen) {
  if (!texto) return '';
  if (texto.length <= maxLen) return texto;
  return texto.slice(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---------- Lazy-loading de imágenes de fondo ---------- */
/* Las imágenes de producto se aplican como background-image inline,
   así que el atributo nativo loading="lazy" (pensado para <img>) no
   aplica. Para no descargar las ~34 imágenes de una sola vez en
   conexiones móviles, se difiere la carga real hasta que la tarjeta
   está por entrar en el viewport, usando IntersectionObserver. Si el
   navegador no lo soporta, se aplica el fondo de inmediato. */
const lazyImgObserver = ('IntersectionObserver' in window)
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const bg = el.dataset.bg;
          if (bg) {
            el.style.backgroundImage = bg;
            el.removeAttribute('data-bg');
          }
          observer.unobserve(el);
        }
      });
    }, { rootMargin: '200px 0px' })
  : null;

/* ---------- Estado de filtros ---------- */

const state = {
  query: '',
  categoria: 'todas',
  orden: 'nombre'
};

/* ---------- Construcción de la interfaz de filtros ---------- */

function poblarFiltroCategorias() {
  const select = document.getElementById('categoryFilter');
  if (!select) return;
  const categorias = Array.from(new Set(PRODUCTS.map(p => p.categoria))).sort();
  categorias.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    select.appendChild(opt);
  });
}

/* ---------- Filtrado y orden ---------- */

function obtenerProductosFiltrados() {
  let lista = PRODUCTS.slice();

  if (state.query) {
    const q = normalizarTexto(state.query);
    lista = lista.filter(p => {
      const campos = [p.nombre, p.soc, p.categoria, p.tipo, p.cpu,
                      p.marca, p.familia, p.familia_soc, p.sku];
      return campos.some(campo => normalizarTexto(campo).includes(q));
    });
  }

  if (state.categoria !== 'todas') {
    lista = lista.filter(p => p.categoria === state.categoria);
  }

  switch (state.orden) {
    case 'precio-asc':
      lista.sort((a, b) => (a.precio ?? Infinity) - (b.precio ?? Infinity));
      break;
    case 'precio-desc':
      lista.sort((a, b) => (b.precio ?? -Infinity) - (a.precio ?? -Infinity));
      break;
    case 'nombre':
    default:
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
      break;
  }

  return lista;
}

/* ---------- Renderizado de tarjetas ---------- */

function crearTarjetaProducto(producto) {
  const card = document.createElement('article');
  card.className = 'producto-card';
  card.dataset.id = producto.id;

  // Construir la ruta de la imagen. Las fotos de producto viven en la carpeta
  // /productos, nombradas según el indicativo HI01, HI02, ... con extensión .jpg.
  //
  // IMPORTANTE: aquí se aplica ÚNICAMENTE la imagen, sin gradiente encima.
  // Antes se superponía un azul a 0.85–0.9 de opacidad que dejaba la foto casi
  // invisible. El oscurecimiento necesario para que se lea el nombre del
  // producto lo aporta .producto-imagen-overlay (en productos.html), que solo
  // oscurece la franja inferior y deja la pieza a la vista.
  const imagenNombre = producto.imagen || '';
  const bgValue = imagenNombre
    ? `url('${IMAGES_BASE_PATH}${imagenNombre}${IMAGES_EXTENSION}')`
    : '';

  const specs = [
    { etiqueta: 'SoC', valor: producto.soc },
    { etiqueta: 'CPU', valor: producto.cpu },
    { etiqueta: 'Núcleos', valor: producto.nucleos },
    { etiqueta: 'Frecuencia', valor: producto.frecuencia_mhz ? producto.frecuencia_mhz + ' MHz' : '' },
    { etiqueta: 'RAM', valor: producto.ram },
    { etiqueta: 'Flash', valor: producto.flash },
    { etiqueta: 'Conectividad', valor: producto.conectividad_principal }
  ].filter(s => s.valor);

  // Construir el mensaje de WhatsApp
  const mensajeWhatsApp = encodeURIComponent(`Hola, quiero información sobre el producto: ${producto.nombre} (${producto.soc})`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeWhatsApp}`;

  // NOTA: todo el contenido va envuelto en .producto-card-body, que es el
  // contenedor que aporta el padding y el flex-grow para anclar el botón
  // de WhatsApp al final de la tarjeta (definido en el <style> de productos.html).
  card.innerHTML = `
    <div class="producto-imagen" data-bg="${escapeHTML(bgValue)}" role="img" aria-label="${escapeHTML(producto.nombre)}">
      <div class="producto-imagen-overlay"></div>
      <span class="producto-imagen-texto">${escapeHTML(producto.nombre)}</span>
    </div>
    <div class="producto-card-body">
      <div class="producto-card-header">
        <span class="producto-categoria">${escapeHTML(producto.categoria)}</span>
        <span class="producto-precio">${formatoPrecio(producto.precio)}</span>
      </div>
      <h3 class="producto-nombre">${escapeHTML(producto.nombre)}</h3>
      <p class="producto-tipo">${escapeHTML(producto.tipo)}</p>
      <ul class="producto-specs">
        ${specs.map(s => `<li><span class="spec-etiqueta">${escapeHTML(s.etiqueta)}</span><span class="spec-valor">${escapeHTML(s.valor)}</span></li>`).join('')}
      </ul>
      <p class="producto-ficha">${escapeHTML(truncar(producto.ficha, 160))}</p>
      <div class="producto-acciones">
        <a href="${whatsappLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-producto">
          <svg class="wp-icon" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </a>
        ${producto.link ? `<a href="${escapeHTML(producto.link)}" target="_blank" rel="noopener noreferrer" class="producto-link">Ficha técnica →</a>` : ''}
      </div>
    </div>
  `;

  // Activar lazy-loading real de la imagen de fondo
  const imgEl = card.querySelector('.producto-imagen');
  if (imgEl) {
    if (lazyImgObserver) {
      lazyImgObserver.observe(imgEl);
    } else if (bgValue) {
      imgEl.style.backgroundImage = bgValue;
    }
  }

  return card;
}

function renderizarProductos() {
  const contenedor = document.getElementById('productosContainer');
  if (!contenedor) return;

  const lista = obtenerProductosFiltrados();
  contenedor.innerHTML = '';

  const contador = document.getElementById('resultadosContador');
  if (contador) {
    contador.textContent = lista.length === 1
      ? '1 producto encontrado'
      : lista.length + ' productos encontrados';
  }

  if (lista.length === 0) {
    contenedor.innerHTML = `
      <div class="productos-vacio">
        No se encontraron productos con los criterios de búsqueda actuales.
      </div>`;
    return;
  }

  const fragment = document.createDocumentFragment();
  lista.forEach(p => fragment.appendChild(crearTarjetaProducto(p)));
  contenedor.appendChild(fragment);
}

/* ---------- Eventos ---------- */

function inicializarEventos() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    // Debounce simple para no re-renderizar en cada tecla en móviles de gama baja
    let debounceTimer;
    searchInput.addEventListener('input', e => {
      clearTimeout(debounceTimer);
      const valor = e.target.value;
      debounceTimer = setTimeout(() => {
        state.query = valor;
        renderizarProductos();
      }, 150);
    });
  }

  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', e => {
      state.categoria = e.target.value;
      renderizarProductos();
    });
  }

  const sortBy = document.getElementById('sortBy');
  if (sortBy) {
    sortBy.addEventListener('change', e => {
      state.orden = e.target.value;
      renderizarProductos();
    });
  }
}

/* ---------- Inicialización ---------- */

document.addEventListener('DOMContentLoaded', () => {
  poblarFiltroCategorias();
  inicializarEventos();
  renderizarProductos();
});
