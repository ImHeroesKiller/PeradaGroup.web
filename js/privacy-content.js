(function () {
    'use strict';

    const CONTENT_FILE = 'privacy-content.json';

    const FALLBACK = {
        page: {
            title: 'Kebijakan Privasi | PERADA GROUP',
            description: 'Kebijakan privasi PERADA GROUP mengenai pengumpulan, penggunaan, dan perlindungan data pribadi.',
        },
        hero: {
            ariaLabel: 'Kebijakan Privasi PERADA GROUP',
            headline: 'Kebijakan Privasi',
            subheadline: 'Kami berkomitmen melindungi data pribadi Anda dengan transparansi dan kehati-hatian.',
            updated: 'Terakhir diperbarui: 24 Juni 2026',
        },
        sections: [],
    };

    window.PeradaLegal.createRenderer(CONTENT_FILE, FALLBACK);
})();