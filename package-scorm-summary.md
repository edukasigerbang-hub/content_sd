# SCORM-like Package Summary

## Package yang dibuat
- Folder paket: `ipas-package`
- File zip: `ipas-scorm-like.zip`

## Struktur paket
- `index.html`
- `bab1.html`
- `bab2.html`
- `bab3.html`
- `bab4.html`
- `style.css`
- `map.css`
- `index-script.js`
- `bab1-script.js`
- `bab2-script.js`
- `bab3-script.js`
- `bab4-script.js`
- `images/bg-home.png`
- `imsmanifest.xml`

## Keuntungan package ini
- Semua file konten, CSS, JS, dan asset image sudah dikumpulkan dalam satu paket.
- Paket bisa dibawa dan dibagikan sebagai satu unit.
- Struktur ini sudah cocok untuk kebutuhan SCORM-like packaging.

## Cara uji
1. Extract `ipas-scorm-like.zip`.
2. Buka `ipas-package/index.html` di browser.
3. Cek halaman home, tombol level 1–4, serta navigasi antar bab.
4. Pastikan background home muncul dari `images/bg-home.png`.
5. Pastikan progress/stars tetap berjalan karena file JS dan localStorage tetap ada.

## Catatan
- Ini adalah package SCORM-like, bukan SCORM lengkap dengan tracking LMS API.
- Untuk tracking otomatis seperti `cmi.core.lesson_status` dan score, perlu ditambahkan layer SCORM API nanti.
