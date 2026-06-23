'use strict';

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const DATA_DIR = path.join(__dirname, '..', 'data');
const LOCALES = ['id', 'en', 'zh'];
const MODEL = 'gemini-3.1-flash-lite';

const PROMPT = `Anda adalah copywriter profesional untuk PERADA GROUP, perusahaan Indonesia yang mengintegrasikan:
- Logistics & Freight Forwarding (PT Perkasa Adi Yuda) — JPT, customs clearance
- Business Support & Integrated Solutions (PT Perdana Adi Yuda) — SDM, event, facility, importir berijin resmi (API-U)

Buat konten hero homepage dalam TIGA bahasa: Bahasa Indonesia (id), English (en), dan Simplified Chinese (zh).

Tone: profesional, modern, percaya diri, konsisten di ketiga bahasa — tidak berlebihan.

Aturan per locale:
- headline: maksimal 8–10 kata, menonjolkan "satu mitra / dua keahlian / solusi terintegrasi" (atau padanan natural di EN/ZH)
- valueProposition: 1–2 kalimat, sebutkan PT Perkasa (logistik) dan PT Perdana (operasional + importir berijin resmi / API-U)
- primaryCta: ajakan konsultasi (id: "Diskusikan Kebutuhan Anda" atau setara; en: "Discuss Your Business Needs" atau setara; zh: padanan profesional)
- secondaryCta: ajakan lihat layanan (id: "Lihat Layanan Lengkap" atau setara; en/zh: padanan natural)

Kembalikan HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan, dengan struktur persis:
{
  "id": {
    "headline": "...",
    "valueProposition": "...",
    "primaryCta": "...",
    "secondaryCta": "..."
  },
  "en": {
    "headline": "...",
    "valueProposition": "...",
    "primaryCta": "...",
    "secondaryCta": "..."
  },
  "zh": {
    "headline": "...",
    "valueProposition": "...",
    "primaryCta": "...",
    "secondaryCta": "..."
  }
}`;

function extractJson(text) {
    const trimmed = text.trim();
    const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const candidate = fenced ? fenced[1].trim() : trimmed;
    return JSON.parse(candidate);
}

function validateHeroLocale(data, locale) {
    const required = ['headline', 'valueProposition', 'primaryCta', 'secondaryCta'];
    for (const key of required) {
        if (typeof data[key] !== 'string' || !data[key].trim()) {
            throw new Error(`Invalid or missing field ${locale}.${key}`);
        }
    }

    const wordCount = data.headline.trim().split(/\s+/).length;
    if (locale !== 'zh' && wordCount > 12) {
        throw new Error(`Headline too long for ${locale} (${wordCount} words)`);
    }

    return {
        headline: data.headline.trim(),
        valueProposition: data.valueProposition.trim(),
        primaryCta: data.primaryCta.trim(),
        secondaryCta: data.secondaryCta.trim(),
    };
}

function validateAllLocales(payload) {
    const result = {};
    for (const locale of LOCALES) {
        if (!payload[locale] || typeof payload[locale] !== 'object') {
            throw new Error(`Missing locale block: ${locale}`);
        }
        result[locale] = validateHeroLocale(payload[locale], locale);
    }
    return result;
}

function writeLocaleFiles(contentByLocale) {
    for (const locale of LOCALES) {
        const filePath = path.join(DATA_DIR, locale, 'hero-content.json');
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, `${JSON.stringify(contentByLocale[locale], null, 2)}\n`, 'utf8');
        console.log(`Hero content written to data/${locale}/hero-content.json`);
    }
}

async function main() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('GEMINI_API_KEY secret is not configured');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
        model: MODEL,
        generationConfig: {
            temperature: 0.7,
            responseMimeType: 'application/json',
        },
    });

    const result = await model.generateContent(PROMPT);
    const raw = result.response.text();
    const parsed = validateAllLocales(extractJson(raw));

    writeLocaleFiles(parsed);
}

main().catch((error) => {
    console.error('Failed to generate hero content:', error.message);
    process.exit(1);
});