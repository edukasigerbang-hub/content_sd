window.GRADE1_MATH_CONTENT = {
  title: 'Matematika Kelas 1 Semester 1',
  sourceNote: 'Struktur awal mengikuti cakupan umum buku Matematika Kelas 1 SD; detail sekolah dapat diselaraskan dengan buku ajar yang digunakan.',
  chapters: [
    { id: 'bab-1', number: 1, title: 'Mengenal Bilangan sampai 10', icon: '🔢', color: 'coral', goal: 'Mengenal, membaca, dan membilang bilangan 0 sampai 10.', subs: [
      { title: 'Bilangan 0 sampai 5', concept: 'Mencocokkan lambang bilangan dengan banyak benda.', activity: { type: 'count', prompt: 'Ada berapa apel?', items: '🍎', answer: 4, choices: [3, 4, 5] } },
      { title: 'Bilangan 6 sampai 10', concept: 'Membaca dan mengurutkan bilangan sampai 10.', activity: { type: 'choose', prompt: 'Pilih angka 7.', answer: 7, choices: [6, 7, 8] } }
    ] },
    { id: 'bab-2', number: 2, title: 'Penjumlahan sampai 10', icon: '➕', color: 'sun', goal: 'Menjumlahkan dua kelompok benda sampai hasil 10.', subs: [
      { title: 'Menambah dengan Benda', concept: 'Menggabungkan dua kelompok benda.', activity: { type: 'sum', prompt: '2 apel ditambah 3 apel. Berapa semuanya?', left: 2, right: 3, answer: 5, choices: [4, 5, 6] } },
      { title: 'Kalimat Penjumlahan', concept: 'Mengenal tanda tambah dan sama dengan.', activity: { type: 'sum', prompt: '4 + 2 = ...', left: 4, right: 2, answer: 6, choices: [5, 6, 7] } }
    ] },
    { id: 'bab-3', number: 3, title: 'Pengurangan sampai 10', icon: '➖', color: 'leaf', goal: 'Mengurangi benda dan menyelesaikan pengurangan sampai 10.', subs: [
      { title: 'Mengambil Sebagian', concept: 'Memahami pengurangan sebagai mengambil benda.', activity: { type: 'difference', prompt: 'Ada 7 bola. Diambil 2. Tersisa berapa?', left: 7, right: 2, answer: 5, choices: [4, 5, 6] } },
      { title: 'Kalimat Pengurangan', concept: 'Mengenal tanda kurang dan menyelesaikan kalimatnya.', activity: { type: 'difference', prompt: '9 - 3 = ...', left: 9, right: 3, answer: 6, choices: [5, 6, 7] } }
    ] },
    { id: 'bab-4', number: 4, title: 'Mengenal Bentuk', icon: '🔺', color: 'sky', goal: 'Mengenal bentuk datar dari benda di sekitar.', subs: [
      { title: 'Lingkaran dan Segitiga', concept: 'Membedakan bentuk lingkaran dan segitiga.', activity: { type: 'shape', prompt: 'Cari segitiga.', answer: 'Segitiga', choices: ['Lingkaran', 'Segitiga', 'Persegi'] } },
      { title: 'Persegi dan Persegi Panjang', concept: 'Mengenali ciri bentuk dari tampilannya.', activity: { type: 'shape', prompt: 'Cari persegi.', answer: 'Persegi', choices: ['Segitiga', 'Persegi Panjang', 'Persegi'] } }
    ] },
    { id: 'bab-5', number: 5, title: 'Bilangan sampai 20', icon: '🌟', color: 'violet', goal: 'Membaca, membilang, dan membandingkan bilangan sampai 20.', subs: [
      { title: 'Membilang sampai 20', concept: 'Menghubungkan banyak benda dengan bilangan sampai 20.', activity: { type: 'count', prompt: 'Ada berapa bintang?', items: '⭐', answer: 8, choices: [7, 8, 9] } },
      { title: 'Membandingkan Bilangan', concept: 'Menentukan bilangan yang lebih banyak atau lebih besar.', activity: { type: 'compare', prompt: 'Mana yang lebih banyak?', answer: '6', choices: ['4', '6', 'Sama banyak'] } }
    ] }
  ]
};
