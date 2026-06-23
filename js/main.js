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

// Hero slideshow — fade transition, autoplay, pause on hover
function initHeroSlideshows() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('[data-slideshow]').forEach((root) => {
        const slides = root.querySelectorAll('.hero-slideshow__slide');
        const dots = root.querySelectorAll('.hero-slideshow__dot');
        if (!slides.length) return;

        let current = 0;
        let timer = null;
        const interval = 5000;

        function goTo(index) {
            slides[current]?.classList.remove('is-active');
            dots[current]?.classList.remove('is-active');
            dots[current]?.setAttribute('aria-selected', 'false');

            current = (index + slides.length) % slides.length;

            slides[current]?.classList.add('is-active');
            dots[current]?.classList.add('is-active');
            dots[current]?.setAttribute('aria-selected', 'true');
        }

        function next() {
            goTo(current + 1);
        }

        function start() {
            if (reducedMotion || slides.length < 2) return;
            stop();
            timer = setInterval(next, interval);
        }

        function stop() {
            if (timer) clearInterval(timer);
            timer = null;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goTo(index);
                start();
            });
        });

        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop);
        root.addEventListener('focusout', start);

        if (!reducedMotion) start();
    });
}

// Inisialisasi semua fungsi
function init() {
    initializeTailwind();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initHeroSlideshows();

    console.log('%c[PERADA GROUP] Website initialized', 'color:#64748b');
}

// Jalankan saat halaman siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
