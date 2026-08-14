/* ===============================================
   FUNCIONES GENERALES DEL SITIO
   =============================================== */

function handleLogoError() {
    const logoImg = document.getElementById('mainLogo');
    const fallbackSpan = document.getElementById('logoFallbackText');
    if (logoImg && fallbackSpan) {
        logoImg.style.display = 'none';
        fallbackSpan.style.display = 'inline-block';
    }
}

// Scroll suave solo para anclas dentro de la misma página (#seccion)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === "#" || href === "") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('mainLogo');
    if (logo && logo.complete && logo.naturalWidth === 0) handleLogoError();
});

// ===== Menú móvil (hamburguesa) =====
(function () {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (!navToggle || !navLinks) return;

    function closeMenu() {
        navLinks.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.querySelectorAll('.nav-mega.mega-open').forEach(li => {
            li.classList.remove('mega-open');
            const btn = li.querySelector('.mega-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll(':scope > li > a, .mega-item').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) closeMenu();
    });
})();

// ===== Mega-menú (Servicios / Productos / Industrias) =====
(function () {
    document.querySelectorAll('.mega-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const li = btn.closest('.nav-mega');
            if (!li) return;
            const isOpen = li.classList.toggle('mega-open');
            btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });
})();
