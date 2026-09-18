# Implementation Report - Bahasa Indonesia Kelas 1 Semester 1

## Completed

- P0-001 sampai P0-007: audit dan perbaikan state completion, started/completed, quiz, mini-game, validation, unlock, dan reward.
- P1-003: feedback benar/salah dengan retry dan `aria-live`.
- P1-006: audit awal CSS conflict dan state CSS baru tanpa rewrite massal.
- P1-004/P1-005: smoke test responsive pada 375, 430, 768, dan 834px tanpa horizontal overflow.
- P1-007: menu `Permainan`, `Prestasi`, dan `Pengaturan` yang belum memiliki fungsi mandiri dihapus dari navigasi.
- P2-002: ringkasan achievement menampilkan submateri selesai dan stars tervalidasi.
- P2-004: feedback memiliki animasi masuk ringan dengan fallback `prefers-reduced-motion`.
- P1-002: lesson membedakan tahap materi/contoh, bermain, evaluasi, dan completion.
- P1-001: evaluasi kini tersembunyi sampai mini-game benar; state tahap bertahan setelah refresh.
- P1-001: tahap Coba kini memiliki gate eksplisit sebelum mini-game dan ikut divalidasi saat completion.
- P0-004: challenge mini-game kini mengambil quiz yang sesuai submateri aktif, dengan fallback untuk tipe respons terbuka.
- P1-001: instruksi latihan pertama dari `sub.practice` kini tampil pada tahap Coba sebelum mini-game.
- P0-003: evaluasi respons terbuka pada quiz chapter terakhir kini memakai textarea, validasi input, dan menyimpan respons.
- P0-003: respons terbuka yang tersimpan dipulihkan saat reload, dinonaktifkan setelah terkirim, dan di-escape sebelum dirender kembali.
- Robustness: nilai stars non-numerik dinormalisasi ke 0 pada lesson engine sehingga tidak menampilkan `NaN`.
- Progression mode: card dan direct route Bab 2-4 dibuka untuk eksplorasi; submateri tetap terkunci berurutan dan completion tetap tervalidasi.
- P1-008: audio interface opsional tersedia melalui `audioSrc` tanpa membuat audio palsu.
- P2-001/P2-003: character feedback, `aria-current`, focus state, disabled state, dan live region ditambahkan.
- P2-005: journey cards mendapat reveal stagger ringan dengan fallback reduced-motion.

## Changed Files

- `kelas-1-semester-1/bahasa-indonesia/bab-script.js`
- `kelas-1-semester-1/bahasa-indonesia/bab1-ui.css`
- `kelas-1-semester-1/bahasa-indonesia/home.css`
- `kelas-1-semester-1/bahasa-indonesia/index-script.js`
- `kelas-1-semester-1/bahasa-indonesia/optimized-assets.css`
- `kelas-1-semester-1/bahasa-indonesia/bg-home.webp`, `bg-board.webp`, `bg-btn.webp`
- `kelas-1-semester-1/bahasa-indonesia/karakter1.webp`, `karakter2.webp`
- `TODO.md`
- `AUDIT_REPORT.md`

## Behavior Changes

Lesson dibuka dengan state `started`, bukan `completed`. Mini-game meminta jawaban dan quiz memakai data dari `content.js`. Completion ditolak sampai keduanya selesai. Star diberikan satu kali melalui reward key. Submateri dan bab terkunci benar-benar diblokir sampai prerequisite selesai.

## Learning Flow

Materi -> Coba -> mini-game -> evaluasi -> completion -> star -> unlock berikutnya.

## Testing

- `node --check` untuk `bab-script.js`, `index-script.js`, dan `content.js`: lulus.
- Editor diagnostics untuk engine lesson dan home: tidak ada error.
- Browser smoke test fresh storage: lulus.
- Browser interaction: jawaban salah memberi retry, jawaban benar memberi feedback, state tersimpan.
- Refresh: state dan star bertahan.
- Direct `bab2.html` sebelum Bab 1 selesai: kembali ke home.
- Regression Bab 1-4 dengan prerequisite disimulasikan: lulus.
- Mobile home dan lesson 375/430/768/834px: tidak overflow.
- Asset audit: enam PNG berukuran sekitar 1.3-2.0 MB per file.
- Keyboard QA: Tab masuk ke kontrol utama dan seluruh tombol lesson minimal 44px.
- Baseline home file load sekitar 346 ms pada browser file lokal; resource transfer tidak tersedia dari protocol `file:`.
- HTTP baseline: load sekitar 532 ms dan sekitar 9.3 MB gambar ditransfer; asset terbesar adalah `bg-home.png`, `karakter2.png`, `bg-btn.png`, `bg-board.png`, dan `karakter1.png`.
- Progressive WebP aktif dengan PNG fallback; varian asset menyusut menjadi sekitar 92-228 KB per file.

## Known Issues

- P1-001 masih dapat diperdalam menjadi stepper penuh Kenali/Contoh/Coba; saat ini evaluasi sudah menjadi task terpisah setelah game.
- Bab-level unlock sengaja dibuka sesuai permintaan terbaru; jika progression antar-bab wajib dikembalikan, guard `isUnlocked`/`chapterUnlocked` perlu diaktifkan kembali.
- P1-008 belum memiliki asset audio sehingga interface tidak tampil pada content saat ini.
- P2-005 selesai untuk reveal journey cards.
- P3-001/P3-004 selesai secara konservatif melalui progressive WebP enhancement dan HTTP smoke test.
- P3-002 selesai secara terbatas dengan mengonsolidasikan deklarasi `.bi-bab1-scene` duplikat; legacy cascade lain sengaja dipertahankan.
- P3-003 selesai secara terbatas dengan helper parser state yang tahan JSON korup serta fallback legacy completion.
- Accessibility polish: navigasi home mendapat focus-visible dan target minimum 44px; satu brace CSS yang hilang diperbaiki dan parser kembali bersih.

## Next Recommended Steps

Langkah berikutnya adalah konsolidasi CSS/JS setelah regression test yang lebih luas.
