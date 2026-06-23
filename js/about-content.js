(function () {
    'use strict';

    const CONTENT_URL = '/data/about-content.json';

    const FALLBACK = {
        defaultLocale: 'id',
        id: {
            hero: {
                ariaLabel: 'Tentang PERADA GROUP',
                headline: 'Satu Grup. Dua Spesialisasi. Solusi End-to-End untuk Bisnis Anda.',
                subheadline: 'PERADA GROUP menghadirkan kekuatan gabungan antara keahlian logistik dan pengelolaan sumber daya manusia serta operasional bisnis.',
                cta: { label: 'Jelajahi Layanan Kami', href: 'services.html' },
            },
            whoWeAre: {
                eyebrow: 'SIAPA KAMI',
                title: 'Dua Entitas, Satu Visi Pertumbuhan Bisnis',
                intro: 'PERADA GROUP dirancang untuk memberikan solusi terintegrasi bagi perusahaan yang membutuhkan keandalan logistik sekaligus dukungan operasional yang komprehensif — dari SDM hingga kegiatan impor resmi.',
                entities: [
                    {
                        id: 'perkasa',
                        name: 'PT Perkasa Adi Yuda',
                        nameClass: 'perkasa',
                        logo: 'assets/logo-perkasa-new.png',
                        logoAlt: 'Logo PT Perkasa Adi Yuda',
                        title: 'Spesialis Jasa Pengurusan Transportasi',
                        descriptionHtml: 'Entitas logistik PERADA GROUP yang berfokus pada <strong>Freight Forwarding</strong> dan pengurusan pengiriman barang domestik maupun internasional. Kami membantu perusahaan mengelola rantai distribusi secara efisien, terukur, dan patuh regulasi — sehingga operasional supply chain klien tetap lancar tanpa beban administratif yang berlebihan.',
                        borderHover: 'blue',
                    },
                    {
                        id: 'perdana',
                        name: 'PT Perdana Adi Yuda',
                        nameClass: 'perdana',
                        logo: 'assets/logo-perdana-new.png',
                        logoAlt: 'Logo PT Perdana Adi Yuda',
                        title: 'Business Support & Integrated Solutions',
                        descriptionHtml: 'Menyediakan solusi menyeluruh mulai dari pengelolaan SDM, event & marketing activation, facility management, hingga kegiatan impor sebagai <strong>importir berijin resmi</strong>. Perusahaan Anda mendapatkan satu mitra terpercaya untuk berbagai kebutuhan operasional non-core yang kritis.',
                        borderHover: 'emerald',
                        highlight: {
                            title: 'Importir Berijin Resmi — Memiliki API-U',
                            descriptionHtml: 'PT Perdana Adi Yuda memiliki <strong>Angka Pengenal Impor (API-U)</strong>, sehingga dapat mendukung kebutuhan impor klien secara legal, terstruktur, dan profesional.',
                        },
                    },
                ],
            },
            advantages: {
                eyebrow: 'KEUNGGULAN KAMI',
                title: 'Mengapa Mitra Korporat Memilih PERADA GROUP',
                items: [
                    { icon: 'fa-layer-group', iconTone: 'brand', title: 'Dua Spesialisasi dalam Satu Grup', description: 'Koordinasi logistik dan operasional bisnis berjalan lebih cepat, efisien, dan terintegrasi dalam satu ekosistem layanan.' },
                    { icon: 'fa-file-shield', iconTone: 'emerald', title: 'Importir Berijin Resmi (API-U)', description: 'PT Perdana Adi Yuda memiliki API-U sebagai importir berijin resmi — keunggulan strategis untuk mendukung kebutuhan impor klien secara legal.' },
                    { icon: 'fa-gears', iconTone: 'brand', title: 'Solusi Operasional Terintegrasi', description: 'Fokus pada solusi praktis yang langsung mendukung produktivitas bisnis — dari pengiriman barang hingga pengelolaan SDM dan fasilitas.' },
                    { icon: 'fa-award', iconTone: 'brand', title: 'Perizinan Lengkap & Tim Berpengalaman', description: 'Didukung perizinan yang memadai serta tim profesional berpengalaman, memberikan kepercayaan bagi klien korporat maupun investor.' },
                ],
                cta: { label: 'Diskusikan Kebutuhan Bisnis Anda', href: 'contact.html' },
            },
        },
    };

    function iconToneClass(tone) {
        if (tone === 'emerald') {
            return 'shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700';
        }
        return 'shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A2540]/5 text-[#0A2540]';
    }

    function entityBorderClass(hover) {
        return hover === 'emerald' ? 'hover:border-emerald-200' : 'hover:border-blue-200';
    }

    function renderHero(hero) {
        const section = document.getElementById('about-hero');
        if (!section || !hero) return;

        section.setAttribute('aria-label', hero.ariaLabel || '');

        const headline = document.getElementById('about-hero-headline');
        const subheadline = document.getElementById('about-hero-subheadline');
        const cta = document.getElementById('about-hero-cta');
        const ctaLabel = document.getElementById('about-hero-cta-label');

        if (headline) headline.textContent = hero.headline || '';
        if (subheadline) subheadline.textContent = hero.subheadline || '';
        if (cta && hero.cta) cta.href = hero.cta.href || 'services.html';
        if (ctaLabel) ctaLabel.textContent = hero.cta?.label || '';
    }

    function renderWhoWeAre(section) {
        const root = document.getElementById('about-who-we-are');
        if (!root || !section) return;

        const entitiesHtml = (section.entities || []).map((entity) => {
            const highlightHtml = entity.highlight
                ? `<div class="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <i class="fa-solid fa-certificate text-emerald-600 mt-0.5"></i>
                        <div>
                            <div class="font-semibold text-emerald-800 text-sm sm:text-base">${entity.highlight.title}</div>
                            <p class="text-sm text-emerald-900/80 mt-1 leading-relaxed">${entity.highlight.descriptionHtml}</p>
                        </div>
                   </div>`
                : '';

            return `<article class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 ${entityBorderClass(entity.borderHover)} transition-colors">
                <div class="entity-logo-wrap mb-4">
                    <img src="${entity.logo}" alt="${entity.logoAlt}" class="entity-logo" width="986" height="388" loading="lazy">
                </div>
                <div class="entity-name entity-name--${entity.nameClass} mb-2">${entity.name}</div>
                <h3 class="text-xl sm:text-2xl font-semibold text-[#0A2540] mb-4">${entity.title}</h3>
                <p class="text-base text-gray-700 leading-relaxed${entity.highlight ? ' mb-5' : ''}">${entity.descriptionHtml}</p>
                ${highlightHtml}
            </article>`;
        }).join('');

        root.innerHTML = `
            <div class="text-center mb-10 sm:mb-14 max-w-3xl mx-auto">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-3">${section.eyebrow}</div>
                <h2 id="siapa-kami-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] mb-4 leading-snug">${section.title}</h2>
                <p class="text-base sm:text-lg text-gray-600 leading-relaxed">${section.intro}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 sm:gap-8">${entitiesHtml}</div>`;
    }

    function renderAdvantages(section) {
        const root = document.getElementById('about-advantages');
        if (!root || !section) return;

        const itemsHtml = (section.items || []).map((item) => `
            <div class="flex gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-gray-100">
                <div class="${iconToneClass(item.iconTone)}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <div>
                    <h3 class="font-semibold text-[#0A2540] mb-2">${item.title}</h3>
                    <p class="text-sm sm:text-base text-gray-600 leading-relaxed">${item.description}</p>
                </div>
            </div>`).join('');

        root.innerHTML = `
            <div class="text-center mb-10 sm:mb-12">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-3">${section.eyebrow}</div>
                <h2 id="keunggulan-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] leading-snug">${section.title}</h2>
            </div>
            <div class="grid sm:grid-cols-2 gap-5 sm:gap-6">${itemsHtml}</div>
            <div class="text-center mt-10 sm:mt-12">
                <a href="${section.cta?.href || 'contact.html'}" class="btn-tap inline-flex items-center justify-center gap-x-2 bg-[#0A2540] hover:bg-[#1E3A5F] text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors">
                    ${section.cta?.label || ''}
                    <i class="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>`;
    }

    function applyContent(content) {
        renderHero(content.hero);
        renderWhoWeAre(content.whoWeAre);
        renderAdvantages(content.advantages);
    }

    function init() {
        window.PeradaContent.loadPageContent(CONTENT_URL, FALLBACK).then(applyContent);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();