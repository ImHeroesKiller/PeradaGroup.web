/**
 * Shared utilities for loading multilingual page content from JSON.
 */
(function (global) {
    'use strict';

    const STORAGE_KEY = 'perada_locale';
    const SUPPORTED_LOCALES = ['id', 'en', 'zh'];
    const DEFAULT_LOCALE = 'id';

    const HTML_LANG_MAP = {
        id: 'id',
        en: 'en',
        zh: 'zh-Hans',
    };

    function normalizeLocale(locale) {
        if (locale && SUPPORTED_LOCALES.includes(locale)) return locale;
        return DEFAULT_LOCALE;
    }

    function getLocale() {
        try {
            return normalizeLocale(localStorage.getItem(STORAGE_KEY));
        } catch {
            return DEFAULT_LOCALE;
        }
    }

    function setLocale(locale) {
        const next = normalizeLocale(locale);
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            /* ignore quota errors */
        }
        applyDocumentLocale(next);
        global.dispatchEvent(new CustomEvent('perada:localechange', { detail: { locale: next } }));
        return next;
    }

    function applyDocumentLocale(locale) {
        const lang = HTML_LANG_MAP[locale] || DEFAULT_LOCALE;
        document.documentElement.lang = lang;
    }

    function localizedContentUrl(contentFile, locale) {
        const lang = normalizeLocale(locale || getLocale());
        return `/data/${lang}/${contentFile}`;
    }

    function resolveLocale(data, locale) {
        const lang = normalizeLocale(locale || getLocale());
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

    /** Legacy: single JSON file with nested locale keys (id, en, …). */
    function loadPageContent(url, fallback) {
        return fetchJson(url)
            .then((data) => resolveLocale(data, null))
            .catch(() => resolveLocale(fallback, null));
    }

    /** New: per-locale files at data/{lang}/{contentFile}. */
    function loadLocalizedContent(contentFile, fallback) {
        const locale = getLocale();
        const primaryUrl = localizedContentUrl(contentFile, locale);

        return fetchJson(primaryUrl)
            .catch(() => {
                if (locale !== DEFAULT_LOCALE) {
                    return fetchJson(localizedContentUrl(contentFile, DEFAULT_LOCALE));
                }
                throw new Error('Localized content unavailable');
            })
            .catch(() => fallback);
    }

    function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    applyDocumentLocale(getLocale());

    global.PeradaContent = {
        STORAGE_KEY,
        SUPPORTED_LOCALES,
        DEFAULT_LOCALE,
        getLocale,
        setLocale,
        applyDocumentLocale,
        localizedContentUrl,
        resolveLocale,
        fetchJson,
        loadPageContent,
        loadLocalizedContent,
        escapeHtml,
    };
})(window);