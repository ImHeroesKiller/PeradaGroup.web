'use strict';

const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'hero-content.json');
const MODEL = 'gemini-1.5-flash';

const PROMPT = `Anda adalah copywriter profesional untuk PERADA GROUP, perusahaan Indonesia yang mengintegrasikan:
- Logistics & Freight Forwarding (PT Perkasa Adi Yuda)
- Outsourcing & HR Solutions (PT Perdana Adi Yuda)

Buat konten hero homepage dalam Bahasa Indonesia dengan tone profesional, modern, percaya diri, dan tidak berlebihan.

Aturan:
- headline: maksimal 8–10 kata, kuat, spesifik, menonjolkan manfaat integrasi Logistik + SDM
- valueProposition: 1–2 kalimat, jelaskan keunggulan "satu grup, dua spesialis", benefit-oriented bagi klien
- primaryCta: singkat, langsung, profesional (contoh: "Konsultasikan Kebutuhan Anda")
- secondaryCta: gunakan "Lihat Solusi Terintegrasi" atau variasi setara yang natural

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