window.MATH_CONTENT = {
  title: 'Matematika Kelas 1 Semester 2', storageKey: 'grade1MathSemester2',
  tagline: 'Melanjutkan langkah dari bilangan 20 menuju operasi, bentuk, ukuran, dan data sederhana.',
  sourceNote: 'Pemetaan semester berbasis urutan pembelajaran dari CP/TP Kurikulum Merdeka Fase A; pembagian semester bukan pembagian resmi CP pemerintah.',
  chapters: [
    { id: 'bab-1', number: 1, world: 'DUNIA BILANGAN', title: 'Bilangan sampai 20', icon: '🔢', color: 'coral', goal: 'Membaca, mengurutkan, dan membandingkan bilangan sampai 20.', subs: [
      { title: 'Urutkan Bilangan', concept: 'Menempatkan bilangan sampai 20 dari kecil ke besar.', activity: { type: 'pattern', mode: 'sequence', visual: '8  →  9  →  10', prompt: 'Susun bilangan dari kecil ke besar.', answer: [8, 9, 10, 11], choices: [8, 9, 10, 11], instruction: 'Pilih bilangan satu per satu dari yang paling kecil.', hint: 'Mulai dari bilangan yang paling kecil.' } },
      { title: 'Lebih Banyak atau Sedikit', concept: 'Membandingkan dua bilangan dengan tanda yang tepat.', activity: { type: 'compare', visual: '14  •  17', prompt: 'Bilangan yang lebih besar adalah ...', answer: 17, choices: [14, 17, 'Sama'] } },
      { title: 'Puluhan dan Satuan', concept: 'Mengenali satu puluhan dan satuan pada bilangan.', activity: { type: 'count', mode: 'input', items: '●', display: 10, visual: '10 + 3', prompt: '10 + 3 = ...', answer: 13, choices: [12, 13, 14], instruction: 'Tulis hasil penjumlahan sepuluh dan tiga.', hint: 'Satu puluhan ditambah tiga satuan.' } }
    ] },
    { id: 'bab-2', number: 2, world: 'DUNIA TAMBAH', title: 'Penjumlahan sampai 20', icon: '➕', color: 'sun', goal: 'Menjumlahkan bilangan sampai 20 dengan benda dan strategi.', subs: [
      { title: 'Membuat 10', concept: 'Memecah bilangan untuk menemukan pasangan yang berjumlah 10.', activity: { type: 'sum', mode: 'tap-count', left: 7, right: 3, item: '🍎', countTarget: 10, prompt: 'Tap semua apel, lalu hitung jumlahnya.', answer: 10, choices: [9, 10, 11], instruction: 'Ayo tap setiap apel satu kali.', hint: 'Hitung apel yang sudah kamu tap.' } },
      { title: 'Tambah Dua Langkah', concept: 'Menggunakan hitung maju untuk menjumlahkan.', activity: { type: 'sum', mode: 'input', left: 8, right: 5, prompt: '8 + 5 = ...', answer: 13, choices: [12, 13, 14], instruction: 'Tulis hasil delapan ditambah lima.', hint: 'Mulai dari delapan, lalu hitung maju lima langkah.' } },
      { title: 'Cerita Penjumlahan', concept: 'Memilih jawaban dari masalah sehari-hari.', activity: { type: 'sum', left: 6, right: 4, prompt: 'Kiko punya 6 kelereng, lalu mendapat 4. Berapa sekarang?', answer: 10, choices: [8, 10, 12] } }
    ] },
    { id: 'bab-3', number: 3, world: 'DUNIA KURANG', title: 'Pengurangan sampai 20', icon: '➖', color: 'leaf', goal: 'Mengurangi bilangan sampai 20 dengan strategi yang masuk akal.', subs: [
      { title: 'Mundur pada Garis Bilangan', concept: 'Mengurangi berarti bergerak mundur.', activity: { type: 'difference', mode: 'tap-count', left: 15, right: 4, item: '⚽', countTarget: 11, prompt: 'Tap semua bola yang tersisa setelah 4 diambil.', answer: 11, choices: [10, 11, 12], instruction: 'Tap bola yang masih tersisa, lalu hitung.', hint: 'Bola yang tersisa adalah lima belas dikurangi empat.' } },
      { title: 'Cari yang Hilang', concept: 'Menentukan bilangan yang belum diketahui.', activity: { type: 'difference', mode: 'input', left: 12, right: 5, prompt: '12 - ... = 7', answer: 5, choices: [4, 5, 6], instruction: 'Tulis bilangan yang hilang.', hint: 'Bilangan yang dikurangi dari dua belas harus menyisakan tujuh.' } },
      { title: 'Cerita Pengurangan', concept: 'Menyelesaikan masalah mengambil atau tersisa.', activity: { type: 'difference', left: 18, right: 6, prompt: 'Ada 18 buku. Dipinjam 6. Tersisa ...', answer: 12, choices: [11, 12, 13] } }
    ] },
    { id: 'bab-4', number: 4, world: 'DUNIA UKURAN', title: 'Panjang dan Waktu', icon: '📏', color: 'sky', goal: 'Membandingkan panjang dan mengenali urutan waktu sehari-hari.', subs: [
      { title: 'Lebih Panjang', concept: 'Membandingkan panjang benda dengan satuan tidak baku.', activity: { type: 'compare', visual: 'pensil ▬▬▬   ▬▬▬▬▬', prompt: 'Pensil mana yang lebih panjang?', answer: 'Kanan', choices: ['Kiri', 'Kanan', 'Sama'] } },
      { title: 'Urutan Kegiatan', concept: 'Mengurutkan kejadian sebelum dan sesudah.', activity: { type: 'pattern', mode: 'sequence', visual: 'bangun → sarapan → sekolah', prompt: 'Susun kegiatan pagi dengan urutan yang benar.', answer: ['Bangun', 'Sarapan', 'Sekolah'], choices: ['Bangun', 'Sarapan', 'Sekolah'], instruction: 'Pilih kegiatan dari yang terjadi lebih dulu.', hint: 'Kegiatan pertama pada pagi hari adalah bangun.' } },
      { title: 'Berat Benda', concept: 'Membandingkan berat secara langsung.', activity: { type: 'compare', visual: 'buku  ⚖  kapas', prompt: 'Yang biasanya lebih berat adalah ...', answer: 'Buku', choices: ['Buku', 'Kapas', 'Sama'] } }
    ] },
    { id: 'bab-5', number: 5, world: 'DUNIA BENTUK', title: 'Bentuk, Posisi, dan Data', icon: '🔺', color: 'violet', goal: 'Mengenali bangun, posisi, dan menyajikan data sederhana.', subs: [
      { title: 'Bangun Ruang', concept: 'Mengenali benda yang dapat menggelinding atau ditumpuk.', activity: { type: 'shape', visual: '○  □  △', prompt: 'Benda yang dapat menggelinding berbentuk ...', answer: 'Bola', choices: ['Bola', 'Kotak', 'Segitiga'] } },
      { title: 'Posisi Benda', concept: 'Menggunakan kata di atas, di bawah, dan di samping.', activity: { type: 'pattern', visual: '⭐\n🍎', prompt: 'Bintang berada ... apel.', answer: 'Di atas', choices: ['Di bawah', 'Di atas', 'Di dalam'] } },
      { title: 'Membaca Data', concept: 'Membandingkan banyak gambar pada piktogram.', activity: { type: 'compare', visual: '🍎🍎🍎  🍌🍌', prompt: 'Buah yang lebih banyak adalah ...', answer: 'Apel', choices: ['Apel', 'Pisang', 'Sama'] } }
    ] }
  ]
};
