(function () {
    'use strict';

    const CONTENT_FILE = 'homepage-content.json';

    const FALLBACK = {
        advantages: {
            eyebrow: 'MENGAPA PERADA GROUP',
            title: 'Keunggulan yang Memberi Nilai bagi Bisnis Anda',
            intro: 'Satu grup dengan dua spesialisasi kuat — dirancang untuk kebutuhan korporat yang membutuhkan kecepatan, kepatuhan, dan integrasi layanan.',
            items: [
                {
                    icon: 'fa-layer-group',
                    title: 'Dua Spesialisasi, Satu Grup',
                    description: 'Logistik dan operasional bisnis terkoordinasi dalam satu mitra — lebih cepat, lebih efisien.',
                },
                {
                    icon: 'fa-file-shield',
                    title: 'Importir Berijin Resmi (API-U)',
                    description: 'PT Perdana Adi Yuda memiliki API-U untuk mendukung kebutuhan impor klien secara legal dan terstruktur.',
                },
                {
                    icon: 'fa-gears',
                    title: 'Solusi Operasional Terintegrasi',
                    description: 'Dari freight forwarding hingga SDM, event, dan facility management — dalam satu ekosistem layanan.',
                },
                {
                    icon: 'fa-award',
                    title: 'Perizinan Lengkap & Tim Berpengalaman',
                    description: 'Didukung sertifikasi, perizinan, dan tim profesional yang memahami kebutuhan korporat.',
                },
            ],
        },
        testimonials: {
            eyebrow: 'TESTIMONI',
            title: 'Dipercaya oleh Perusahaan Terbaik',
            intro: 'Pengalaman mitra korporat yang telah mempercayakan operasional logistik dan dukungan bisnis kepada PERADA GROUP.',
            items: [
                {
                    quote: 'Koordinasi logistik dan dukungan operasional dalam satu grup membuat proses kami jauh lebih efisien. Tim responsif dan memahami kebutuhan korporat.',
                    name: 'Budi Santoso',
                    position: 'Supply Chain Manager',
                    company: 'Perusahaan Manufaktur — Jawa Barat',
                },
                {
                    quote: 'Layanan freight forwarding dan customs clearance berjalan rapi. Kami merasakan penghematan waktu dan biaya yang signifikan sejak bermitra.',
                    name: 'Dewi Kusuma',
                    position: 'Head of Logistics',
                    company: 'Perusahaan Distribusi — Jakarta',
                },
                {
                    quote: 'Dukungan SDM, event, dan kebutuhan impor melalui importir berijin resmi menjadi nilai tambah besar. Satu mitra untuk berbagai kebutuhan operasional.',
                    name: 'Rizky Pratama',
                    position: 'Director of Operations',
                    company: 'Perusahaan Industri — Nasional',
                },
            ],
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

    function applyContent(content) {
        renderAdvantages(content.advantages);
        renderTestimonials(content.testimonials);
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