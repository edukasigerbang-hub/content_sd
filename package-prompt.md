# Prompt untuk Membuat Package SCORM-like

Berikut prompt yang bisa langsung dipakai untuk agen AI agar membuat package SCORM-like dari project yang sudah ada:

> Buatkan package SCORM-like untuk project web ini.
>
> Tujuan:
> - membuat paket zip yang berisi semua file HTML, CSS, JS, dan manifest
> - struktur file harus bisa dibuka langsung di browser setelah unzip
> - pakai pendekatan SCORM-like, bukan SPA atau backend
>
> Instruksi:
> 1. Cek folder project saat ini dan identifikasi file utama seperti index.html, bab1.html, bab2.html, bab3.html, bab4.html, serta file CSS dan JS yang dipakai.
> 2. Buat folder baru bernama ipas-package di root project.
> 3. Copy semua file HTML, CSS, dan JS yang dibutuhkan ke folder ipas-package.
> 4. Buat file imsmanifest.xml di dalam folder ipas-package dengan struktur SCORM-like yang valid.
> 5. Pastikan manifest mencantumkan:
>    - halaman utama: index.html
>    - item bab 1 sampai bab 4
>    - semua file CSS dan JS yang dipakai
> 6. Pastikan semua referensi internal memakai path relatif dan tidak bergantung pada file eksternal.
> 7. Setelah folder paket selesai dibuat, kompres folder ipas-package menjadi file ipas-scorm-like.zip.
> 8. Tampilkan ringkasan struktur paket dan isi file zip.
> 9. Jelaskan cara uji package:
>    - unzip
>    - buka index.html
>    - cek navigasi bab 1–4
>    - cek localStorage progress masih berjalan
>
> Catatan:
> - Jangan ubah isi materi pembelajaran.
> - Jangan menambahkan framework atau backend.
> - Fokus pada packaging dan portability.
> - Jika ada file yang tidak dipakai, jangan ikut masuk.
> - Hasil akhir harus siap dipakai seperti paket SCORM-like.

## Versi singkat

> Buat package SCORM-like dari project ini. Susun folder ipas-package berisi semua HTML, CSS, JS, dan file imsmanifest.xml. Pastikan semua file bisa dibuka setelah unzip, gunakan path relatif, dan kompres folder tersebut menjadi ipas-scorm-like.zip. Jangan ubah konten materi, tetap gunakan arsitektur web statis, dan berikan ringkasan struktur paket serta cara uji hasilnya.
