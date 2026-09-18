# Audit Report - Bahasa Indonesia Kelas 1 Semester 1

## Executive Summary

Fondasi visual project sudah konsisten: board, karakter, kartu perjalanan, pastel color, dan content terpusat di `kelas-1-semester-1/bahasa-indonesia/content.js`. Sebelum perubahan, completion ditulis langsung dari tombol, quiz tidak dirender, dan mini-game hanya mengganti label tombol. Progression juga hanya visual.

Scope audit dan implementasi dibatasi pada `kelas-1-semester-1/bahasa-indonesia/`. IPAS, Matematika, global design system, dan subject lain tidak disentuh.

## Findings

### Structure and content

- `index.html`/`index-script.js` menangani home, stars, progress, dan navigasi.
- `bab1.html` sampai `bab4.html` menggunakan `bab-script.js` yang sama melalui `data-chapter`.
- `content.js` memiliki 4 chapter, 4 submateri per chapter, activity, game description, practice, dan quiz.
- Model data cukup untuk engine data-driven; duplikasi quiz tidak diperlukan.

### Completion and progression

- Sebelumnya hanya ada `grade1IndoDone:*` dan `grade1IndoStars`.
- Tidak ada state started, game, quiz, completed, atau reward ledger.
- Card locked hanya class CSS dan semua route bab dapat dibuka langsung.
- Setelah P0: state per submateri disimpan di `grade1IndoState:*`, completion memiliki syarat, reward idempotent, submateri memakai `disabled`, dan direct URL bab yang belum terbuka kembali ke home.

### Quiz and game

- Sebelumnya `chapter.quiz` tidak dipakai sama sekali.
- Setelah P0: quiz objective dirender dengan feedback benar/salah dan retry; respons terbuka memakai konfirmasi mencoba. Mini-game meminta pilihan user, memeriksa jawaban, memberi feedback, dan menonaktifkan pilihan setelah benar.
- Respons terbuka belum dinilai otomatis, sesuai batasan browser tanpa audio/AI assessment.

### UX, responsive, accessibility

- Struktur visual existing dipertahankan.
- Risiko yang masih perlu diuji: topbar/footer fixed, positioning karakter, overflow pada 375/430/768/834px, dan touch target legacy.
- Feedback memiliki `role=status`/`aria-live`; kontrol baru memiliki focus-visible; status locked memakai disabled dan teks, bukan warna saja.
- Audio belum tersedia; tidak dibuat audio palsu.

### Code quality, CSS, performance

- `bab-script.js` adalah shared ownership boundary sehingga perubahan berdampak ke Bab 1-4.
- `bab1-ui.css` memiliki deklarasi `.bi-bab1-scene` berulang dan stylesheet legacy/experimental masih dimuat.
- Full `innerHTML` render dipertahankan untuk scope kecil ini; optimasi performa perlu pengukuran.
- Asset PNG belum dioptimalkan karena belum ada pengukuran baseline.

## Recommended Order

1. P0 state, quiz, mini-game, completion, unlock, reward.
2. P1 learning flow, navigation, responsive, CSS consolidation, audio interface.
3. P2 character feedback, achievement, accessibility expansion, motion.
4. P3 asset/CSS/JS cleanup, measurement-based performance, final QA.

## Acceptance Criteria

- Open lesson tidak menambah progress/star.
- Game dan quiz memerlukan input; salah dapat retry; benar memberi feedback.
- Completion hanya terjadi setelah game dan evaluasi selesai.
- Reward hanya diberikan sekali dan bertahan setelah refresh.
- Locked submateri/bab tidak bisa dibuka melalui click, keyboard, atau direct URL normal.
- Tidak ada perubahan pada subject lain.
