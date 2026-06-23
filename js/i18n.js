(function () {
    'use strict';

    const LOCALE_LABELS = {
        id: 'Bahasa Indonesia',
        en: 'English',
        zh: '简体中文',
    };

    function closeMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const btn = document.getElementById('mobile-menu-btn');
        if (!menu || menu.classList.contains('hidden')) return;

        menu.classList.add('hidden');
        if (btn) {
            btn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            btn.setAttribute('aria-expanded', 'false');
        }
    }

    function syncSwitcherUI(locale) {
        document.querySelectorAll('.lang-switcher__btn[data-locale]').forEach((btn) => {
            const isActive = btn.dataset.locale === locale;
            btn.classList.toggle('lang-switcher__btn--active', isActive);
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            btn.setAttribute('aria-current', isActive ? 'true' : 'false');
        });

        document.querySelectorAll('.lang-switcher[role="group"]').forEach((group) => {
            const label = LOCALE_LABELS[locale] || locale;
            group.setAttribute('aria-label', `Pilih bahasa — aktif: ${label}`);
        });
    }

    function bindSwitchers() {
        document.querySelectorAll('.lang-switcher__btn[data-locale]').forEach((btn) => {
            if (btn.dataset.i18nBound === '1') return;
            btn.dataset.i18nBound = '1';

            btn.addEventListener('click', () => {
                const locale = btn.dataset.locale;
                if (!locale || !window.PeradaContent) return;

                if (locale !== window.PeradaContent.getLocale()) {
                    window.PeradaContent.setLocale(locale);
                }

                syncSwitcherUI(locale);
                closeMobileMenu();
            });
        });
    }

    function init() {
        if (!window.PeradaContent) return;

        const locale = window.PeradaContent.getLocale();
        window.PeradaContent.applyDocumentLocale(locale);
        syncSwitcherUI(locale);
        bindSwitchers();

        window.addEventListener('perada:localechange', (event) => {
            syncSwitcherUI(event.detail?.locale || window.PeradaContent.getLocale());
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();