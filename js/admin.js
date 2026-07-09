/* ===============================================
   PANEL ADMIN
   ===============================================
   ⚠️ SEGURIDAD: esta clave es solo un filtro básico para
   que un visitante casual no entre por accidente. No es
   autenticación real (este sitio es estático, sin servidor
   de login). Lo que de verdad protege tu inventario es que
   SOLO TÚ tengas permiso de "Editor" sobre el Google Sheet.
   =============================================== */

// 🔧 Cambia esta clave.
const ADMIN_CLAVE = "hankel2026";

function verificarAcceso() {
    const clave = document.getElementById('adminClave').value;
    if (clave === ADMIN_CLAVE) {
        sessionStorage.setItem('hankel_admin_ok', '1');
        mostrarPanel();
    } else {
        document.getElementById('adminError').textContent = '❌ Clave incorrecta';
    }
}

// Extrae el ID tanto si el usuario pega la URL completa como si pega solo el ID
function extraerSheetId(texto) {
    texto = (texto || '').trim();
    const match = texto.match(/\/d\/([a-zA-Z0-9-_]+)/);
    if (match) return match[1];
    return texto; // asumimos que ya pegó el ID directo
}

async function probarYPrevisualizar(sheetId) {
    const tbody = document.getElementById('tablaProductos');
    tbody.innerHTML = '<tr><td colspan="5">Cargando...</td></tr>';

    if (!sheetId) {
        tbody.innerHTML = '<tr><td colspan="5">⚠️ Aún no hay ningún Google Sheet configurado.</td></tr>';
        return;
    }

    try {
        const res = await fetch(`https://opensheet.elk.sh/${sheetId}/Productos`);
        if (!res.ok) throw new Error('Respuesta no válida');
        const productos = await res.json();

        if (!Array.isArray(productos) || productos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5">⚠️ El Sheet está vacío o la pestaña no se llama "Productos".</td></tr>';
            return;
        }

        tbody.innerHTML = productos.map(p => `
            <tr>
                <td>${p.codigo ?? ''}</td>
                <td>${p.nombre ?? ''}</td>
                <td>S/ ${parseFloat(p.precio || 0).toFixed(2)}</td>
                <td>${p.stock ?? ''}</td>
                <td>${p.imagen ? '✅' : '—'}</td>
            </tr>
        `).join('');

        document.getElementById('resultadoPrueba').innerHTML =
            `✅ Conectado correctamente. Se encontraron <strong>${productos.length}</strong> productos.`;
        document.getElementById('resultadoPrueba').style.color = '#4ade80';
    } catch (err) {
        tbody.innerHTML = '<tr><td colspan="5">❌ No se pudo leer ese Sheet. Revisa el enlace o que esté compartido como "Cualquiera con el enlace: Lector".</td></tr>';
        document.getElementById('resultadoPrueba').textContent = '❌ No se pudo conectar con ese Google Sheet.';
        document.getElementById('resultadoPrueba').style.color = '#f87171';
    }
}

function guardarSheetId() {
    const input = document.getElementById('sheetInput');
    const sheetId = extraerSheetId(input.value);

    if (!sheetId) {
        document.getElementById('resultadoPrueba').textContent = '⚠️ Pega primero el enlace o ID de tu Google Sheet.';
        document.getElementById('resultadoPrueba').style.color = '#fbbf24';
        return;
    }

    // Guarda una versión de PRUEBA local (solo la ve este navegador) para
    // que puedas confirmar que todo funciona antes de publicarlo para todos.
    localStorage.setItem('hankel_sheet_id_preview', sheetId);
    probarYPrevisualizar(sheetId);
    document.getElementById('editLink').href = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
    document.getElementById('editLink').style.display = 'inline-block';

    // Genera el código que hay que pegar en js/config.js para que
    // el cambio aplique a TODOS los visitantes del sitio.
    const codigo = `const SHEET_ID = "${sheetId}";`;
    document.getElementById('codigoConfig').textContent = codigo;
    document.getElementById('codigoConfigBox').style.display = 'block';
}

function copiarCodigo() {
    const texto = document.getElementById('codigoConfig').textContent;
    navigator.clipboard.writeText(texto).then(() => {
        const btn = document.getElementById('btnCopiar');
        const original = btn.textContent;
        btn.textContent = '✅ Copiado';
        setTimeout(() => { btn.textContent = original; }, 1800);
    });
}

async function mostrarPanel() {
    document.getElementById('loginBox').style.display = 'none';
    document.getElementById('panelBox').style.display = 'block';

    // Precarga el input con lo último que se probó en este navegador,
    // o con el SHEET_ID ya publicado en config.js si existe.
    const actual = localStorage.getItem('hankel_sheet_id_preview') || (typeof SHEET_ID !== 'undefined' ? SHEET_ID : '');
    document.getElementById('sheetInput').value = actual;

    if (actual) {
        document.getElementById('editLink').href = `https://docs.google.com/spreadsheets/d/${actual}/edit`;
        document.getElementById('editLink').style.display = 'inline-block';
        probarYPrevisualizar(actual);
    } else {
        document.getElementById('editLink').style.display = 'none';
        document.getElementById('tablaProductos').innerHTML =
            '<tr><td colspan="5">Aún no has configurado tu Google Sheet. Pégalo arriba 👆</td></tr>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('hankel_admin_ok') === '1') mostrarPanel();

    document.getElementById('btnEntrar')?.addEventListener('click', verificarAcceso);
    document.getElementById('adminClave')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verificarAcceso();
    });
    document.getElementById('btnGuardarSheet')?.addEventListener('click', guardarSheetId);
    document.getElementById('sheetInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') guardarSheetId();
    });
    document.getElementById('btnCopiar')?.addEventListener('click', copiarCodigo);
    document.getElementById('btnRefrescar')?.addEventListener('click', () => {
        const id = extraerSheetId(document.getElementById('sheetInput').value);
        probarYPrevisualizar(id);
    });
});
