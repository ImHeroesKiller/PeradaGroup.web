# PeradaGroup.web

Website korporat **PERADA GROUP** — Logistics & HR Solutions.

## Struktur

- `index.html` — Landing page (single-page)
- `about.html`, `services.html`, `careers.html`, `contact.html` — Halaman terpisah
- `css/style.css`, `js/main.js` — Assets shared
- `assets/` — Logo perusahaan

## Development Lokal

```bash
# Python
python3 -m http.server 8080

# atau Node.js
npx serve .
```

Buka `http://localhost:8080`

## Deploy ke Vercel

Proyek ini adalah static site tanpa build step.

### Opsi 1: GitHub Integration (disarankan)

1. Push repo ke GitHub
2. Buka [vercel.com/new](https://vercel.com/new)
3. Import repo `ImHeroesKiller/PeradaGroup.web`
4. Framework Preset: **Other**
5. Build Command: *(kosongkan)*
6. Output Directory: *(kosongkan / root)*
7. Deploy

Setiap push ke `main` akan otomatis di-deploy.

### Opsi 2: Vercel CLI

```bash
npx vercel login
npx vercel --prod
```

Konfigurasi deploy ada di `vercel.json`.