(function () {
    'use strict';

    const CONTENT_FILE = 'faq-content.json';

    const FALLBACK = {
        section: {
            eyebrow: 'FAQ',
            title: 'Pertanyaan yang Sering Diajukan',
            intro: 'Jawaban singkat seputar layanan, proses kerja sama, dan cakupan operasional PERADA GROUP. Masih ada pertanyaan lain? Tim kami siap membantu.',
            cta: { label: 'Hubungi Tim Konsultan', href: 'contact.html' },
        },
        items: [
            {
                id: 'layanan-utama',
                question: 'Apa saja layanan utama PERADA GROUP?',
                answer: 'PERADA GROUP menghadirkan dua spesialisasi dalam satu grup — logistik melalui PT Perkasa Adi Yuda dan dukungan operasional bisnis melalui PT Perdana Adi Yuda, termasuk importir berijin resmi (API-U).',
            },
            {
                id: 'impor-api-u',
                question: 'Apakah PT Perdana Adi Yuda bisa membantu impor barang?',
                answer: 'Ya. PT Perdana Adi Yuda memiliki API-U sebagai importir berijin resmi dan dapat mendukung kebutuhan impor klien secara legal dan terstruktur.',
            },
        ],
    };

    function getAnswerHtml(item) {
        return item.answer || item.answerHtml || '';
    }

    function renderFaq(faq) {
        const root = document.getElementById('services-faq');
        if (!root || !faq) return;

        const section = faq.section || {};
        const items = faq.items || [];

        const itemsHtml = items.map((item, index) => `
            <details class="faq-item" id="faq-${item.id || index}"${index === 0 ? ' open' : ''}>
                <summary class="faq-item__summary">
                    <span class="faq-item__question">${item.question || ''}</span>
                    <span class="faq-item__icon" aria-hidden="true">
                        <i class="fa-solid fa-chevron-down faq-item__chevron"></i>
                    </span>
                </summary>
                <div class="faq-item__answer">
                    <p>${getAnswerHtml(item)}</p>
                </div>
            </details>`).join('');

        root.innerHTML = `
            <div class="text-center mb-8 sm:mb-10">
                <div class="text-xs sm:text-sm font-semibold tracking-[2px] sm:tracking-[3px] text-blue-600 mb-2">${section.eyebrow || 'FAQ'}</div>
                <h2 id="faq-heading" class="text-2xl sm:text-3xl md:text-4xl tracking-tight font-semibold text-[#0A2540] leading-snug">${section.title || ''}</h2>
                <p class="mt-3 text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">${section.intro || ''}</p>
            </div>
            <div class="faq-accordion max-w-3xl mx-auto" role="list">${itemsHtml}</div>
            <div class="text-center mt-8 sm:mt-10">
                <a href="${section.cta?.href || 'contact.html'}" class="btn-tap inline-flex items-center justify-center gap-x-2 bg-[#0A2540] hover:bg-[#1E3A5F] text-white font-semibold px-6 sm:px-8 py-3.5 rounded-xl transition-colors">
                    ${section.cta?.label || 'Hubungi Kami'}
                    <i class="fa-solid fa-arrow-right text-sm"></i>
                </a>
            </div>`;

        initAccordion(root);
        injectFaqSchema(items);
    }

    function initAccordion(root) {
        const items = root.querySelectorAll('.faq-item');
        items.forEach((item) => {
            item.addEventListener('toggle', () => {
                if (!item.open) return;
                items.forEach((other) => {
                    if (other !== item && other.open) other.open = false;
                });
            });
        });
    }

    function injectFaqSchema(items) {
        if (!items.length) return;

        const existing = document.getElementById('faq-schema');
        if (existing) existing.remove();

        const schema = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: stripHtml(getAnswerHtml(item)),
                },
            })),
        };

        const script = document.createElement('script');
        script.id = 'faq-schema';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function stripHtml(html) {
        const el = document.createElement('div');
        el.innerHTML = html;
        return el.textContent || '';
    }

    function loadContent() {
        window.PeradaContent.loadLocalizedContent(CONTENT_FILE, FALLBACK).then(renderFaq);
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