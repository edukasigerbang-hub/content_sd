# TODO - Bahasa Indonesia Kelas 1 Semester 1

## P0 - Critical

- [x] P0-001 - Audit completion/progress
  - File: `kelas-1-semester-1/bahasa-indonesia/bab-script.js`, `index-script.js`, `content.js`
  - Masalah: State selesai hanya berupa flag `grade1IndoDone:*`; belum ada state started, activity, game, quiz, atau validasi.
  - Dampak: Membuka lesson dan menekan tombol generik dapat dianggap belajar selesai.
  - Solusi: Definisikan state per submateri dan audit migrasi key lama secara kompatibel.
  - Dependency: Tidak ada.
  - Acceptance Criteria: State started, activity, game, quiz, completed, dan reward dapat dibaca terpisah; refresh mempertahankan state.

- [x] P0-002 - Pisahkan started vs completed
  - File: `bab-script.js`, `index-script.js`
  - Masalah: Tombol `MULAI` sekaligus menjadi jalur menuju completion.
  - Dampak: Open lesson tidak dapat dibedakan dari completed lesson.
  - Solusi: Simpan `started` saat lesson dibuka; jangan menyimpan `completed` sebelum syarat terpenuhi.
  - Dependency: P0-001.
  - Acceptance Criteria: Membuka lesson tidak menambah progress atau bintang; started tidak tampil sebagai selesai.

- [x] P0-003 - Audit dan aktifkan quiz engine
  - File: `content.js`, `bab-script.js`
  - Masalah: Data `chapter.quiz` sudah tersedia, tetapi tidak dirender atau digunakan.
  - Dampak: Evaluasi pembelajaran tidak pernah terjadi.
  - Solusi: Buat renderer quiz reusable untuk `pilihan`, `benar-salah`, `susun`, dan respons terbuka dengan feedback.
  - Dependency: P0-001, P0-002.
  - Acceptance Criteria: Quiz tampil, jawaban benar/salah diberi feedback, retry tersedia, dan hasil tersimpan.

- [x] P0-004 - Audit dan implementasikan mini-game
  - File: `bab-script.js`, `content.js`, `bab1-ui.css`
  - Masalah: Mini-game saat ini hanya mengubah teks tombol menjadi `Hebat!`.
  - Dampak: Tidak ada challenge, pemeriksaan jawaban, salah, atau retry.
  - Solusi: Implementasikan game data-driven minimum dengan pilihan jawaban, validasi, feedback, dan completion.
  - Dependency: P0-001, P0-002.
  - Acceptance Criteria: User harus memilih jawaban; jawaban salah dapat dicoba lagi; game hanya complete setelah jawaban benar.

- [x] P0-005 - Implementasikan validasi completion
  - File: `bab-script.js`
  - Masalah: `finish` langsung menulis `grade1IndoDone` dan menambah bintang.
  - Dampak: Completion dapat dimanipulasi tanpa aktivitas.
  - Solusi: Completion hanya valid setelah materi dibuka, mini-game selesai, dan evaluasi memenuhi ambang.
  - Dependency: P0-003, P0-004.
  - Acceptance Criteria: Tombol completion disabled/ditolak sebelum syarat; completion valid hanya sekali dan bertahan setelah refresh.

- [x] P0-006 - Implementasikan unlock progression
  - File: `bab-script.js`, `index-script.js`, `bab1-ui.css`
  - Masalah: Kartu berikutnya hanya diberi class visual `is-locked`, tetapi tetap button aktif; bab berikutnya juga langsung dapat dibuka.
  - Dampak: Progression tidak nyata.
  - Solusi: Kunci submateri sampai submateri sebelumnya selesai dan kunci bab sampai prasyarat bab sebelumnya selesai.
  - Dependency: P0-005.
  - Acceptance Criteria: Locked item memiliki `disabled`, tidak dapat dinavigasi dengan click/keyboard; unlock otomatis setelah prerequisite selesai.

- [x] P0-007 - Validasi reward/star
  - File: `bab-script.js`, `index-script.js`
  - Masalah: Star bertambah saat tombol `finish`, tanpa ledger reward idempotent.
  - Dampak: Reward tidak terkait completion valid dan rawan duplikasi.
  - Solusi: Beri star berdasarkan event completion dengan reward key per submateri/quiz/game.
  - Dependency: P0-005.
  - Acceptance Criteria: Star hanya diberikan sekali untuk completion valid; refresh/reopen tidak menambah star.

## P1 - High

- [x] P1-001 - Audit learning flow Bab 1
  - File: `bab-script.js`, `content.js`
  - Masalah: Alur saat ini hanya materi, game palsu, latihan statis, dan navigasi.
  - Dampak: Anak tidak memiliki urutan belajar yang terukur.
  - Solusi: Susun Kenali -> Contoh -> Coba -> Bermain -> Evaluasi -> Reward.
  - Dependency: P0.
  - Acceptance Criteria: Satu task utama tampil pada satu waktu dan status langkah terlihat.

- [x] P1-002 - Perbaiki struktur lesson
  - File: `bab-script.js`, `bab1-ui.css`
  - Masalah: `MULAI` terlalu ambigu dan latihan belum interaktif.
  - Dampak: Anak tidak memahami kapan harus mencoba atau menyelesaikan.
  - Solusi: Pisahkan panel materi, aktivitas, game, evaluasi, dan hasil.
  - Dependency: P1-001.
  - Acceptance Criteria: Setiap tahap punya heading/instruksi singkat dan CTA yang jelas.

- [x] P1-003 - Perbaiki feedback benar/salah
  - File: `bab-script.js`, `bab1-ui.css`
  - Masalah: Tidak ada feedback jawaban karena quiz/game belum aktif.
  - Dampak: Anak tidak tahu alasan retry atau keberhasilan.
  - Solusi: Tambahkan `aria-live`, state visual plus teks, dan retry.
  - Dependency: P0-003, P0-004.
  - Acceptance Criteria: Feedback terlihat dan terbaca screen reader untuk benar maupun salah.

- [x] P1-004 - Audit mobile layout
  - File: `bab1-ui.css`, `home.css`, `lesson.css`
  - Masalah: Fixed topbar/footer, karakter, dan board berpotensi mengurangi viewport efektif.
  - Dampak: Konten/game dapat tertutup atau overflow di layar kecil.
  - Solusi: Uji 375px dan 430px; atur flow layout, touch target >=44px, dan spacing.
  - Dependency: P0/P1 structure.
  - Acceptance Criteria: Tidak ada horizontal overflow; semua kontrol utama dapat disentuh.

- [x] P1-005 - Audit tablet layout
  - File: `bab1-ui.css`, `home.css`
  - Masalah: Breakpoint hanya 980px/620px dan beberapa elemen masih memakai positioning besar.
  - Dampak: Layout tablet dapat terlalu padat atau karakter menutup board.
  - Solusi: Uji 768px/834px dan sesuaikan grid/character containment.
  - Dependency: P1-004.
  - Acceptance Criteria: Board, journey, game, dan feedback tetap terlihat di tablet.

- [x] P1-006 - Audit CSS conflict
  - File: `bab1-ui.css`, `lesson.css`, `style.css`
  - Masalah: `bab1-ui.css` memiliki deklarasi `.bi-bab1-scene` berulang dan beberapa stylesheet legacy ikut dimuat.
  - Dampak: Override sulit diprediksi dan maintenance berisiko.
  - Solusi: Petakan selector aktif, konsolidasikan hanya setelah perilaku teruji.
  - Dependency: P1-002.
  - Acceptance Criteria: Tidak ada override kritis yang tidak disengaja; visual Bab 1-4 tetap konsisten.

- [x] P1-007 - Audit navigation
  - File: `index-script.js`, `bab-script.js`
  - Masalah: Menu `Permainan`, `Prestasi`, dan `Pengaturan` belum memiliki destination/function lengkap; bab overview mengizinkan akses langsung.
  - Dampak: Dead-end dan bypass progression.
  - Solusi: Hubungkan fungsi yang ada atau sembunyikan/disable dengan jelas; validasi route.
  - Dependency: P0-006.
  - Acceptance Criteria: Tidak ada menu palsu/dead-end; back/next/locked route konsisten.

- [x] P1-008 - Audit audio architecture
  - File: `bab-script.js`, `content.js`
  - Masalah: Materi menyimak/berbicara tidak memiliki interface audio dan asset audio belum tersedia.
  - Dampak: Kebutuhan menyimak belum dapat diuji secara konsisten.
  - Solusi: Tambahkan metadata/interface audio opsional tanpa audio palsu.
  - Dependency: P1-001.
  - Acceptance Criteria: UI audio hanya muncul jika asset tersedia; tidak ada fake audio.

## P2 - Medium

- [x] P2-001 - Character feedback
  - File: `bab-script.js`, `bab1-ui.css`
  - Masalah: Karakter hanya dekorasi dan bubble statis.
  - Dampak: Companion belum mendukung feedback belajar.
  - Solusi: Pesan pendek untuk mulai, benar, salah, dan selesai.
  - Dependency: P1-003.
  - Acceptance Criteria: Feedback karakter mengikuti state aktivitas tanpa menutupi konten.

- [x] P2-002 - Achievement
  - File: `index-script.js`, `content.js`
  - Masalah: Section Prestasi hanya anchor ke area peta belajar; belum ada badge/rekap nyata.
  - Dampak: Navigasi achievement berpotensi misleading.
  - Solusi: Tampilkan bab/submateri selesai dan stars dari state tervalidasi.
  - Dependency: P0-007, P1-007.
  - Acceptance Criteria: Angka achievement sama dengan state progress dan tidak dibuat-buat.

- [x] P2-003 - Accessibility enhancement
  - File: `bab-script.js`, `index-script.js`, CSS
  - Masalah: Status locked/completed terutama disampaikan lewat warna/class; feedback live region belum ada.
  - Dampak: Pemahaman keyboard/screen reader rendah.
  - Solusi: Semantic state, `aria-current`, `aria-disabled`, focus state, `aria-live`.
  - Dependency: P0/P1.
  - Acceptance Criteria: Alur inti dapat diselesaikan dengan keyboard dan status tidak bergantung pada warna saja.

- [x] P2-004 - Microinteraction
  - File: `bab1-ui.css`, `bab-script.js`
  - Masalah: Interaksi belajar belum memiliki state transition yang bermakna.
  - Dampak: Feedback terasa datar.
  - Solusi: Tambahkan animasi ringan untuk feedback valid/invalid dan reward.
  - Dependency: P1-003.
  - Acceptance Criteria: Motion tidak mengganggu dan menghormati reduced motion.

- [x] P2-005 - Animation polish
  - File: `bab1-ui.css`, `home.css`
  - Masalah: Animation belum terkait learning event.
  - Dampak: Visual polish belum memperkuat progression.
  - Solusi: Stagger/reveal ringan pada state baru setelah layout stabil.
  - Dependency: P2-004.
  - Acceptance Criteria: Animasi stabil di desktop/mobile dan tidak menyebabkan layout shift kritis.

## P3 - Low

- [x] P3-001 - Asset optimization
  - File: asset gambar Bahasa Indonesia
  - Masalah: Asset PNG besar/duplikat berpotensi memperlambat first load.
  - Dampak: Loading awal lebih berat.
  - Solusi: Ukur ukuran dan penggunaan; optimalkan tanpa mengubah visual.
  - Dependency: P1 responsive QA.
  - Acceptance Criteria: Tidak ada asset aktif yang dioptimalkan dengan regresi visual.

- [x] P3-002 - CSS cleanup
  - File: stylesheet Bahasa Indonesia
  - Masalah: Selector legacy/eksperimental belum dipastikan penggunaannya.
  - Dampak: Maintenance sulit.
  - Solusi: Hapus/consolidate hanya setelah usage audit dan regression test.
  - Dependency: P1-006, P3-005.
  - Acceptance Criteria: CSS lebih kecil tanpa perubahan perilaku.

- [x] P3-003 - JS cleanup
  - File: `bab-script.js`, `index-script.js`
  - Masalah: Logic render dan storage masih inline serta banyak markup string.
  - Dampak: Perubahan berikutnya rawan regresi.
  - Solusi: Ekstrak helper kecil yang reusable tanpa refactor besar.
  - Dependency: P0/P1 selesai.
  - Acceptance Criteria: Tidak ada duplikasi state logic dan API existing tetap berjalan.

- [x] P3-004 - Performance optimization
  - File: script/style/asset Bahasa Indonesia
  - Masalah: Banyak CSS dimuat bersamaan dan render ulang full `innerHTML`.
  - Dampak: Interaksi berulang dapat lebih mahal dari perlu.
  - Solusi: Ukur dahulu, kurangi kerja yang terbukti mahal.
  - Dependency: P3-001, P3-003.
  - Acceptance Criteria: Tidak ada optimasi spekulatif yang mengurangi keterbacaan atau aksesibilitas.

- [x] P3-005 - Final QA
  - File: seluruh `kelas-1-semester-1/bahasa-indonesia/`
  - Masalah: Belum ada bukti test fresh session, existing progress, locked state, quiz/game, refresh, dan responsive.
  - Dampak: Risiko regresi tidak terukur.
  - Solusi: Jalankan checklist functional, interaction, responsive, accessibility, dan regression.
  - Dependency: Semua task sebelumnya.
  - Acceptance Criteria: Semua scenario Definition of Done tervalidasi; known issues dicatat.
