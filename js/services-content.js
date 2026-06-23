(function () {
    'use strict';

    const CONTENT_URL = '/data/services-content.json';

    const FALLBACK = {
        defaultLocale: 'id',
        id: {
            hero: {
                ariaLabel: 'Layanan PERADA GROUP',
                headline: 'Solusi Terintegrasi untuk Logistik & Operasional Bisnis',
                subheadline: 'Dua entitas spesialis PERADA GROUP — logistik andal dan dukungan operasional menyeluruh, termasuk importir berijin resmi.',
                cta: { label: 'Konsultasikan Kebutuhan Anda', href: 'contact.html' },
            },
            perkasa: {
                name: 'PT Perkasa Adi Yuda',
                title: 'Logistics & Freight Forwarding',
                tagline: 'Menggerakkan Bisnis Anda dengan Logistik yang Andal',
                logoAlt: 'Logo PT Perkasa Adi Yuda — divisi Logistics & Freight Forwarding PERADA GROUP',
                services: {
                    title: 'Layanan Utama',
                    icon: 'fa-ship',
                    items: [
                        'Jasa Pengurusan Transportasi (JPT)',
                        'Pengurusan pengiriman domestik dan internasional',
                        'Customs clearance dan dokumentasi kepabeanan',
                    ],
                },
                advantages: {
                    title: 'Keunggulan',
                    icon: 'fa-medal',
                    summaryHtml: 'Memiliki <strong>Sertifikat Standar</strong> dan berfokus pada efisiensi waktu, biaya, serta kepatuhan regulasi dalam setiap proses pengurusan transportasi.',
                    items: [
                        { icon: 'fa-clock', text: 'Efisiensi waktu pengiriman' },
                        { icon: 'fa-coins', text: 'Optimasi biaya logistik' },
                        { icon: 'fa-scale-balanced', text: 'Kepatuhan regulasi terjamin' },
                    ],
                },
            },
            perdana: {
                name: 'PT Perdana Adi Yuda',
                title: 'Business Support & Integrated Solutions',
                tagline: 'Mendukung Operasional Bisnis Anda dari SDM hingga Supply Chain',
                logoAlt: 'Logo PT Perdana Adi Yuda — divisi Business Support & Integrated Solutions PERADA GROUP',
                categories: [
                    { icon: 'fa-users', title: 'Human Capital & Outsourcing', description: 'Penyediaan dan pengelolaan tenaga kerja, pelatihan, serta rekrutmen untuk mendukung produktivitas dan stabilitas operasional perusahaan Anda.', featured: false, colSpan: false },
                    { icon: 'fa-bullhorn', title: 'Event, Marketing & Activation', description: 'Penyelenggaraan event, MICE, pameran bisnis, dan jasa periklanan untuk memperkuat brand presence dan engagement pasar Anda.', featured: false, colSpan: false },
                    { icon: 'fa-building', title: 'Facility & Operational Support', description: 'Cleaning service, facility management, serta penyewaan kendaraan dan peralatan untuk menjaga kelancaran aktivitas harian di lokasi operasional.', featured: false, colSpan: false },
                    { icon: 'fa-globe', title: 'Import & Trading Solutions', descriptionHtml: 'PT Perdana Adi Yuda adalah <strong>Importir Berijin Resmi</strong> yang memiliki <strong>API-U (Angka Pengenal Impor)</strong>. Kami mendukung perdagangan mesin, peralatan industri, komponen otomotif listrik, panel surya, dan berbagai kebutuhan impor klien secara legal dan terstruktur.', badge: 'USP', footnote: 'Berijin resmi — siap mendukung kebutuhan impor korporat', featured: true, colSpan: false },
                    { icon: 'fa-chart-line', title: 'Konsultasi & Pengembangan Bisnis', description: 'Konsultasi manajemen, strategi bisnis, dan pengembangan operasional untuk membantu perusahaan mengambil keputusan yang lebih tepat dan berkelanjutan.', featured: false, colSpan: true },
                ],
                cta: { label: 'Mulai Konsultasi dengan Tim Kami', href: 'contact.html' },
            },
        },
    };

    function renderHero(hero) {
        const section = document.getElementById('services-hero');
        if (!section || !hero) return;

        section.setAttribute('aria-label', hero.ariaLabel || '');

        const headline = document.getElementById('services-hero-headline');
        const subheadline = document.getElementById('services-hero-subheadline');
        const cta = document.getElementById('services-hero-cta');
        const ctaLabel = document.getElementById('services-hero-cta-label');

        if (headline) headline.textContent = hero.headline || '';
        if (subheadline) subheadline.textContent = hero.subheadline || '';
        if (cta && hero.cta) cta.href = hero.cta.href || 'contact.html';
        if (ctaLabel) ctaLabel.textContent = hero.cta?.label || '';
    }

    function renderPerkasa(perkasa) {
        const root = document.getElementById('services-perkasa');
        if (!root || !perkasa) return;

        const serviceItems = (perkasa.services?.items || []).map((item) => `
            <li class="flex items-start gap-x-2"><i class="fa-solid fa-check text-blue-600 mt-1 text-xs"></i> ${item}</li>`).join('');

        const advantageItems = (perkasa.advantages?.items || []).map((item) => `
            <li class="flex items-center gap-x-2"><i class="fa-solid ${item.icon} text-blue-600 text-xs"></i> ${item.text}</li>`).join('');

        root.innerHTML = `
            <div class="entity-section-header entity-card-header mb-8 sm:mb-10">
                <div class="entity-logo-wrap">
                    <img src="assets/logo-perkasa-new.png" alt="${perkasa.logoAlt}" class="entity-logo" width="986" height="388" loading="lazy">
                </div>
                <div class="entity-name entity-name--perkasa">${perkasa.name}</div>
                <h2 id="perkasa-services-heading" class="entity-title text-2xl md:text-3xl">${perkasa.title}</h2>
                <p class="mt-3 text-base sm:text-lg text-blue-700 font-medium">${perkasa.tagline}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div class="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                    <h3 class="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-x-2 text-[#0A2540]">
                        <i class="fa-solid ${perkasa.services?.icon || 'fa-ship'} text-blue-600"></i>
                        ${perkasa.services?.title || ''}
                    </h3>
                    <ul class="space-y-3 text-base text-gray-700 leading-relaxed">${serviceItems}</ul>
                </div>
                <div class="bg-blue-50 border border-blue-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                    <h3 class="font-semibold text-lg sm:text-xl mb-4 flex items-center gap-x-2 text-[#0A2540]">
                        <i class="fa-solid ${perkasa.advantages?.icon || 'fa-medal'} text-blue-600"></i>
                        ${perkasa.advantages?.title || ''}
                    </h3>
                    <p class="text-base text-gray-700 leading-relaxed mb-4">${perkasa.advantages?.summaryHtml || ''}</p>
                    <ul class="space-y-2 text-sm sm:text-base text-gray-600">${advantageItems}</ul>
                </div>
            </div>`;
    }

    function renderPerdana(perdana) {
        const root = document.getElementById('services-perdana');
        if (!root || !perdana) return;

        const categoriesHtml = (perdana.categories || []).map((cat) => {
            const cardClass = cat.featured
                ? 'bg-white border-2 border-emerald-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative overflow-hidden'
                : 'bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8';
            const colSpan = cat.colSpan ? ' sm:col-span-2' : '';
            const badge = cat.badge
                ? `<div class="absolute top-0 right-0 bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-xl">${cat.badge}</div>`
                : '';
            const iconWrapClass = cat.featured
                ? 'w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-4'
                : 'w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A2540]/5 text-[#0A2540] mb-4';
            const body = cat.descriptionHtml
                ? `<p class="text-base text-gray-700 leading-relaxed mb-4">${cat.descriptionHtml}</p>`
                : `<p class="text-base text-gray-600 leading-relaxed">${cat.description || ''}</p>`;
            const footnote = cat.footnote
                ? `<div class="flex items-center gap-2 text-sm font-medium text-emerald-800">
                        <i class="fa-solid fa-certificate"></i>
                        <span>${cat.footnote}</span>
                   </div>`
                : '';

            return `<div class="${cardClass}${colSpan}">
                ${badge}
                <div class="${iconWrapClass}"><i class="fa-solid ${cat.icon}"></i></div>
                <h3 class="font-semibold text-lg sm:text-xl text-[#0A2540] mb-3">${cat.title}</h3>
                ${body}
                ${footnote}
            </div>`;
        }).join('');

        root.innerHTML = `
            <div class="entity-section-header entity-card-header mb-8 sm:mb-10">
                <div class="entity-logo-wrap">
                    <img src="assets/logo-perdana-new.png" alt="${perdana.logoAlt}" class="entity-logo" width="1017" height="298" loading="lazy">
                </div>
                <div class="entity-name entity-name--perdana">${perdana.name}</div>
                <h2 id="perdana-services-heading" class="entity-title text-2xl md:text-3xl">${perdana.title}</h2>
                <p class="mt-3 text-base sm:text-lg text-emerald-700 font-medium">${perdana.tagline}</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4 sm:gap-6">${categoriesHtml}</div>
            <div class="text-center mt-10 sm:mt-12">
                <a href="${perdana.cta?.href || 'contact.html'}" class="btn-tap inline-flex items-center justify-center gap-x-2 bg-[#0A2540] hover:bg-[#1E3A5F] text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors">
                    ${perdana.cta?.label || ''}
                    <i class="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>`;
    }

    function applyContent(content) {
        renderHero(content.hero);
        renderPerkasa(content.perkasa);
        renderPerdana(content.perdana);
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