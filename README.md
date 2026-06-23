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

## SEO & Search Console

### File yang tersedia

| File | URL |
|------|-----|
| `sitemap.xml` | https://perada.net/sitemap.xml |
| `robots.txt` | https://perada.net/robots.txt |

`robots.txt` mengizinkan crawling dan menunjuk ke sitemap. URL di sitemap menggunakan clean URL (sesuai `canonical` di setiap halaman).

### Submit ke Google Search Console

1. Buka [Google Search Console](https://search.google.com/search-console) dan login dengan akun Google bisnis.
2. Klik **Add property** → pilih **URL prefix** → masukkan `https://perada.net`.
3. Verifikasi kepemilikan domain (disarankan metode **DNS TXT record** di registrar domain, atau file HTML upload).
4. Setelah terverifikasi, buka menu **Sitemaps** di sidebar kiri.
5. Di kolom "Add a new sitemap", masukkan: `sitemap.xml`
6. Klik **Submit**.
7. Status harus berubah menjadi *Success* setelah Google selesai memproses (biasanya beberapa jam hingga beberapa hari).
8. Opsional: gunakan **URL Inspection** untuk meminta indexing halaman utama (`/`, `/about`, `/services`, dll.).

### Bing Webmaster Tools

1. Daftar di [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Tambahkan situs `https://perada.net` — verifikasi via DNS atau import dari Google Search Console (jika sudah terverifikasi di GSC).
3. Submit sitemap yang sama: `https://perada.net/sitemap.xml`
4. Aktifkan **URL Submission** untuk halaman penting jika diperlukan.

### Google Business Profile

Karena PERADA GROUP memiliki kantor fisik di Bekasi, buat atau klaim profil di [Google Business Profile](https://business.google.com):

- **Nama:** PERADA GROUP
- **Kategori:** Perusahaan logistik / Jasa SDM (sesuai layanan utama)
- **Alamat:** Plaza Summarecon Bekasi Lt. 7, Jl. Boulevard Ahmad Yani, Sentra Summarecon, Bekasi
- **Telepon:** 0812-1414-4214
- **Website:** https://perada.net
- **Jam operasional:** sesuaikan dengan jam kantor aktual
- Upload foto kantor dan logo resmi; pastikan konsisten dengan informasi di website

Profil ini membantu tampil di Google Maps dan hasil pencarian lokal.