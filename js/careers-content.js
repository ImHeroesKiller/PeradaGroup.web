(function () {
    'use strict';

    const CONTENT_FILE = 'careers-content.json';
    const PORTAL_URL = 'https://portal.perada.net';

    const FALLBACK = {
        hero: {
            ariaLabel: 'Karir di PERADA GROUP',
            imageAlt: 'Tim profesional PERADA GROUP bekerja di kantor',
            headline: 'Bangun Karier di Grup yang Terus Berkembang',
            subheadline: 'Bergabung dengan PERADA GROUP — dua entitas spesialis di logistik dan operasional bisnis yang melayani mitra korporat di seluruh Indonesia.',
            cta: { label: 'Lihat Lowongan Terbuka', href: PORTAL_URL },
        },
        culture: {
            eyebrow: 'BUDAYA KERJA',
            title: 'Profesional, Kolaboratif, dan Berorientasi Hasil',
            intro: 'Di PERADA GROUP, setiap anggota tim berkontribusi pada solusi terintegrasi yang berdampak nyata bagi klien korporat. Kami menghargai inisiatif, kerja sama lintas divisi, dan komitmen terhadap standar profesional tertinggi.',
            introSecondaryHtml: 'Dengan dua entitas — <strong class="text-[#0A2540]">PT Perkasa Adi Yuda</strong> (logistik) dan <strong class="text-[#0A2540]">PT Perdana Adi Yuda</strong> (operasional bisnis & import API-U) — Anda mendapat eksposur ke beragam proyek dan peluang pengembangan karier yang lebih luas.',
            values: [
                { icon: 'fa-people-group', title: 'Kerja Tim', description: 'Kolaborasi lintas fungsi untuk menyelesaikan tantangan klien secara holistik.', featured: false },
                { icon: 'fa-bullseye', title: 'Fokus Kualitas', description: 'Standar kerja tinggi dan kepatuhan regulasi dalam setiap proyek.', featured: false },
                { icon: 'fa-seedling', title: 'Pertumbuhan', description: 'Lingkungan yang mendukung pembelajaran dan pengembangan kompetensi.', featured: true },
                { icon: 'fa-handshake', title: 'Integritas', description: 'Budaya saling menghormati, transparan, dan berorientasi mitra jangka panjang.', featured: false },
            ],
        },
        benefits: {
            eyebrow: 'MENGAPA BERGABUNG',
            title: 'Keunggulan Bekerja di PERADA GROUP',
            intro: 'Lebih dari sekadar pekerjaan — kesempatan untuk berkembang di ekosistem layanan korporat yang terus berkembang.',
            items: [
                { icon: 'fa-chart-line', title: 'Jalur Karier Jelas', description: 'Program pelatihan, mentoring, dan kesempatan naik jabatan yang terstruktur.', featured: false },
                { icon: 'fa-layer-group', title: 'Dua Entitas, Satu Grup', description: 'Eksposur ke logistik maupun operasional bisnis — termasuk proyek impor API-U.', featured: false },
                { icon: 'fa-building', title: 'Proyek Korporat Nyata', description: 'Bekerja dengan mitra korporat terkemuka di berbagai sektor industri.', featured: false },
                { icon: 'fa-heart', title: 'Lingkungan Suportif', description: 'Budaya kerja kolaboratif yang menghargai kontribusi setiap anggota tim.', featured: true },
            ],
        },
        portal: {
            eyebrow: 'CARA MELAMAR',
            title: 'Portal Karir Resmi',
            intro: 'Semua lowongan kerja dan proses rekrutmen dilakukan melalui portal karir resmi kami. Cari posisi yang sesuai, unggah lamaran, dan pantau status aplikasi Anda di satu tempat.',
            cta: { label: 'Buka Portal Karir', href: PORTAL_URL },
            portalUrl: 'portal.perada.net',
        },
        hrCta: {
            text: 'Ada pertanyaan tentang proses rekrutmen? Tim HR kami siap membantu.',
            cta: { label: 'Hubungi Tim HR', href: 'contact.html' },
        },
    };

    function valueCardClass(featured) {
        return featured
            ? 'bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6'
            : 'bg-white border border-gray-200 rounded-2xl p-5 sm:p-6';
    }

    function valueIconClass(featured) {
        return featured
            ? 'w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-3'
            : 'w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A2540]/5 text-[#0A2540] mb-3';
    }

    function benefitCardClass(featured) {
        return featured
            ? 'bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 hover:border-emerald-300 transition-colors'
            : 'bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 transition-colors';
    }

    function benefitIconClass(featured) {
        return featured
            ? 'w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-4'
            : 'w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A2540]/5 text-[#0A2540] mb-4';
    }

    function renderHero(hero) {
        const section = document.getElementById('careers-hero');
        if (!section || !hero) return;

        section.setAttribute('aria-label', hero.ariaLabel || '');

        const image = document.getElementById('careers-hero-image');
        if (image && hero.imageAlt) image.alt = hero.imageAlt;

        const headline = document.getElementById('careers-hero-headline');
        const subheadline = document.getElementById('careers-hero-subheadline');
        const cta = document.getElementById('careers-hero-cta');
        const ctaLabel = document.getElementById('careers-hero-cta-label');

        if (headline) headline.textContent = hero.headline || '';
        if (subheadline) subheadline.textContent = hero.subheadline || '';
        if (cta && hero.cta) {
            cta.href = hero.cta.href || PORTAL_URL;
            cta.target = '_blank';
            cta.rel = 'noopener noreferrer';
        }
        if (ctaLabel) ctaLabel.textContent = hero.cta?.label || '';
    }

    function renderCulture(culture) {
        const root = document.getElementById('careers-culture');
        if (!root || !culture) return;

        const valuesHtml = (culture.values || []).map((item) => `
            <div class="${valueCardClass(item.featured)}">
                <div class="${valueIconClass(item.featured)}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <h3 class="font-semibold text-[#0A2540] mb-1.5">${item.title}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">${item.description}</p>
            </div>`).join('');

        root.innerHTML = `
            <div class="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div>
                    <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${culture.eyebrow}</div>
                    <h2 id="budaya-kerja-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] leading-snug">${culture.title}</h2>
                    <p class="mt-4 text-gray-600 text-base leading-relaxed">${culture.intro}</p>
                    <p class="mt-3 text-gray-600 text-base leading-relaxed">${culture.introSecondaryHtml || ''}</p>
                </div>
                <div class="grid sm:grid-cols-2 gap-4">${valuesHtml}</div>
            </div>`;
    }

    function renderBenefits(benefits) {
        const root = document.getElementById('careers-benefits');
        if (!root || !benefits) return;

        const itemsHtml = (benefits.items || []).map((item) => `
            <div class="${benefitCardClass(item.featured)}">
                <div class="${benefitIconClass(item.featured)}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <h3 class="font-semibold text-[#0A2540] mb-2">${item.title}</h3>
                <p class="text-sm sm:text-base text-gray-600 leading-relaxed">${item.description}</p>
            </div>`).join('');

        root.innerHTML = `
            <div class="text-center mb-8 sm:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${benefits.eyebrow}</div>
                <h2 id="why-join-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] leading-snug">${benefits.title}</h2>
                <p class="mt-3 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">${benefits.intro}</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">${itemsHtml}</div>`;
    }

    function renderPortal(portal, hrCta) {
        const root = document.getElementById('careers-portal');
        if (!root || !portal) return;

        const portalHref = portal.cta?.href || PORTAL_URL;
        const portalUrl = portal.portalUrl || 'portal.perada.net';

        const hrBlock = hrCta
            ? `<div class="mt-10 pt-8 border-t border-gray-100">
                    <p class="text-gray-600 text-base leading-relaxed mb-4">${hrCta.text || ''}</p>
                    <a href="${hrCta.cta?.href || 'contact.html'}" class="btn-tap inline-flex items-center gap-x-2 border border-[#0A2540] text-[#0A2540] hover:bg-[#0A2540] hover:text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors">
                        ${hrCta.cta?.label || ''}
                        <i class="fa-solid fa-arrow-right text-sm"></i>
                    </a>
               </div>`
            : '';

        root.innerHTML = `
            <div class="max-w-3xl mx-auto text-center">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${portal.eyebrow}</div>
                <h2 id="how-to-apply-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] leading-snug mb-4">${portal.title}</h2>
                <p class="text-gray-600 text-base leading-relaxed mb-8">${portal.intro}</p>

                <a href="${portalHref}" target="_blank" rel="noopener noreferrer"
                   class="btn-tap inline-flex items-center gap-x-3 bg-[#0A2540] text-white font-semibold px-8 sm:px-10 py-4 rounded-2xl hover:bg-[#1E3A5F] transition-all text-base sm:text-lg">
                    <span>${portal.cta?.label || ''}</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

                <p class="mt-6 text-sm text-gray-500">
                    <a href="${portalHref}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-[#0A2540] font-medium transition-colors">${portalUrl}</a>
                </p>
                ${hrBlock}
            </div>`;
    }

    function applyContent(content) {
        renderHero(content.hero);
        renderCulture(content.culture);
        renderBenefits(content.benefits);
        renderPortal(content.portal, content.hrCta);
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