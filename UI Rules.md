# IPAS KELAS 1 SD — SEMESTER 1
# UI/UX RULES

**Status:** Mandatory  
**Scope:** Semua halaman IPAS Kelas 1 Semester 1  
**Primary Layout:** Landscape / One-Screen Application  
**Target:** Anak SD Kelas 1, usia ±6–7 tahun

---

## 1. CORE PRINCIPLE

UI harus terasa seperti:

> **Interactive Learning App**

Bukan:

> **Educational Article / Long Website**

Prinsip utama:

```text
SIMPLE
VISUAL
INTERACTIVE
CHILD FRIENDLY
ONE SCREEN
LANDSCAPE FIRST
```

---

# 2. HARD RULE — NO SCROLL

## WAJIB

Semua halaman harus memenuhi:

```css
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
}
```

Fallback:

```css
#app {
  min-height: 100vh;
  height: 100dvh;
}
```

## DILARANG

```css
overflow-y: auto;
overflow-y: scroll;
overflow-x: auto;
overflow-x: scroll;
```

Tidak boleh ada vertical scrollbar.

Tidak boleh ada horizontal scrollbar.

---

# 3. ONE SCREEN RULE

Setiap halaman harus dapat terlihat dalam **satu viewport**.

User tidak boleh melakukan:

```text
Scroll ↓
Scroll ↓
Scroll ↓
```

untuk menyelesaikan satu aktivitas.

Gunakan:

```text
Screen → Interaction → Next Screen
```

bukan:

```text
Long Page → Scroll → Scroll → Scroll
```

---

# 4. LANDSCAPE FIRST

Layout utama dibuat untuk landscape.

Target utama:

| Device | Resolution |
|---|---:|
| Desktop | 1366 × 768 |
| Desktop | 1440 × 900 |
| Tablet Landscape | 1024 × 768 |
| Mobile Landscape | 844 × 390 |

Prioritas:

```text
Desktop Landscape
↓
Tablet Landscape
↓
Mobile Landscape
```

---

# 5. VIEWPORT

Gunakan:

```css
width: 100vw;
height: 100dvh;
```

Jangan menggunakan fixed page height seperti:

```css
height: 900px;
height: 1200px;
min-height: 1200px;
```

Layout harus mengikuti viewport.

---

# 6. APP SHELL

Setiap halaman menggunakan struktur:

```html
<div id="app">

  <header class="app-header">
  </header>

  <main class="screen-container">

    <section class="screen active">
    </section>

  </main>

  <nav class="app-navigation">
  </nav>

</div>
```

---

# 7. SCREEN STRUCTURE

Gunakan pembagian:

```text
HEADER
10–12%

CONTENT
70–78%

NAVIGATION
10–12%
```

Total:

```text
100%
```

Contoh:

```css
#app {
  display: grid;
  grid-template-rows: 10% 78% 12%;
  height: 100dvh;
}
```

---

# 8. HEADER

Header harus selalu terlihat.

Isi maksimal:

```text
← Beranda

BAB 1
Tubuhku Hebat

⭐ 3
```

Header tidak boleh terlalu tinggi.

Target:

```text
10–12vh
```

---

# 9. CONTENT AREA

Content area harus:

```css
.screen-container {
  position: relative;
  overflow: hidden;
}
```

Setiap screen:

```css
.screen {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
```

---

# 10. SCREEN-BASED CONTENT

Materi panjang harus dibagi menjadi beberapa screen.

Contoh:

```text
Screen 1
Pembukaan

Screen 2
Kenali Tubuh

Screen 3
Pancaindra

Screen 4
Ayo Bermain

Screen 5
Kuis

Screen 6
Selesai
```

Tidak boleh membuat satu halaman berisi semua materi.

---

# 11. ONE SCREEN = ONE MAIN ACTIVITY

Setiap screen hanya memiliki **satu fokus utama**.

Contoh:

```text
SCREEN
│
├── Judul
├── Visual
├── Penjelasan singkat
└── Satu aktivitas
```

Jangan memasukkan:

```text
Materi
+
Game
+
Kuis
+
Refleksi
+
Materi tambahan
```

dalam satu screen.

---

# 12. CONTENT FIT RULE

Semua elemen harus masuk viewport.

Jika konten tidak muat:

### Urutan solusi:

1. Kurangi teks.
2. Kurangi spacing.
3. Sesuaikan ukuran visual.
4. Pecah menjadi screen baru.

### DILARANG:

Menambahkan scroll.

---

# 13. VISUAL-FIRST

Target:

```text
70% VISUAL
30% TEXT
```

Gunakan:

- ilustrasi,
- ikon,
- karakter,
- diagram sederhana,
- kartu visual.

Hindari screen penuh teks.

---

# 14. TEXT LIMIT

Setiap screen:

### Title

Maksimal 1–2 baris.

### Description

Maksimal 2–3 baris.

### Paragraph

Maksimal ±40–50 kata.

Jika lebih panjang:

> Pecah menjadi screen berikutnya.

---

# 15. TYPOGRAPHY

## Desktop

```text
Title:       36–52px
Subtitle:    22–28px
Body:        18–22px
Button:      18–22px
Caption:     16–18px
```

## Mobile Landscape

```text
Title:       28–36px
Subtitle:    20–24px
Body:        16–18px
Button:      16–20px
```

Jangan menggunakan body text di bawah:

```text
16px
```

---

# 16. FONT

Gunakan font yang:

- rounded,
- friendly,
- mudah dibaca,
- memiliki bentuk huruf jelas.

Contoh:

```text
Nunito
Quicksand
Poppins
Trebuchet MS
```

Prioritaskan readability.

---

# 17. COLOR

Gunakan palet cerah tetapi lembut.

Karakter:

```text
Sky Blue
Soft Yellow
Pastel Green
Soft Pink
Warm Orange
White
Dark Blue Text
```

Hindari terlalu banyak warna dalam satu screen.

Gunakan maksimal:

```text
1 primary
2 secondary
1 accent
```

---

# 18. CARD

Card harus:

- rounded,
- sederhana,
- memiliki whitespace,
- tidak terlalu banyak border,
- memiliki visual yang jelas.

Contoh:

```css
.card {
  border-radius: 20px;
  padding: 20px;
}
```

Jangan membuat card terlalu kecil.

---

# 19. BUTTON

Minimum:

```css
min-height: 48px;
min-width: 120px;
```

Button harus:

- mudah terlihat,
- mudah disentuh,
- memiliki label jelas.

Contoh:

```text
Mulai →
Berikutnya →
Coba Lagi
Pilih
Selesai
```

---

# 20. TOUCH TARGET

Semua interactive element harus memiliki target minimal sekitar:

```text
44 × 44 px
```

Ideal:

```text
48 × 48 px
```

Ini berlaku untuk:

- button,
- icon button,
- pilihan jawaban,
- card interaktif,
- kontrol game.

---

# 21. NAVIGATION

Navigation harus selalu mudah ditemukan.

Gunakan:

```text
← Sebelumnya

● ● ● ○ ○

Berikutnya →
```

atau:

```text
1 / 5
```

---

# 22. BOTTOM NAVIGATION

Navigation ditempatkan di bagian bawah viewport.

Contoh:

```text
┌─────────────────────────────────────────┐
│                                         │
│             CONTENT                     │
│                                         │
├─────────────────────────────────────────┤
│ ← Sebelumnya     ● ● ○ ○     Berikutnya → │
└─────────────────────────────────────────┘
```

Tidak boleh ikut terdorong ke bawah oleh konten.

---

# 23. NO WEBSITE FOOTER

Jangan membuat footer panjang.

Aplikasi ini bukan website artikel.

Gunakan area bawah untuk:

```text
Navigation
Progress
Action
```

---

# 24. MODAL

Informasi tambahan harus menggunakan modal.

Modal:

```text
max-width: 80vw;
max-height: 75vh;
```

Modal tidak boleh menyebabkan page scroll.

Jika isi modal terlalu banyak:

> Pecah menjadi beberapa langkah.

---

# 25. GAME UI

Game harus fit dalam satu screen.

Struktur:

```text
GAME
│
├── Question
├── Visual
├── Choices
├── Feedback
└── Progress
```

Contoh:

```text
Apa yang digunakan untuk melihat?

       👀
       👂
       👃

⭐ 2 / 5
```

---

# 26. QUIZ UI

Jangan menampilkan terlalu banyak soal sekaligus.

Default:

```text
1 soal / screen
```

Format:

```text
Pertanyaan 2 / 5

Apa yang digunakan untuk melihat?

[ 👀 ]
[ 👂 ]
[ 👃 ]

[ Berikutnya → ]
```

---

# 27. FEEDBACK

Jawaban benar:

```text
🎉 Hebat!
⭐ +1 Bintang
```

Jawaban salah:

```text
😊 Belum tepat.
Yuk coba lagi!
```

Feedback harus:

- jelas,
- cepat,
- positif,
- visual.

---

# 28. REWARD

Gunakan reward sederhana:

```text
⭐ Bintang
🏆 Badge
🎉 Celebration
```

Contoh:

```text
🎉 Hebat!

BAB 1 SELESAI

⭐⭐⭐⭐⭐

5 Bintang
```

---

# 29. ANIMATION

Gunakan animasi ringan:

```text
fade
slide
scale
bounce
```

Durasi:

```text
200–350ms
```

Jangan menggunakan animasi berat.

Jangan membuat animasi mengganggu pembelajaran.

---

# 30. SCREEN TRANSITION

Pergantian screen menggunakan transition.

Contoh:

```css
.screen {
  transition:
    transform 300ms ease,
    opacity 300ms ease;
}
```

Jangan melakukan reload halaman jika tidak diperlukan.

---

# 31. MOBILE LANDSCAPE

Mobile landscape harus tetap:

```text
NO SCROLL
NO OVERFLOW
ALL CONTENT VISIBLE
```

Target:

```text
844 × 390
```

Pastikan:

- button tidak terpotong,
- modal tidak keluar layar,
- teks tidak overflow,
- game dapat dimainkan,
- navigation terlihat.

---

# 32. PORTRAIT

Portrait bukan mode utama.

Jika layar terlalu sempit secara vertikal:

Tampilkan overlay:

```text
📱

Putar perangkatmu

Gunakan posisi mendatar
untuk pengalaman belajar terbaik.

↻
```

Jangan mengubah halaman menjadi long-scroll.

---

# 33. ACCESSIBILITY

Wajib:

- semantic HTML,
- alt text,
- keyboard navigation,
- visible focus,
- readable contrast,
- aria-label untuk icon-only button.

Jangan menggunakan warna sebagai satu-satunya indikator benar/salah.

Contoh:

Benar:

```text
✓ Benar!
```

Bukan hanya:

```text
GREEN
```

---

# 34. RESPONSIVE RULE

Gunakan responsive layout.

Contoh:

```css
@media (max-width: 900px) {
  ...
}

@media (orientation: landscape) {
  ...
}
```

Jangan membuat layout berdasarkan satu resolusi saja.

---

# 35. NO OVERFLOW

Sebelum dianggap selesai, cek:

```javascript
const verticalOverflow =
  document.documentElement.scrollHeight >
  document.documentElement.clientHeight;

const horizontalOverflow =
  document.documentElement.scrollWidth >
  document.documentElement.clientWidth;

console.assert(!verticalOverflow);
console.assert(!horizontalOverflow);
```

Hasil yang diharapkan:

```text
verticalOverflow = false
horizontalOverflow = false
```

Jika salah satu:

```text
TRUE
```

maka UI dianggap **FAILED**.

---

# 36. PERFORMANCE

Hindari:

- library besar tanpa alasan,
- animasi berat,
- gambar berukuran sangat besar,
- request berulang,
- asset yang tidak digunakan.

Target:

> aplikasi cepat dibuka dan cepat merespons.

---

# 37. CONTENT ARCHITECTURE

UI harus terpisah dari content.

Gunakan struktur:

```text
/data
  semester1.js

/components
  Header
  Button
  Card
  Quiz
  Game
  Progress
  Reward

/screens
  Intro
  Lesson
  Activity
  Quiz
  Reward
```

Jika project vanilla:

```text
/data
/assets
/css
/js
```

---

# 38. REUSABLE COMPONENT

Jangan membuat UI berbeda untuk setiap BAB.

Gunakan komponen yang sama:

```text
Header
ProgressBar
LessonCard
ActivityCard
QuizCard
GameCard
RewardCard
Navigation
Modal
Toast
```

BAB hanya mengganti:

```text
Content
Illustration
Question
Activity
Game
```

---

# 39. FOUR CHAPTERS

Semester 1 menggunakan 4 BAB:

```text
BAB 1
Tubuhku Hebat

BAB 2
Aku dan Lingkunganku

BAB 3
Tumbuhan di Sekitarku

BAB 4
Hewan di Sekitarku
```

Semua BAB harus menggunakan design system yang sama.

---

# 40. HOME SCREEN

Home harus terlihat dalam satu viewport.

Struktur:

```text
HEADER
↓
WELCOME
↓
4 CHAPTER CARDS
↓
QUICK ACTION
```

Desktop:

```text
┌────────┬────────┬────────┬────────┐
│ BAB 1  │ BAB 2  │ BAB 3  │ BAB 4  │
└────────┴────────┴────────┴────────┘
```

Jangan membuat:

```text
BAB 1
BAB 2
BAB 3
BAB 4
```

secara vertikal pada desktop.

---

# 41. HOME SCREEN MOBILE LANDSCAPE

Tetap satu viewport.

Gunakan:

```text
2 × 2 grid
```

jika diperlukan:

```text
┌──────────┬──────────┐
│  BAB 1   │  BAB 2   │
├──────────┼──────────┤
│  BAB 3   │  BAB 4   │
└──────────┴──────────┘
```

---

# 42. CONTENT DENSITY

Jika screen terlihat penuh:

**Kurangi konten.**

Jangan:

```text
mengecilkan semua elemen sampai sulit dibaca.
```

Prioritas:

```text
Readable
↓
Simple
↓
Visual
↓
Compact
```

---

# 43. INFORMATION HIERARCHY

Setiap screen harus memiliki:

```text
1 Primary Title
1 Primary Visual
1 Main Action
```

Jangan memiliki 5 CTA yang sama-sama dominan.

---

# 44. ICON RULE

Gunakan icon yang mudah dipahami anak.

Contoh:

```text
🏠 Home
📖 Materi
🎮 Bermain
⭐ Bintang
← Kembali
→ Berikutnya
```

Jangan menggunakan icon abstrak jika tidak diperlukan.

---

# 45. IMAGE RULE

Ilustrasi harus:

- sederhana,
- ceria,
- child friendly,
- tidak menakutkan,
- tidak terlalu detail,
- memiliki fokus yang jelas.

Gambar harus membantu memahami materi.

---

# 46. ERROR STATE

Jika terjadi error:

Jangan tampilkan:

```text
JavaScript Error
undefined
404
```

kepada anak.

Gunakan:

```text
😊 Oops!

Coba lagi ya.

[ Coba Lagi ]
```

---

# 47. LOADING STATE

Jika loading diperlukan:

```text
⏳ Sebentar...

Menyiapkan pembelajaran.
```

Loading harus singkat.

---

# 48. STATE MANAGEMENT

Gunakan state sederhana.

Contoh:

```javascript
currentScreen
score
stars
completedActivities
```

Simpan progress menggunakan:

```javascript
localStorage
```

jika diperlukan.

---

# 49. DATA PERSISTENCE

Minimal simpan:

```text
completed BAB
current progress
stars
quiz score
```

Contoh:

```json
{
  "bab1": {
    "progress": 80,
    "stars": 4,
    "completed": false
  }
}
```

---

# 50. ACCEPTANCE CRITERIA

UI dianggap **PASS** hanya jika:

```text
✓ One viewport
✓ Landscape first
✓ No vertical scroll
✓ No horizontal scroll
✓ Content fits
✓ Navigation visible
✓ Buttons accessible
✓ Mobile landscape works
✓ Desktop landscape works
✓ Game playable
✓ Quiz playable
✓ Feedback visible
✓ Progress visible
```

---

# 51. FINAL HARD RULES

Rules berikut bersifat **NON-NEGOTIABLE**:

```text
1. NO LONG PAGE
2. NO VERTICAL SCROLL
3. NO HORIZONTAL SCROLL
4. ONE VIEWPORT
5. LANDSCAPE FIRST
6. ONE SCREEN = ONE MAIN ACTIVITY
7. CONTENT MUST FIT
8. VISUAL > TEXT
9. LARGE TOUCH TARGET
10. MOBILE LANDSCAPE MUST WORK
```

---

# 52. GOLDEN RULE

> **Jika konten tidak muat dalam satu viewport, jangan membuat scrollbar.**

Lakukan:

```text
CONTENT TOO MUCH
        ↓
REDUCE TEXT
        ↓
SIMPLIFY UI
        ↓
SPLIT INTO NEW SCREEN
```

Jangan:

```text
CONTENT TOO MUCH
        ↓
ADD SCROLLBAR
```

---

# 53. DEFINITION OF DONE

Sebuah halaman hanya boleh dianggap selesai apabila anak kelas 1 dapat:

1. Melihat tujuan halaman dengan jelas.
2. Memahami apa yang harus dilakukan.
3. Melakukan aktivitas tanpa scrolling.
4. Mendapat feedback.
5. Melanjutkan ke aktivitas berikutnya.
6. Menyelesaikan halaman dalam satu viewport.

**Tidak ada halaman panjang.**

**Tidak ada scrolling.**

**Tidak ada konten yang terpotong.**

**Satu viewport adalah batas utama desain.**