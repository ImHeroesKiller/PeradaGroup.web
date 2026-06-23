(function () {
    'use strict';

    const CONTENT_FILE = 'ui.json';

    const NAV_HREF_KEYS = {
        'index.html': 'home',
        'about.html': 'about',
        'services.html': 'services',
        'careers.html': 'careers',
        'contact.html': 'contact',
    };

    const FALLBACK = {
        navbar: {
            brandAriaLabel: 'PERADA GROUP — Beranda',
            logoAlt: 'Logo PERADA GROUP — solusi logistik dan SDM terintegrasi Indonesia',
            openMenuAria: 'Buka menu',
            languageLabel: 'Bahasa',
            cta: 'Hubungi Kami',
            menu: {
                home: 'Home',
                about: 'Tentang Kami',
                services: 'Layanan',
                careers: 'Karir',
                contact: 'Kontak',
            },
        },
        footer: {
            brandAriaLabel: 'PERADA GROUP — Beranda',
            logoAlt: 'Logo PERADA GROUP di footer website',
            tagline: 'Satu grup, dua spesialisasi — solusi logistik dan operasional bisnis terintegrasi untuk mitra korporat di Indonesia.',
            entitiesLine: 'PT Perdana Adi Yuda · PT Perkasa Adi Yuda',
            headings: {
                company: 'PERUSAHAAN',
                services: 'LAYANAN',
                contact: 'HUBUNGI',
                legal: 'LEGAL',
            },
            links: {
                about: 'Tentang Kami',
                advantages: 'Keunggulan Kami',
                services: 'Layanan',
                careers: 'Karir',
                faq: 'FAQ',
                logistics: 'Logistics & Freight Forwarding',
                hr: 'Human Capital & Outsourcing',
                import: 'Import & Trading (API-U)',
                event: 'Event & Facility Support',
                contact: 'Kontak Kami',
                address: 'Plaza Summarecon Bekasi Lt. 7',
                privacy: 'Kebijakan Privasi',
                terms: 'Syarat & Ketentuan',
            },
            social: {
                whatsapp: 'WhatsApp PERADA GROUP',
                email: 'Email PERADA GROUP',
                linkedin: 'LinkedIn PERADA GROUP',
            },
            copyright: '© 2026 PERADA GROUP. Seluruh hak cipta dilindungi.',
        },
    };

    function getPath(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }

    function applyDataUi(root, data) {
        root.querySelectorAll('[data-ui]').forEach((el) => {
            const value = getPath(data, el.getAttribute('data-ui'));
            if (value != null) el.textContent = value;
        });

        root.querySelectorAll('[data-ui-aria]').forEach((el) => {
            const value = getPath(data, el.getAttribute('data-ui-aria'));
            if (value != null) el.setAttribute('aria-label', value);
        });

        root.querySelectorAll('[data-ui-alt]').forEach((el) => {
            const value = getPath(data, el.getAttribute('data-ui-alt'));
            if (value != null) el.setAttribute('alt', value);
        });
    }

    function renderNavbar(navbar) {
        if (!navbar) return;

        const menu = navbar.menu || {};

        document.querySelectorAll('.navbar-menu a[href], a.mobile-menu-link[href]').forEach((link) => {
            const href = link.getAttribute('href');
            const key = NAV_HREF_KEYS[href];
            if (key && menu[key]) link.textContent = menu[key];
        });

        document.querySelectorAll('.navbar-cta, .mobile-menu-cta').forEach((el) => {
            if (navbar.cta) el.textContent = navbar.cta;
        });

        document.querySelectorAll('.lang-switcher__mobile-label').forEach((el) => {
            if (navbar.languageLabel) el.textContent = navbar.languageLabel;
        });

        const menuBtn = document.getElementById('mobile-menu-btn');
        if (menuBtn && navbar.openMenuAria) {
            menuBtn.setAttribute('aria-label', navbar.openMenuAria);
        }

        document.querySelectorAll('.brand-logo-link').forEach((el) => {
            if (navbar.brandAriaLabel) el.setAttribute('aria-label', navbar.brandAriaLabel);
        });

        document.querySelectorAll('img.brand-logo').forEach((el) => {
            if (navbar.logoAlt) el.setAttribute('alt', navbar.logoAlt);
        });
    }

    function renderFooter(footer) {
        const root = document.getElementById('site-footer');
        if (!root || !footer) return;
        applyDataUi(root, { footer });
    }

    function applyContent(content) {
        renderNavbar(content.navbar);
        renderFooter(content.footer);
    }

    function loadContent() {
        window.PeradaContent.loadLocalizedContent(CONTENT_FILE, FALLBACK).then(applyContent);
    }

    function init() {
        loadContent();
        window.addEventListener('perada:localechange', loadContent);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();