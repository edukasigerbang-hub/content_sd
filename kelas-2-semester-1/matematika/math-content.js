window.MATH_CONTENT = {
  title: 'Matematika Kelas 2 Semester 1', storageKey: 'grade2MathSemester1',
  tagline: 'Membangun strategi dengan nilai tempat, operasi hitung, pengukuran, dan bentuk.',
  sourceNote: 'Pemetaan semester berbasis urutan pembelajaran dari CP/TP Kurikulum Merdeka Fase A; pembagian semester bukan pembagian resmi CP pemerintah.',
  chapters: [
    { id: 'bab-1', number: 1, world: 'DUNIA NILAI TEMPAT', title: 'Bilangan sampai 100', icon: '🔢', color: 'coral', goal: 'Membaca, menulis, mengurai, dan membandingkan bilangan sampai 100.', subs: [
      { title: 'Puluhan dan Satuan', concept: 'Mengurai bilangan menjadi puluhan dan satuan.', activity: { type: 'count', items: '●', display: 10, visual: '40 + 6', prompt: '46 terdiri dari ... puluhan dan ... satuan.', answer: '4 dan 6', choices: ['4 dan 6', '6 dan 4', '4 dan 4'] } },
      { title: 'Urutkan Bilangan', concept: 'Mengurutkan bilangan sampai 100.', activity: { type: 'pattern', visual: '32  •  23  •  42', prompt: 'Bilangan terkecil adalah ...', answer: 23, choices: [23, 32, 42] } },
      { title: 'Dekat dengan 50', concept: 'Membandingkan bilangan menggunakan nilai tempat.', activity: { type: 'compare', visual: '58  •  85', prompt: 'Bilangan yang lebih besar adalah ...', answer: 85, choices: [58, 85, 'Sama'] } }
    ] },
    { id: 'bab-2', number: 2, world: 'DUNIA TAMBAH', title: 'Penjumlahan dan Pengurangan', icon: '➕', color: 'sun', goal: 'Memilih strategi penjumlahan dan pengurangan sampai 100.', subs: [
      { title: 'Tambah Bersusun', concept: 'Menjumlahkan puluhan dan satuan dengan rapi.', activity: { type: 'sum', left: 34, right: 25, prompt: '34 + 25 = ...', answer: 59, choices: [49, 59, 69] } },
      { title: 'Kurang Bersusun', concept: 'Mengurangkan dua bilangan sampai 100.', activity: { type: 'difference', left: 67, right: 24, prompt: '67 - 24 = ...', answer: 43, choices: [33, 43, 53] } },
      { title: 'Pilih Strategi', concept: 'Menggunakan puluhan terdekat untuk berhitung.', activity: { type: 'sum', left: 48, right: 12, prompt: '48 + 12 = ...', answer: 60, choices: [50, 60, 70] } }
    ] },
    { id: 'bab-3', number: 3, world: 'DUNIA KALI BAGI', title: 'Kelompok dan Berbagi', icon: '✖️', color: 'leaf', goal: 'Memahami perkalian dan pembagian sebagai kelompok sama banyak.', subs: [
      { title: 'Kelompok Sama Banyak', concept: 'Menentukan banyak benda dalam beberapa kelompok.', activity: { type: 'sum', left: 3, right: 3, visual: '3 + 3 + 3', prompt: 'Ada 3 kelompok, masing-masing 3. Jumlahnya ...', answer: 9, choices: [6, 9, 12] } },
      { title: 'Berbagi Rata', concept: 'Membagi benda ke kelompok dengan adil.', activity: { type: 'difference', left: 12, right: 4, visual: '12 ÷ 4', prompt: '12 benda dibagi kepada 4 anak. Masing-masing mendapat ...', answer: 3, choices: [2, 3, 4] } },
      { title: 'Lompatan Bilangan', concept: 'Menghubungkan penjumlahan berulang dengan perkalian.', activity: { type: 'pattern', visual: '2 → 4 → 6 → 8', prompt: 'Lompatan berikutnya adalah ...', answer: 10, choices: [9, 10, 12] } }
    ] },
    { id: 'bab-4', number: 4, world: 'DUNIA UKURAN', title: 'Panjang, Berat, dan Waktu', icon: '📏', color: 'sky', goal: 'Mengukur dan membandingkan panjang, berat, serta durasi sederhana.', subs: [
      { title: 'Satuan Baku', concept: 'Memilih sentimeter atau meter untuk panjang benda.', activity: { type: 'compare', visual: 'pensil  •  meja', prompt: 'Satuan yang tepat untuk mengukur pensil adalah ...', answer: 'Sentimeter', choices: ['Sentimeter', 'Meter', 'Kilometer'] } },
      { title: 'Membaca Jam', concept: 'Mengenali waktu tepat pada jam analog.', activity: { type: 'pattern', visual: '🕒', prompt: 'Jam menunjukkan pukul ...', answer: 3, choices: [2, 3, 4] } },
      { title: 'Lebih Berat', concept: 'Membandingkan massa benda dalam konteks sehari-hari.', activity: { type: 'compare', visual: 'tas buku  •  kertas', prompt: 'Yang lebih berat biasanya ...', answer: 'Tas buku', choices: ['Tas buku', 'Kertas', 'Sama'] } }
    ] },
    { id: 'bab-5', number: 5, world: 'DUNIA BENTUK', title: 'Bangun Datar dan Pola', icon: '🔺', color: 'violet', goal: 'Mengidentifikasi ciri bangun datar dan melanjutkan pola.', subs: [
      { title: 'Sisi dan Sudut', concept: 'Mengenali ciri persegi, segitiga, dan persegi panjang.', activity: { type: 'shape', visual: '□  △  ▭', prompt: 'Bangun yang memiliki 3 sisi adalah ...', answer: 'Segitiga', choices: ['Persegi', 'Segitiga', 'Persegi panjang'] } },
      { title: 'Pola Berulang', concept: 'Menemukan aturan pada pola bentuk.', activity: { type: 'pattern', visual: '○ △ ○ △ ...', prompt: 'Bentuk berikutnya adalah ...', answer: 'Lingkaran', choices: ['Lingkaran', 'Segitiga', 'Persegi'] } },
      { title: 'Bangun di Sekitar', concept: 'Menghubungkan bentuk dengan benda nyata.', activity: { type: 'shape', visual: '⚽  📦  🍕', prompt: 'Benda yang bentuknya seperti bola adalah ...', answer: 'Bola', choices: ['Bola', 'Kotak', 'Pizza'] } }
    ] }
  ]
};
