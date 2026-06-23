(function () {
    'use strict';

    const CONTENT_FILE = 'contact-content.json';

    const CONTACT_EMAIL = 'info@perada.co.id';
    const CONTACT_PHONE = '0812-1414-4214';

    const FALLBACK = {
        hero: {
            ariaLabel: 'Hubungi PERADA GROUP',
            imageAlt: 'Kantor modern PERADA GROUP',
            headline: 'Mari Diskusikan Kebutuhan Bisnis Anda',
            subheadline: 'Satu mitra untuk logistik, operasional bisnis, dan import resmi — tim PERADA GROUP siap merespons dengan solusi terintegrasi yang disesuaikan.',
            cta: { label: 'Konsultasikan Sekarang', href: '#contact-form' },
        },
        channels: {
            eyebrow: 'HUBUNGI KAMI',
            title: 'Tim Konsultan Siap Mendampingi Anda',
            intro: 'Dari freight forwarding hingga SDM, event, facility management, hingga kebutuhan impor API-U — kami siap membantu mitra korporat di seluruh Indonesia.',
            address: {
                title: 'Alamat Kantor',
                line1: 'Plaza Summarecon Bekasi Lt. 7',
                line2: 'Jl. Boulevard Ahmad Yani, Sentra Summarecon, Bekasi',
            },
            email: { title: 'Email' },
            phone: { title: 'Telepon' },
            whatsapp: { title: 'WhatsApp' },
        },
        form: {
            eyebrow: 'FORMULIR KONTAK',
            title: 'Kirim Pesan',
            intro: 'Isi formulir di bawah dan tim kami akan menghubungi Anda dalam 1–2 hari kerja.',
            hidden: {
                subject: 'Pesan Baru dari Website PERADA GROUP',
                fromName: 'Website PERADA GROUP',
            },
            fields: {
                name: { label: 'Nama Lengkap *', placeholder: 'Nama Anda' },
                company: { label: 'Perusahaan', placeholder: 'Nama Perusahaan' },
                email: { label: 'Email *', placeholder: 'email@perusahaan.com' },
                phone: { label: 'No. Telepon / WA *', placeholder: '0812-XXXX-XXXX' },
                service: {
                    label: 'Layanan yang Diminati',
                    placeholder: 'Pilih layanan (opsional)',
                    options: [
                        { value: '', label: 'Pilih layanan (opsional)' },
                        { value: 'Logistics & Freight Forwarding', label: 'Logistics & Freight Forwarding' },
                        { value: 'Human Capital & Outsourcing', label: 'Human Capital & Outsourcing' },
                        { value: 'Import & Trading (API-U)', label: 'Import & Trading (API-U)' },
                        { value: 'Event & Facility Support', label: 'Event & Facility Support' },
                        { value: 'Konsultasi Umum / Lainnya', label: 'Konsultasi Umum / Lainnya' },
                    ],
                },
                message: {
                    label: 'Kebutuhan / Pesan *',
                    placeholder: 'Jelaskan kebutuhan bisnis Anda — logistik, SDM, impor, atau layanan terintegrasi lainnya...',
                },
            },
            submit: 'Kirim Pesan',
        },
        sidebar: {
            eyebrow: 'LOKASI & JAM KERJA',
            title: 'Kantor Pusat',
            hours: 'Senin–Jumat, 08.00–17.00 WIB',
            addressLabel: 'Alamat',
            line1: 'Plaza Summarecon Bekasi Lt. 7',
            line2: 'Jl. Boulevard Ahmad Yani, Sentra Summarecon, Bekasi',
            mapsLink: 'Buka di Google Maps',
            emailLabel: 'Email',
            phoneLabel: 'Telepon',
            whatsappLabel: 'WhatsApp',
            mapTitle: 'Peta Lokasi',
            mapCaption: 'Plaza Summarecon Bekasi Lt. 7, Jl. Boulevard Ahmad Yani, Sentra Summarecon, Bekasi',
            mapIframeTitle: 'Lokasi PERADA GROUP - Plaza Summarecon Bekasi Lt. 7',
        },
    };

    function setText(id, value) {
        const el = document.getElementById(id);
        if (el && value != null) el.textContent = value;
    }

    function renderHero(hero) {
        const section = document.getElementById('contact-hero');
        if (!section || !hero) return;

        section.setAttribute('aria-label', hero.ariaLabel || '');

        const image = document.getElementById('contact-hero-image');
        if (image && hero.imageAlt) image.alt = hero.imageAlt;

        setText('contact-hero-headline', hero.headline);
        setText('contact-hero-subheadline', hero.subheadline);

        const cta = document.getElementById('contact-hero-cta');
        if (cta && hero.cta) cta.href = hero.cta.href || '#contact-form';
        setText('contact-hero-cta-label', hero.cta?.label);
    }

    function renderChannels(channels) {
        if (!channels) return;

        setText('contact-channels-eyebrow', channels.eyebrow);
        setText('contact-channels-title', channels.title);
        setText('contact-channels-intro', channels.intro);

        setText('contact-card-address-title', channels.address?.title);
        setText('contact-card-address-line1', channels.address?.line1);
        setText('contact-card-address-line2', channels.address?.line2);

        setText('contact-card-email-title', channels.email?.title);
        setText('contact-card-email-value', CONTACT_EMAIL);

        setText('contact-card-phone-title', channels.phone?.title);
        setText('contact-card-phone-value', CONTACT_PHONE);

        setText('contact-card-whatsapp-title', channels.whatsapp?.title);
        setText('contact-card-whatsapp-value', CONTACT_PHONE);
    }

    function renderFormLabels(form) {
        if (!form) return;

        setText('contact-form-eyebrow', form.eyebrow);
        setText('contact-form-title', form.title);
        setText('contact-form-intro', form.intro);

        const subjectInput = document.querySelector('input[name="subject"]');
        const fromNameInput = document.querySelector('input[name="from_name"]');
        if (subjectInput && form.hidden?.subject) subjectInput.value = form.hidden.subject;
        if (fromNameInput && form.hidden?.fromName) fromNameInput.value = form.hidden.fromName;

        const fields = form.fields || {};

        setText('contact-field-name-label', fields.name?.label);
        setText('contact-field-company-label', fields.company?.label);
        setText('contact-field-email-label', fields.email?.label);
        setText('contact-field-phone-label', fields.phone?.label);
        setText('contact-field-service-label', fields.service?.label);
        setText('contact-field-message-label', fields.message?.label);

        const nameInput = document.getElementById('contact-field-name-input');
        const companyInput = document.getElementById('contact-field-company-input');
        const emailInput = document.getElementById('contact-field-email-input');
        const phoneInput = document.getElementById('contact-field-phone-input');
        const messageInput = document.getElementById('contact-field-message-textarea');

        if (nameInput) nameInput.placeholder = fields.name?.placeholder || '';
        if (companyInput) companyInput.placeholder = fields.company?.placeholder || '';
        if (emailInput) emailInput.placeholder = fields.email?.placeholder || '';
        if (phoneInput) phoneInput.placeholder = fields.phone?.placeholder || '';
        if (messageInput) messageInput.placeholder = fields.message?.placeholder || '';

        const select = document.getElementById('contact-field-service-select');
        const options = fields.service?.options || [];
        if (select && options.length) {
            const selectedValue = select.value;
            Array.from(select.options).forEach((optionEl) => {
                const match = options.find((opt) => opt.value === optionEl.value);
                if (match) optionEl.textContent = match.label;
            });
            select.value = selectedValue;
        }

        setText('contact-form-submit-label', form.submit);
    }

    function renderSidebar(sidebar) {
        if (!sidebar) return;

        setText('contact-sidebar-eyebrow', sidebar.eyebrow);
        setText('contact-sidebar-title', sidebar.title);
        setText('contact-sidebar-hours', sidebar.hours);

        setText('contact-sidebar-address-label', sidebar.addressLabel);
        setText('contact-sidebar-address-line1', sidebar.line1);
        setText('contact-sidebar-address-line2', sidebar.line2);
        setText('contact-sidebar-maps-link', sidebar.mapsLink);

        setText('contact-sidebar-email-label', sidebar.emailLabel);
        setText('contact-sidebar-phone-label', sidebar.phoneLabel);
        setText('contact-sidebar-whatsapp-label', sidebar.whatsappLabel);

        setText('contact-map-title', sidebar.mapTitle);
        setText('contact-map-caption', sidebar.mapCaption);

        const iframe = document.getElementById('contact-map-iframe');
        if (iframe && sidebar.mapIframeTitle) iframe.title = sidebar.mapIframeTitle;
    }

    function applyContent(content) {
        renderHero(content.hero);
        renderChannels(content.channels);
        renderFormLabels(content.form);
        renderSidebar(content.sidebar);
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