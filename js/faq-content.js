(function () {
    'use strict';

    const CONTENT_FILE = 'faq-content.json';
    const ROOT_IDS = ['services-faq', 'faq-page-content'];

    const FALLBACK = {
        page: {
            heroAriaLabel: 'FAQ PERADA GROUP',
            heroHeadline: 'Pertanyaan yang Sering Diajukan',
            heroSubheadline: 'Temukan jawaban seputar layanan logistik, sumber daya manusia, dan solusi operasional bisnis PERADA GROUP.',
        },
        section: {
            eyebrow: 'FAQ',
            title: 'Pertanyaan yang Sering Diajukan',
            intro: 'Jawaban singkat seputar layanan, proses kerja sama, dan cakupan operasional PERADA GROUP. Masih ada pertanyaan lain? Tim kami siap membantu.',
            cta: { label: 'Hubungi Tim Konsultan', href: 'contact.html' },
        },
        items: [],
    };

    function getAnswerHtml(item) {
        return item.answer || item.answerHtml || '';
    }

    function renderPageMeta(page) {
        if (!page) return;
        if (page.title) document.title = page.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && page.description) metaDesc.setAttribute('content', page.description);
    }

    function renderPageHero(page) {
        if (!page) return;

        const section = document.getElementById('faq-page-hero');
        if (section && page.heroAriaLabel) section.setAttribute('aria-label', page.heroAriaLabel);

        const headline = document.getElementById('faq-page-hero-headline');
        const subheadline = document.getElementById('faq-page-hero-subheadline');
        if (headline && page.heroHeadline) headline.textContent = page.heroHeadline;
        if (subheadline && page.heroSubheadline) subheadline.textContent = page.heroSubheadline;
    }

    function buildFaqHtml(faq) {
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

        return `
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

    function renderFaqToRoot(root, faq) {
        root.innerHTML = buildFaqHtml(faq);
        initAccordion(root);
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

    function renderFaq(faq) {
        if (!faq) return;

        renderPageMeta(faq.page);
        renderPageHero(faq.page);

        ROOT_IDS.forEach((id) => {
            const root = document.getElementById(id);
            if (root) renderFaqToRoot(root, faq);
        });

        if (document.getElementById('faq-page-content') || document.getElementById('services-faq')) {
            injectFaqSchema(faq.items || []);
        }
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