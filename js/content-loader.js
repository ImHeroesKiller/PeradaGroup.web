/**
 * Shared utilities for loading multilingual page content from JSON.
 */
(function (global) {
    'use strict';

    function resolveLocale(data, locale) {
        const lang = locale || document.documentElement.lang || 'id';
        if (data && data[lang]) return data[lang];
        if (data && data.id) return data.id;
        if (data && data.en) return data.en;
        return data;
    }

    function fetchJson(url) {
        return fetch(url).then((response) => {
            if (!response.ok) throw new Error(`Failed to load ${url}`);
            return response.json();
        });
    }

    function loadPageContent(url, fallback) {
        return fetchJson(url)
            .then((data) => resolveLocale(data, null))
            .catch(() => resolveLocale(fallback, null));
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    global.PeradaContent = {
        resolveLocale,
        fetchJson,
        loadPageContent,
        escapeHtml,
    };
})(window);