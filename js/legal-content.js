(function () {
    'use strict';

    function createRenderer(contentFile, fallback) {
        function renderSection(section) {
            const paragraphsHtml = (section.paragraphs || []).map((p) => `<p>${p}</p>`).join('');
            const listHtml = section.list?.length
                ? `<ul class="legal-page__list">${section.list.map((item) => `<li>${item}</li>`).join('')}</ul>`
                : '';

            return `
                <section class="legal-page__section">
                    <h2 class="legal-page__section-title">${section.title || ''}</h2>
                    <div class="legal-page__section-body">${paragraphsHtml}${listHtml}</div>
                </section>`;
        }

        function renderPage(content) {
            if (!content) return;

            if (content.page?.title) document.title = content.page.title;

            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc && content.page?.description) {
                metaDesc.setAttribute('content', content.page.description);
            }

            const hero = content.hero || {};
            const heroSection = document.getElementById('legal-page-hero');
            if (heroSection && hero.ariaLabel) heroSection.setAttribute('aria-label', hero.ariaLabel);

            const headline = document.getElementById('legal-page-hero-headline');
            const subheadline = document.getElementById('legal-page-hero-subheadline');
            const updated = document.getElementById('legal-page-updated');
            if (headline && hero.headline) headline.textContent = hero.headline;
            if (subheadline && hero.subheadline) subheadline.textContent = hero.subheadline;
            if (updated && hero.updated) updated.textContent = hero.updated;

            const root = document.getElementById('legal-page-content');
            if (!root) return;

            const sectionsHtml = (content.sections || []).map(renderSection).join('');
            root.innerHTML = sectionsHtml;
        }

        function loadContent() {
            window.PeradaContent.loadLocalizedContent(contentFile, fallback).then(renderPage);
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
    }

    window.PeradaLegal = { createRenderer };
})();