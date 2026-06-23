(function () {
    'use strict';

    const CONTENT_FILE = 'homepage-content.json';

    const FALLBACK = {
        stats: {
            items: [
                { value: '200+', label: 'Klien Korporat' },
                { value: 'Nasional', label: 'Jangkauan Layanan' },
                { value: '2018', label: 'Melayani Indonesia' },
            ],
        },
        advantages: {
            eyebrow: 'MENGAPA PERADA GROUP',
            title: 'Keunggulan yang Memberi Nilai bagi Bisnis Anda',
            intro: 'Satu grup dengan dua spesialisasi kuat — dirancang untuk kebutuhan korporat yang membutuhkan kecepatan, kepatuhan, dan integrasi layanan.',
            items: [
                { icon: 'fa-layer-group', title: 'Dua Spesialisasi, Satu Grup', description: 'Logistik dan operasional bisnis terkoordinasi dalam satu mitra — lebih cepat, lebih efisien.' },
                { icon: 'fa-file-shield', title: 'Importir Berijin Resmi (API-U)', description: 'PT Perdana Adi Yuda memiliki API-U untuk mendukung kebutuhan impor klien secara legal dan terstruktur.' },
                { icon: 'fa-gears', title: 'Solusi Operasional Terintegrasi', description: 'Dari freight forwarding hingga SDM, event, dan facility management — dalam satu ekosistem layanan.' },
                { icon: 'fa-award', title: 'Perizinan Lengkap & Tim Berpengalaman', description: 'Didukung sertifikasi, perizinan, dan tim profesional yang memahami kebutuhan korporat.' },
            ],
        },
        solutions: {
            eyebrow: 'OUR SOLUTIONS',
            title: 'Dua Entitas, Satu Ekosistem Layanan',
            intro: 'PT Perkasa Adi Yuda menggerakkan logistik Anda. PT Perdana Adi Yuda mendukung seluruh operasional bisnis — termasuk impor resmi.',
            moreLabel: 'Selengkapnya',
            viewAll: 'Lihat Semua Layanan',
            viewAllHref: 'services.html',
            entities: [
                {
                    id: 'perkasa', name: 'PT Perkasa Adi Yuda', nameClass: 'perkasa', logo: 'assets/logo-perkasa-new.png',
                    logoAlt: 'Logo PT Perkasa Adi Yuda — divisi Logistics & Freight Forwarding PERADA GROUP',
                    title: 'Logistics & Freight Forwarding',
                    description: 'Menggerakkan bisnis Anda dengan logistik yang andal — JPT, customs clearance, dan pengiriman domestik & internasional.',
                    items: ['Jasa Pengurusan Transportasi (JPT)', 'Customs Clearance & Dokumentasi', 'Sertifikat Standar & Kepatuhan Regulasi'],
                    accent: 'blue',
                },
                {
                    id: 'perdana', name: 'PT Perdana Adi Yuda', nameClass: 'perdana', logo: 'assets/logo-perdana-new.png',
                    logoAlt: 'Logo PT Perdana Adi Yuda — divisi Business Support & Integrated Solutions PERADA GROUP',
                    title: 'Business Support & Integrated Solutions',
                    description: 'Dukungan operasional menyeluruh — SDM, event, facility management, hingga import & trading sebagai importir berijin resmi.',
                    items: ['Human Capital & Outsourcing', 'Import & Trading Solutions (API-U)', 'Event, Facility & Konsultasi Bisnis'],
                    accent: 'emerald',
                },
            ],
        },
        clients: {
            eyebrow: 'TRUSTED BY',
            title: 'Dipercaya oleh Perusahaan Terbaik di Indonesia',
            intro: 'Mitra korporat yang telah mempercayakan operasional logistik dan sumber daya manusia kepada PERADA GROUP.',
            logos: [
                { type: 'image', src: 'https://www.tvsscs.com/wp-content/uploads/2025/01/TVS-SCS-logo-with-tagline-white-2.svg', alt: 'Logo mitra korporat TVS Supply Chain Solutions', darkBg: true },
                { type: 'image', src: 'https://ioh.co.id/_nuxt/logo-ioh.BliL6vXr.svg', alt: 'Logo mitra korporat Indosat Ooredoo Hutchison' },
                { type: 'text', textHtml: 'Astra<br>Daihatsu', textClass: 'text-xs sm:text-sm md:text-base' },
                { type: 'text', text: 'Persaels', textClass: 'text-sm sm:text-base md:text-lg' },
                { type: 'image', src: 'https://imip.co.id/wp-content/uploads/2024/06/cropped-IMIP_logo-removebg-preview-270x270.png', alt: 'Logo mitra korporat Indonesia Morowali Industrial Park (IMIP)', imgClass: 'h-10 sm:h-12 max-w-[80%]' },
                { type: 'image', src: 'https://www.lintasarta.net/storage/2024/06/Logo-Lintasarta-new-300x132.png', alt: 'Logo mitra korporat Lintasarta' },
                { type: 'image', src: 'https://dyandramedia.com/image/logo.png', alt: 'Logo mitra korporat Dyandra Media', imgClass: 'h-8 sm:h-10 max-w-[85%]' },
                { type: 'image', src: 'https://bintang7.com/images/home/bintang-toejoe.png', alt: 'Logo mitra korporat Bintang Toedjoe', imgClass: 'h-8 sm:h-10 max-w-[85%]' },
            ],
        },
        testimonials: {
            eyebrow: 'TESTIMONI',
            title: 'Dipercaya oleh Perusahaan Terbaik',
            intro: 'Pengalaman mitra korporat yang telah mempercayakan operasional logistik dan dukungan bisnis kepada PERADA GROUP.',
            items: [
                { quote: 'Koordinasi logistik dan dukungan operasional dalam satu grup membuat proses kami jauh lebih efisien. Tim responsif dan memahami kebutuhan korporat.', name: 'Budi Santoso', position: 'Supply Chain Manager', company: 'Perusahaan Manufaktur — Jawa Barat' },
                { quote: 'Layanan freight forwarding dan customs clearance berjalan rapi. Kami merasakan penghematan waktu dan biaya yang signifikan sejak bermitra.', name: 'Dewi Kusuma', position: 'Head of Logistics', company: 'Perusahaan Distribusi — Jakarta' },
                { quote: 'Dukungan SDM, event, dan kebutuhan impor melalui importir berijin resmi menjadi nilai tambah besar. Satu mitra untuk berbagai kebutuhan operasional.', name: 'Rizky Pratama', position: 'Director of Operations', company: 'Perusahaan Industri — Nasional' },
            ],
        },
        finalCta: {
            title: 'Siap Bermitra dengan PERADA GROUP?',
            intro: 'Tim kami siap membantu kebutuhan logistik dan SDM Anda. Pelajari lebih lanjut atau hubungi kami langsung.',
            buttons: {
                contact: { label: 'Hubungi Kami', href: 'contact.html', icon: 'fa-envelope', primary: true },
                about: { label: 'Tentang Kami', href: 'about.html' },
                careers: { label: 'Karir', href: 'careers.html', icon: 'fa-briefcase' },
            },
        },
    };

    function isFeaturedItem(item) {
        return item.icon === 'fa-file-shield';
    }

    function cardClass(item) {
        return isFeaturedItem(item)
            ? 'bg-white border border-emerald-200 rounded-2xl p-5 sm:p-6 hover:border-emerald-300 transition-colors'
            : 'bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-blue-200 transition-colors';
    }

    function iconClass(item) {
        return isFeaturedItem(item)
            ? 'w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 mb-4'
            : 'w-10 h-10 flex items-center justify-center rounded-xl bg-[#0A2540]/5 text-[#0A2540] mb-4';
    }

    function renderStats(stats) {
        const root = document.getElementById('homepage-stats');
        if (!root || !stats) return;

        const itemsHtml = (stats.items || []).map((item, index) => {
            const valueClass = index === 0 ? 'text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight stat-number' : 'text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight';
            return `<div>
                <div class="${valueClass}">${item.value}</div>
                <div class="text-xs sm:text-sm text-white/55 mt-1">${item.label}</div>
            </div>`;
        }).join('');

        root.innerHTML = itemsHtml;
    }

    function renderAdvantages(advantages) {
        const root = document.getElementById('homepage-advantages');
        if (!root || !advantages) return;

        const itemsHtml = (advantages.items || []).map((item) => `
            <div class="${cardClass(item)}">
                <div class="${iconClass(item)}">
                    <i class="fa-solid ${item.icon}"></i>
                </div>
                <h3 class="font-semibold text-[#0A2540] mb-2">${item.title}</h3>
                <p class="text-sm sm:text-base text-gray-600 leading-relaxed">${item.description}</p>
            </div>`).join('');

        root.innerHTML = `
            <div class="text-center mb-8 md:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${advantages.eyebrow}</div>
                <h2 id="keunggulan-home-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold corporate-blue leading-snug">${advantages.title}</h2>
                <p class="mt-3 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed px-1">${advantages.intro || ''}</p>
            </div>
            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">${itemsHtml}</div>`;
    }

    function solutionEntityCard(entity, moreLabel) {
        const accent = entity.accent === 'emerald' ? 'emerald' : 'blue';
        const hoverClass = accent === 'emerald' ? 'hover:border-emerald-200' : 'hover:border-blue-200';
        const checkClass = accent === 'emerald' ? 'text-emerald-600' : 'text-blue-600';
        const itemsHtml = (entity.items || []).map((item) => `
            <li class="flex items-center gap-x-2"><i class="fa-solid fa-check ${checkClass} text-xs"></i> ${item}</li>`).join('');

        return `<a href="services.html" class="service-card group block bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 md:p-8 ${hoverClass} transition-all">
            <div class="entity-card-header">
                <div class="entity-logo-wrap">
                    <img src="${entity.logo}" alt="${entity.logoAlt}" class="entity-logo" width="${entity.id === 'perkasa' ? '986' : '1017'}" height="${entity.id === 'perkasa' ? '388' : '298'}" loading="lazy">
                </div>
                <div class="entity-name entity-name--${entity.nameClass}">${entity.name}</div>
                <h3 class="entity-title">${entity.title}</h3>
            </div>
            <p class="text-base text-gray-600 leading-relaxed mb-4">${entity.description}</p>
            <ul class="text-base text-gray-700 space-y-2 mb-5">${itemsHtml}</ul>
            <span class="text-sm font-semibold text-[#0A2540] group-hover:gap-x-2 inline-flex items-center gap-x-1 transition-all">${moreLabel} <i class="fa-solid fa-arrow-right text-xs"></i></span>
        </a>`;
    }

    function renderSolutions(solutions) {
        const root = document.getElementById('homepage-solutions');
        if (!root || !solutions) return;

        const entitiesHtml = (solutions.entities || []).map((entity) => solutionEntityCard(entity, solutions.moreLabel || '')).join('');

        root.innerHTML = `
            <div class="text-center mb-8 md:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${solutions.eyebrow}</div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold corporate-blue leading-snug">${solutions.title}</h2>
                <p class="mt-3 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed px-1">${solutions.intro || ''}</p>
            </div>
            <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">${entitiesHtml}</div>
            <div class="text-center mt-8">
                <a href="${solutions.viewAllHref || 'services.html'}" class="btn-tap inline-flex items-center justify-center gap-x-2 text-base font-semibold text-[#0A2540] hover:gap-x-3 transition-all">
                    ${solutions.viewAll || ''} <i class="fa-solid fa-arrow-right text-xs"></i>
                </a>
            </div>`;
    }

    function renderClientLogo(logo) {
        if (logo.type === 'text') {
            const content = logo.textHtml || logo.text || '';
            const inner = logo.textHtml
                ? `<span class="client-logo-text ${logo.textClass || 'text-sm sm:text-base'} font-bold tracking-tight text-center leading-tight">${content}</span>`
                : `<span class="client-logo-text ${logo.textClass || 'text-sm sm:text-base md:text-lg'} font-bold tracking-wide">${content}</span>`;
            return `<div class="client-logo-card flex items-center justify-center h-24 sm:h-24 md:h-28 px-3 sm:px-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl">${inner}</div>`;
        }

        const imgClass = logo.imgClass || 'h-7 sm:h-9 max-w-[90%]';
        const imageHtml = `<img src="${logo.src}" alt="${logo.alt || ''}" class="client-logo-img ${imgClass} w-auto object-contain" loading="lazy">`;

        if (logo.darkBg) {
            return `<div class="client-logo-card flex items-center justify-center h-24 sm:h-24 md:h-28 px-3 sm:px-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl">
                <div class="w-full h-10 sm:h-12 flex items-center justify-center bg-[#0A2540] rounded-lg px-3">${imageHtml}</div>
            </div>`;
        }

        return `<div class="client-logo-card flex items-center justify-center h-24 sm:h-24 md:h-28 px-3 sm:px-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl">${imageHtml}</div>`;
    }

    function renderClients(clients) {
        const root = document.getElementById('homepage-clients');
        if (!root || !clients) return;

        const logosHtml = (clients.logos || []).map(renderClientLogo).join('');

        root.innerHTML = `
            <div class="text-center mb-8 md:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-3">${clients.eyebrow}</div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold corporate-blue leading-snug px-1">${clients.title}</h2>
                <p class="mt-3 text-gray-500 max-w-xl mx-auto text-base leading-relaxed px-1">${clients.intro || ''}</p>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-4 md:gap-5">${logosHtml}</div>`;
    }

    function testimonialCardClass(index) {
        return index === 2
            ? 'bg-white border border-emerald-200 rounded-2xl p-6 sm:p-8 flex flex-col h-full'
            : 'bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 flex flex-col h-full';
    }

    function testimonialQuoteIconClass(index) {
        return index === 2 ? 'text-emerald-600 mb-4' : 'text-blue-600 mb-4';
    }

    function renderTestimonials(testimonials) {
        const root = document.getElementById('homepage-testimonials');
        if (!root || !testimonials) return;

        const itemsHtml = (testimonials.items || []).map((item, index) => `
            <blockquote class="${testimonialCardClass(index)}">
                <div class="${testimonialQuoteIconClass(index)}"><i class="fa-solid fa-quote-left text-2xl opacity-40"></i></div>
                <p class="text-base text-gray-700 leading-relaxed flex-1 mb-6">"${item.quote}"</p>
                <footer class="border-t border-gray-100 pt-4">
                    <cite class="not-italic">
                        <div class="font-semibold text-[#0A2540]">${item.name}</div>
                        <div class="text-sm text-gray-500 mt-0.5">${item.position}</div>
                        <div class="text-sm text-gray-400 mt-1">${item.company}</div>
                    </cite>
                </footer>
            </blockquote>`).join('');

        root.innerHTML = `
            <div class="text-center mb-8 md:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-3">${testimonials.eyebrow}</div>
                <h2 id="testimonials-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold corporate-blue leading-snug">${testimonials.title}</h2>
                <p class="mt-3 text-gray-500 max-w-xl mx-auto text-base leading-relaxed">${testimonials.intro || ''}</p>
            </div>
            <div class="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">${itemsHtml}</div>`;
    }

    function renderFinalCta(finalCta) {
        const root = document.getElementById('homepage-cta');
        if (!root || !finalCta) return;

        const buttons = finalCta.buttons || {};
        const buttonOrder = ['contact', 'about', 'careers'];

        const buttonsHtml = buttonOrder.map((key) => {
            const btn = buttons[key];
            if (!btn) return '';
            const iconHtml = btn.icon ? `<i class="fa-solid ${btn.icon} text-xs"></i> ` : '';
            if (btn.primary) {
                return `<a href="${btn.href}" class="btn-tap inline-flex items-center justify-center gap-x-2 bg-white text-[#0A2540] font-semibold px-6 sm:px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors text-base w-full sm:w-auto">
                    ${iconHtml}${btn.label}
                </a>`;
            }
            return `<a href="${btn.href}" class="btn-tap inline-flex items-center justify-center gap-x-2 border border-white/40 hover:bg-white/10 font-medium px-6 sm:px-8 py-3.5 rounded-xl transition-colors text-base w-full sm:w-auto">
                ${iconHtml}${btn.label}
            </a>`;
        }).join('');

        root.innerHTML = `
            <h2 class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold mb-4 leading-snug">${finalCta.title}</h2>
            <p class="text-white/75 max-w-lg mx-auto mb-8 text-base leading-relaxed">${finalCta.intro || ''}</p>
            <div class="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">${buttonsHtml}</div>`;
    }

    function applyContent(content) {
        renderStats(content.stats);
        renderAdvantages(content.advantages);
        renderSolutions(content.solutions);
        renderClients(content.clients);
        renderTestimonials(content.testimonials);
        renderFinalCta(content.finalCta);
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