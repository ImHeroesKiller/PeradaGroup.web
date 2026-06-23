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

    function applyContent(content) {
        renderAdvantages(content.advantages);
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