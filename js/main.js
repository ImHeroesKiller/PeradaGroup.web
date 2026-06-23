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

// Hero slideshow — fade transition, preload, autoplay, pause on hover
function initHeroSlideshows() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TRANSITION_DELAY_MS = 120;
    const INTERVAL_MS = 5000;

    document.querySelectorAll('[data-slideshow]').forEach((root) => {
        const slides = root.querySelectorAll('.hero-slideshow__slide');
        const dots = root.querySelectorAll('.hero-slideshow__dot');
        if (!slides.length) return;

        const preloaded = new Map();
        let current = 0;
        let timer = null;
        let transitioning = false;

        function getSlideImage(slide) {
            return slide.querySelector('.hero-slideshow__image');
        }

        function preloadImage(src) {
            if (!src) return Promise.resolve();
            if (preloaded.has(src)) return preloaded.get(src);

            const promise = new Promise((resolve) => {
                const img = new Image();
                img.decoding = 'async';
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
                img.src = src;
            });

            preloaded.set(src, promise);
            return promise;
        }

        function preloadAround(index) {
            const nextIndex = (index + 1) % slides.length;
            const prevIndex = (index - 1 + slides.length) % slides.length;

            [index, nextIndex, prevIndex].forEach((i) => {
                const src = getSlideImage(slides[i])?.src;
                if (src) preloadImage(src);
            });
        }

        async function goTo(index) {
            if (transitioning) return;

            const target = (index + slides.length) % slides.length;
            if (target === current) return;

            transitioning = true;

            const targetImg = getSlideImage(slides[target]);
            if (targetImg?.src) {
                await preloadImage(targetImg.src);
                await new Promise((resolve) => setTimeout(resolve, TRANSITION_DELAY_MS));
            }

            slides[current]?.classList.remove('is-active');
            dots[current]?.classList.remove('is-active');
            dots[current]?.setAttribute('aria-selected', 'false');

            current = target;

            slides[current]?.classList.add('is-active');
            dots[current]?.classList.add('is-active');
            dots[current]?.setAttribute('aria-selected', 'true');

            preloadAround(current);
            transitioning = false;
        }

        async function next() {
            await goTo(current + 1);
        }

        function scheduleNext() {
            stop();
            if (reducedMotion || slides.length < 2) return;

            timer = setTimeout(async () => {
                await next();
                scheduleNext();
            }, INTERVAL_MS);
        }

        function start() {
            scheduleNext();
        }

        function stop() {
            if (timer) clearTimeout(timer);
            timer = null;
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', async () => {
                stop();
                await goTo(index);
                start();
            });
        });

        root.addEventListener('mouseenter', stop);
        root.addEventListener('mouseleave', start);
        root.addEventListener('focusin', stop);
        root.addEventListener('focusout', start);

        preloadAround(0);
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
