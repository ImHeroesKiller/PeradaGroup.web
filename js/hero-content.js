(function () {
    'use strict';

    const CONTENT_FILE = 'hero-content.json';

    const FALLBACK = {
        headline: 'Satu Mitra. Dua Keahlian. Solusi Terintegrasi.',
        valueProposition: 'Logistik andal dari PT Perkasa Adi Yuda dan solusi operasional lengkap dari PT Perdana Adi Yuda, termasuk layanan impor sebagai importir berijin resmi.',
        primaryCta: 'Diskusikan Kebutuhan Anda',
        secondaryCta: 'Lihat Layanan Lengkap',
    };

    function applyHeroContent(data) {
        const headline = document.getElementById('hero-headline');
        const value = document.getElementById('hero-value');
        const primaryCta = document.getElementById('hero-primary-cta');
        const secondaryCta = document.getElementById('hero-secondary-cta');

        if (headline) headline.textContent = data.headline || FALLBACK.headline;
        if (value) value.textContent = data.valueProposition || FALLBACK.valueProposition;

        const primaryLabel = primaryCta?.querySelector('span');
        const secondaryLabel = secondaryCta?.querySelector('span');
        if (primaryLabel) primaryLabel.textContent = data.primaryCta || FALLBACK.primaryCta;
        if (secondaryLabel) secondaryLabel.textContent = data.secondaryCta || FALLBACK.secondaryCta;
    }

    function loadContent() {
        window.PeradaContent.loadLocalizedContent(CONTENT_FILE, FALLBACK).then(applyHeroContent);
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