// =============================================
// PERADA GROUP - Main JavaScript (Clean Version)
// =============================================

// Inisialisasi Tailwind (jika diperlukan)
function initializeTailwind() {
    document.documentElement.style.setProperty('--accent', '#0A2540');
}

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled', 'bg-white/95', 'backdrop-blur-lg');
        } else {
            navbar.classList.remove('nav-scrolled', 'bg-white/95', 'backdrop-blur-lg');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            btn.innerHTML = '<i class="fa-solid fa-times text-xl"></i>';
        } else {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        }
    });

    // Tutup menu saat link diklik
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        });
    });
}

// Smooth Scroll untuk anchor link
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inisialisasi semua fungsi
function init() {
    initializeTailwind();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();

    console.log('%c[PERADA GROUP] Website initialized', 'color:#64748b');
}

// Jalankan saat halaman siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
