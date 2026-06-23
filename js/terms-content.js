(function () {
    'use strict';

    const CONTENT_FILE = 'terms-content.json';

    const FALLBACK = {
        page: {
            title: 'Syarat & Ketentuan | PERADA GROUP',
            description: 'Syarat dan ketentuan penggunaan situs web serta layanan PERADA GROUP.',
        },
        hero: {
            ariaLabel: 'Syarat dan Ketentuan PERADA GROUP',
            headline: 'Syarat & Ketentuan',
            subheadline: 'Ketentuan penggunaan situs web dan layanan PERADA GROUP.',
            updated: 'Terakhir diperbarui: 24 Juni 2026',
        },
        sections: [],
    };

    window.PeradaLegal.createRenderer(CONTENT_FILE, FALLBACK);
})();