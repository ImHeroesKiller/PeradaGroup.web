// PERADA GROUP - Main JavaScript

// Tailwind script
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

// Mobile menu
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
    
    // Close menu on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            btn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
        });
    });
}

// Contact form handler (static simulation)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;

        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mengirim...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> Terkirim! Terima kasih.';
            btn.classList.remove('bg-[#0A2540]');
            btn.classList.add('bg-emerald-600');
            
            setTimeout(() => {
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.classList.add('bg-[#0A2540]');
                btn.classList.remove('bg-emerald-600');
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'mt-4 text-center text-emerald-600 text-sm font-medium';
                successMsg.innerHTML = 'Pesan Anda telah diterima. Tim kami akan menghubungi segera.';
                form.appendChild(successMsg);
                
                setTimeout(() => {
                    successMsg.remove();
                }, 4000);
            }, 2200);
        }, 1600);
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - bodyRect - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize everything
function init() {
    initializeTailwind();
    initNavbar();
    initMobileMenu();
    initContactForm();
    initSmoothScroll();
    
    console.log('%c[PERADA GROUP] Website initialized successfully.', 'color:#64748b');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}