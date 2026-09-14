window.MATH_LAB = {
  storageKey: 'grade4MathSemester1',
  title: 'Math Lab',
  labs: [
    { id: 'number', code: '01', icon: '01', name: 'Number System', color: 'amber', question: 'Bagaimana angka besar tersusun?', missions: [
      { id: 'place-value', title: 'Bongkar Bilangan', phase: 'OBSERVE', type: 'choice', visual: '4 | 582 | 300', prompt: 'Nilai angka 5 pada 4.582.300 adalah ...', choices: ['5 ribu', '500 ribu', '50 ribu'], answer: '500 ribu', explain: 'Angka 5 berada pada tempat ratusan ribu.' },
      { id: 'estimate', title: 'Uji Estimasi', phase: 'PREDICT → TEST', type: 'input', visual: '398 + 197', prompt: 'Gunakan strategi 398 + 200 - 3. Hasilnya ...', answer: '595', hint: '398 + 200 = 598, lalu kurangi 3.', explain: 'Strategi kompensasi menghasilkan 595.' }
    ]},
    { id: 'operations', code: '02', icon: '02', name: 'Operations Lab', color: 'blue', question: 'Bisakah kamu menemukan strategi tercepat?', missions: [
      { id: 'strategy', title: 'Pilih Strategi', phase: 'EXPLORE', type: 'choice', visual: '48 × 25', prompt: 'Strategi yang paling membantu adalah ...', choices: ['48 × 100 ÷ 4', '48 + 25', '48 - 25'], answer: '48 × 100 ÷ 4', explain: '25 adalah seperempat dari 100, jadi strateginya efisien.' },
      { id: 'error', title: 'Deteksi Kesalahan', phase: 'CHECK → CORRECT', type: 'error', visual: '245 + 178 = 313', prompt: 'Apakah perhitungan Andi benar?', choices: ['Benar', 'Salah'], answer: 'Salah', hint: 'Perkirakan: 245 + 178 mendekati 400.', explain: 'Salah. Hasil yang benar adalah 423.' }
    ]},
    { id: 'fraction', code: '03', icon: '03', name: 'Fraction Lab', color: 'coral', question: 'Apa hubungan bagian dan keseluruhan?', missions: [
      { id: 'equivalent', title: 'Temukan Pecahan Senilai', phase: 'DISCOVER', type: 'choice', visual: '▰▰□□ = ?', prompt: 'Pecahan yang senilai dengan 1/2 adalah ...', choices: ['2/4', '1/4', '3/4'], answer: '2/4', explain: 'Dua dari empat bagian sama dengan setengah.' },
      { id: 'number-line', title: 'Fraction Bar', phase: 'APPLY', type: 'sequence', visual: '0 ───── 1', prompt: 'Urutkan dari terkecil ke terbesar.', choices: ['1/4', '1/2', '3/4'], answer: ['1/4', '1/2', '3/4'], explain: 'Pada garis bilangan, semakin ke kanan nilainya semakin besar.' }
    ]},
    { id: 'geometry', code: '04', icon: '04', name: 'Geometry Lab', color: 'violet', question: 'Apakah bentuk berubah saat diputar?', missions: [
      { id: 'classify', title: 'Klasifikasi Bentuk', phase: 'OBSERVE → CLASSIFY', type: 'choice', visual: '◇  ▭  ○', prompt: 'Bangun dengan empat sisi adalah ...', choices: ['Lingkaran', 'Segiempat', 'Segitiga'], answer: 'Segiempat', explain: 'Segiempat memiliki empat sisi, meskipun orientasinya berbeda.' },
      { id: 'perimeter', title: 'Rancang Taman', phase: 'SOLVE', type: 'input', visual: '8 m × 5 m', prompt: 'Keliling taman persegi panjang ini adalah ... m.', answer: '26', hint: 'Jumlahkan 8 + 5 + 8 + 5.', explain: 'Keliling = 8 + 5 + 8 + 5 = 26 m.' }
    ]},
    { id: 'measurement', code: '05', icon: '05', name: 'Measurement Lab', color: 'green', question: 'Seberapa dekat perkiraanmu?', missions: [
      { id: 'unit', title: 'Pilih Satuan', phase: 'OBSERVE', type: 'choice', visual: 'MEJA KELAS', prompt: 'Satuan yang paling tepat untuk panjang meja adalah ...', choices: ['sentimeter', 'kilometer', 'gram'], answer: 'sentimeter', explain: 'Meja dapat diukur dengan sentimeter atau meter, bukan kilometer atau gram.' },
      { id: 'duration', title: 'Baca Durasi', phase: 'TEST', type: 'input', visual: '08.15 → 09.00', prompt: 'Durasi kegiatan adalah ... menit.', answer: '45', hint: 'Dari 08.15 ke 09.00.', explain: '15 menit menuju 08.30, lalu 30 menit menuju 09.00. Total 45 menit.' }
    ]},
    { id: 'data', code: '06', icon: '06', name: 'Data Lab', color: 'teal', question: 'Apa yang dapat kamu simpulkan dari data?', missions: [
      { id: 'chart', title: 'Baca Diagram', phase: 'OBSERVE → INFER', type: 'choice', visual: 'Apel ████  Pisang ██████', prompt: 'Kesimpulan yang tepat adalah ...', choices: ['Pisang dipilih lebih banyak', 'Apel dipilih lebih banyak', 'Keduanya sama'], answer: 'Pisang dipilih lebih banyak', explain: 'Batang pisang lebih panjang, berarti jumlahnya lebih banyak.' },
      { id: 'grand', title: 'Grand Math Mission', phase: 'CHALLENGE', type: 'input', visual: '12 m × 8 m · 3/4 area', prompt: 'Sebuah taman berukuran 12 m × 8 m. Luasnya ... m².', answer: '96', hint: 'Luas persegi panjang = panjang × lebar.', explain: '12 × 8 = 96 m². Ini langkah pertama merancang taman.' }
    ]}
  ]
};
