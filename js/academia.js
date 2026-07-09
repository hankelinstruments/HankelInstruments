/* ===============================================
   HANKEL ACADEMY - CURSOS VIRTUALES
   Igual que productos.js, esta lista también puede
   venir de un Google Sheet (segunda pestaña llamada
   "Cursos"). Aquí la dejo simple como arreglo editable
   directamente, porque cursos cambian con menos frecuencia
   que el stock. Si prefieres, se puede migrar a Sheets
   igual que productos.js (ver README.md).
   =============================================== */

// PRECIO_HORA: S/ 30.00 por hora, tal como pediste.
const PRECIO_HORA = 30.00;

const cursos = [
    { id: "CUR01", nombre: "Programación de Microcontroladores ARM", horas: 4, descripcion: "Desde cero hasta tu primer firmware funcionando en un STM32.", imagen: "" },
    { id: "CUR02", nombre: "IoT con ESP32: WiFi y Sensores", horas: 3, descripcion: "Conecta sensores y envía datos a la nube en tiempo real.", imagen: "" },
    { id: "CUR03", nombre: "Diseño de PCB en KiCad", horas: 5, descripcion: "Diseña tu propia placa desde el esquemático hasta el gerber.", imagen: "" },
    { id: "CUR04", nombre: "Introducción a RISC-V", horas: 2, descripcion: "La arquitectura abierta que está cambiando la industria.", imagen: "" },
];

function generarImagenCurso(id) {
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%231a1f2e'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%2300bcd4' font-family='Arial, sans-serif' font-size='20' font-weight='bold'%3E${id}%3C/text%3E%3Ctext x='50%25' y='65%25' text-anchor='middle' fill='%239aa3b5' font-family='Arial, sans-serif' font-size='13'%3EHankel Academy%3C/text%3E%3C/svg%3E`;
}

function mostrarCursos() {
    const container = document.getElementById('cursosContainer');
    if (!container) return;

    container.innerHTML = cursos.map(curso => {
        const precioTotal = curso.horas * PRECIO_HORA;
        const imgSrc = curso.imagen && curso.imagen.trim() !== '' ? curso.imagen : generarImagenCurso(curso.id);

        return `
        <div class="producto-card">
            <img src="${imgSrc}" alt="${curso.nombre}" class="producto-imagen">
            <div class="producto-info">
                <div class="producto-codigo">${curso.id} · ${curso.horas}h</div>
                <div class="producto-nombre">${curso.nombre}</div>
                <div class="producto-descripcion">${curso.descripcion}</div>
                <div class="producto-precio">S/ ${precioTotal.toFixed(2)}
                    <span style="font-size:0.8rem; color:#9aa3b5; font-weight:normal;">(S/ ${PRECIO_HORA.toFixed(2)}/hora)</span>
                </div>
                <button class="btn-comprar"
                        onclick="agregarAlCarrito('${curso.id}', '${curso.nombre.replace(/'/g, "\\'")}', ${precioTotal}, '${imgSrc.replace(/'/g, "\\'")}', 'curso')">
                    🎓 Agregar al carrito
                </button>
            </div>
        </div>`;
    }).join('');
}

document.addEventListener('DOMContentLoaded', mostrarCursos);
