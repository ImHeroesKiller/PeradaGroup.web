'use strict';

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'hero-content.json');
const MODEL = 'gemini-3.1-flash-lite';

const PROMPT = `Anda adalah copywriter profesional untuk PERADA GROUP, perusahaan Indonesia yang mengintegrasikan:
- Logistics & Freight Forwarding (PT Perkasa Adi Yuda) — JPT, customs clearance
- Business Support & Integrated Solutions (PT Perdana Adi Yuda) — SDM, event, facility, importir berijin resmi (API-U)

Buat konten hero homepage dalam Bahasa Indonesia dengan tone profesional, modern, percaya diri, dan tidak berlebihan.

Aturan:
- headline: maksimal 8–10 kata, kuat, menonjolkan "satu mitra, dua keahlian, solusi terintegrasi"
- valueProposition: 1–2 kalimat, sebutkan PT Perkasa (logistik) dan PT Perdana (operasional + importir berijin resmi)
- primaryCta: gunakan "Diskusikan Kebutuhan Anda" atau variasi setara
- secondaryCta: gunakan "Lihat Layanan Lengkap" atau variasi setara

Kembalikan HANYA JSON valid tanpa markdown, tanpa penjelasan tambahan, dengan struktur persis:
{
  "headline": "...",
  "valueProposition": "...",
  "primaryCta": "...",
  "secondaryCta": "..."
}`;

function extractJson(text) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(candidate);
}

function validateHeroContent(data) {
  const required = ['headline', 'valueProposition', 'primaryCta', 'secondaryCta'];
  for (const key of required) {
    if (typeof data[key] !== 'string' || !data[key].trim()) {
      throw new Error(`Invalid or missing field: ${key}`);
    }
  }

  const wordCount = data.headline.trim().split(/\s+/).length;
  if (wordCount > 12) {
    throw new Error(`Headline too long (${wordCount} words)`);
  }

  return {
    headline: data.headline.trim(),
    valueProposition: data.valueProposition.trim(),
    primaryCta: data.primaryCta.trim(),
    secondaryCta: data.secondaryCta.trim(),
  };
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
  const parsed = validateHeroContent(extractJson(raw));

  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');
  console.log('Hero content written to data/hero-content.json');
}

main().catch((error) => {
  console.error('Failed to generate hero content:', error.message);
  process.exit(1);
});
