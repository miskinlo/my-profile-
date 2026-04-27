# Portofolio — Ahmad Baehaqi

Website portofolio pribadi Ahmad Baehaqi, dibuat dengan HTML, CSS, dan JavaScript murni (tanpa framework, tanpa build step). Tema visual: **korporat / profesional** dengan palet navy–gold yang rapi.

## Cuplikan konten

- **Hero** — nama, gelar/posisi, ringkasan profil, dan kartu info kontak.
- **Tentang Saya** — fokus kerja dan nilai-nilai profesional.
- **Keahlian** — 6 kemampuan inti (forklift, crane, gudang, Ms Office, jaringan, mesin mixing).
- **Pengalaman** — timeline 4 pekerjaan: PT Sinar Alfa Omega, PT Satyaraya Keramindo, PT Molex Ayus, PT JJ Lap Cable.
- **Pendidikan** — SMK Negeri 3 Kota Tangerang (TKJ, 2020).
- **Sertifikasi** — SIO Forklift, Pelatihan Jaringan Cisco (predikat Sangat Baik), Paklaring, dan Skema Kompetensi Kemenperin 2020.
- **Kontak** — email, WhatsApp, dan lokasi.

## Menjalankan secara lokal

Karena ini situs statis, cukup buka `index.html` di browser, atau jalankan server statis kecil:

```bash
# Python 3
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

Atau dengan Node.js:

```bash
npx serve .
```

## Struktur berkas

```
.
├── index.html     # Markup semua section (hero, about, skills, experience, dll.)
├── styles.css     # Tema korporat (navy + gold), responsive
├── script.js      # Mobile nav toggle, active link highlight, tahun footer
└── README.md
```

## Kustomisasi cepat

Semua teks ada di `index.html`. Untuk mengubah:

- **Nama / tagline** — cari `<h1>Ahmad Baehaqi</h1>` dan paragraf `.title` di section hero.
- **Kontak** — ubah `ahmadbaehaqi505@gmail.com`, nomor `+6289514371955`, dan lokasi pada section hero dan contact.
- **Pengalaman** — edit `<li class="timeline-item">` di section `#experience`.
- **Warna** — ubah variabel CSS di `:root` dalam `styles.css` (`--navy-*`, `--accent`, dll.).

## Deploy

Folder ini langsung bisa di-deploy sebagai static site ke layanan seperti:

- GitHub Pages (jadikan branch `main` sebagai source).
- Netlify / Vercel — drag & drop folder atau hubungkan repo ini.
- devinapps.com — auto-deploy dari Devin.

## Lisensi

Konten (nama, pengalaman, sertifikat) dimiliki oleh Ahmad Baehaqi. Kode template bebas digunakan ulang.
