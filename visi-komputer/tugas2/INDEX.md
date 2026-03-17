# 📑 INDEX - Tugas Domain Spasial

Panduan navigasi untuk semua file yang tersedia dalam tugas ini.

---

## 🎯 File Utama

### 1. **main.ipynb** 
📌 **YANG PALING PENTING** - Kode program utama dengan visualisasi

**Konten:**
- Bagian 1: Import Library dan Setup
- Bagian 2: Pembacaan dan Visualisasi Citra
- Bagian 3: Pembuatan Kernel (Sobel, Laplacian, LPF, Gaussian)
- Bagian 4: Operasi Korelasi dengan Hasil Visualisasi
- Bagian 5: Operasi Konvolusi dengan Perbandingan
- Bagian 6: Low Pass Filter pada Grayscale
- Bagian 7: Low Pass Filter pada Citra Berwarna (RGB)
- Bagian 8: Analisis Metrik Citra (PSNR, Similarity)
- Bagian 9: Kesimpulan dan Rekomendasi

**Cara Menjalankan:**
```bash
jupyter notebook main.ipynb
```

**Total Cells:** 32 cells (mix of markdown dan code)  
**Execution Time:** ~2-3 menit (first run)  
**Output:** Visualisasi lengkap + statistik detail

---

## 📖 File Laporan

### 2. **LAPORAN_PRAKTIKUM.md**
✅ **Laporan Lengkap** - Hasil praktikum yang detail

**Bagian:**
- I. Tujuan Praktikum
- II. Teori Dasar (Korelasi, Konvolusi, LPF)
- III. Implementasi Kode (penjelasan baris per baris)
- IV. Hasil Operasi Korelasi
- V. Hasil Operasi Konvolusi
- VI. Implementasi Low Pass Filter
- VII. Low Pass Filter pada Citra Berwarna
- VIII. Analisis Metrik Citra
- IX. Analisis Histogram
- X. Kesimpulan dan Rekomendasi
- XI. Daftar Kode Lengkap
- XII. Referensi

**Gunakan untuk:** Menyusun laporan akademik  
**Format:** Markdown dengan formula LaTeX  
**Panjang:** ~2000 kata

---

### 3. **TEMPLATE_LAPORAN.md**
📋 **Template Resmi** - Format laporan akademik standar

**Bagian:**
- Data Diri Praktikan
- Bab I: Pendahuluan (Latar Belakang, Tujuan, Ruang Lingkup)
- Bab II: Landasan Teori (lengkap dengan formula)
- Bab III: Metode Penelitian
- Bab IV: Hasil dan Pembahasan
- Bab V: Kesimpulan dan Saran
- Lampiran (Library, Fungsi, Kernel)
- Daftar Pustaka

**Gunakan untuk:** Laporan resmi/final  
**Format:** Struktur bab-sub bab lengkap  
**Panjang:** ~3000+ kata

---

## 📚 File Referensi

### 4. **README.md**
🚀 **Panduan Lengkap** - Persiapan dan troubleshooting

**Konten:**
- Persiapan Sistem
- File-file Proyek
- Instalasi Dependencies
- Cara Menjalankan (3 metode)
- Deskripsi Kode (setiap bagian)
- Hasil Praktikum (tabel metrik)
- Analisis
- Tips & Troubleshooting
- Checklist Praktikum
- Referensi

**Gunakan untuk:** Setup awal dan troubleshooting  
**Format:** Markdown dengan code snippets  
**Panjang:** ~800 kata

---

### 5. **QUICK_REFERENCE.md**
⚡ **Ringkasan Cepat** - Untuk referensi saat mengerjakan

**Konten:**
- Ringkasan Definisi (Korelasi vs Konvolusi vs LPF)
- Kernel Standar (visual)
- Kode Penting (copy-paste ready)
- Hasil pada Citra 400x400
- Parameter Penting
- Workflow Standar
- Metrik Penting (formula)
- Checklist
- Tips Optimasi
- Common Mistakes
- Untuk Berbagai Kebutuhan
- Konsep Penting
- Formula Penting

**Gunakan untuk:** Cheat sheet saat coding  
**Format:** Compact reference card  
**Panjang:** ~500 kata

---

## 📊 Data & Aset

### 6. **citra-objek.jpg**
🖼️ **Citra Input** - File gambar untuk diproses

**Spesifikasi:**
- Ukuran: 400 x 400 pixels
- Format: RGB (3 channel)
- Konten: Objek geometrik (lingkaran merah, lingkaran hijau, persegi biru)
- Background: Abu-abu
- File Size: ~10 KB

**Lokasi:** Folder yang sama dengan main.ipynb

---

## 🗂️ Struktur Folder

```
tugas2/
│
├── 📄 main.ipynb                    ← MULAI DARI SINI (kode utama)
├── 📄 LAPORAN_PRAKTIKUM.md          ← Laporan hasil praktikum
├── 📄 TEMPLATE_LAPORAN.md           ← Template laporan akademik
├── 📄 README.md                     ← Panduan lengkap
├── 📄 QUICK_REFERENCE.md            ← Cheat sheet cepat
├── 📄 INDEX.md                      ← File ini
│
└── 🖼️ citra-objek.jpg               ← Citra input
```

---

## 🚀 Bagaimana Memulai?

### Langkah 1: Setup
1. Baca **README.md** bagian "Instalasi"
2. Install library yang diperlukan
3. Pastikan citra-objek.jpg ada

### Langkah 2: Jalankan Program
1. Buka **main.ipynb** di Jupyter
2. Run setiap cell dari atas ke bawah
3. Amati output dan visualisasi

### Langkah 3: Pahami Kode
1. Baca penjelasan dalam setiap cell
2. Lihat **QUICK_REFERENCE.md** untuk formula
3. Eksperimen dengan mengubah kernel

### Langkah 4: Analisis Hasil
1. Amati visualisasi yang dihasilkan
2. Baca metrik pada output
3. Bandingkan dengan tabel di README.md

### Langkah 5: Tulis Laporan
1. Gunakan **TEMPLATE_LAPORAN.md** sebagai template
2. Ambil data dari **LAPORAN_PRAKTIKUM.md**
3. Tambahkan visualisasi dari main.ipynb
4. Lengkapi dengan analisis pribadi

---

## 📋 Checklist Lengkap

### Pre-Praktikum
- [ ] Python 3.7+ terinstall
- [ ] Library terinstall (cv2, numpy, scipy, matplotlib)
- [ ] Citra-objek.jpg ada di folder
- [ ] Jupyter atau VS Code terbuka

### Saat Praktikum
- [ ] main.ipynb sudah dijalankan
- [ ] Semua cell berhasil tanpa error
- [ ] Visualisasi sudah ditampilkan
- [ ] Output metrik sudah dilihat

### Post-Praktikum
- [ ] Baca LAPORAN_PRAKTIKUM.md
- [ ] Pahami setiap bagian
- [ ] Tulis laporan dengan TEMPLATE_LAPORAN.md
- [ ] Tambahkan analisis personal
- [ ] Simpan file laporan

---

## 🎯 Objective untuk Setiap File

| File | Objective | Gunakan Untuk |
|------|-----------|---------------|
| main.ipynb | Eksekusi program | Learning, Testing, Development |
| LAPORAN_PRAKTIKUM.md | Referensi hasil | Memahami hasil, Copy data |
| TEMPLATE_LAPORAN.md | Struktur laporan | Laporan resmi, Final submission |
| README.md | Setup & troubleshoot | Instalasi, Tips, FAQ |
| QUICK_REFERENCE.md | Cheat sheet | Coding, Formula, Tips cepat |
| INDEX.md | Navigation | Navigasi file, Workflow |

---

## 💡 Tips Penggunaan

### Jika ingin belajar coding:
1. Mulai dari **QUICK_REFERENCE.md**
2. Baca **README.md** bagian "Deskripsi Kode"
3. Jalankan **main.ipynb** dan eksperimen

### Jika ingin membuat laporan:
1. Baca **TEMPLATE_LAPORAN.md**
2. Copy struktur bab ke laporan Anda
3. Ambil data dari **LAPORAN_PRAKTIKUM.md**
4. Tambahkan visualisasi dari **main.ipynb**

### Jika ada error:
1. Cek **README.md** bagian "Tips & Troubleshooting"
2. Baca error message dengan teliti
3. Cek **QUICK_REFERENCE.md** bagian "Common Mistakes"

### Jika lupa cara kerja:
1. Buka **QUICK_REFERENCE.md** untuk refresh cepat
2. Baca **LAPORAN_PRAKTIKUM.md** untuk detail
3. Jalankan **main.ipynb** untuk visualisasi

---

## 📞 FAQ (Frequently Asked Questions)

**Q: Dimana saya harus mulai?**  
A: Mulai dari **main.ipynb**, baca komentar setiap cell, dan jalankan

**Q: Bagaimana cara membuat laporan?**  
A: Gunakan **TEMPLATE_LAPORAN.md** sebagai kerangka

**Q: Apa perbedaan korelasi dan konvolusi?**  
A: Lihat **QUICK_REFERENCE.md** bagian "Definisi" atau **LAPORAN_PRAKTIKUM.md** Bab II

**Q: Kernel mana yang terbaik?**  
A: Lihat "Rekomendasi Penggunaan" di **README.md** atau **QUICK_REFERENCE.md**

**Q: Error saat run notebook?**  
A: Baca **README.md** bagian "Tips & Troubleshooting"

**Q: Berapa lama waktu yang dibutuhkan?**  
A: ~1-2 jam untuk run code + ~1-2 jam untuk laporan = total 2-4 jam

**Q: Boleh menggunakan citra sendiri?**  
A: Boleh, tapi pastikan format RGB dan size reasonable

**Q: Boleh edit main.ipynb?**  
A: Sangat direkomendasikan untuk eksperimen!

---

## 🎓 Learning Path

```
1. Baca QUICK_REFERENCE.md (10 min)
   ↓
2. Setup dari README.md (10 min)
   ↓
3. Run main.ipynb (30 min)
   ↓
4. Baca LAPORAN_PRAKTIKUM.md (30 min)
   ↓
5. Pahami setiap bagian di main.ipynb (30 min)
   ↓
6. Tulis laporan dari TEMPLATE_LAPORAN.md (60-120 min)
   ↓
7. Review dan Finalisasi (30 min)

Total: 3-4 jam
```

---

## 📈 Topik yang Dicover

✅ Korelasi 2D  
✅ Konvolusi 2D  
✅ Kernel Design (Sobel, Gaussian, Laplacian)  
✅ Edge Detection  
✅ Image Smoothing/Blur  
✅ Low Pass Filter  
✅ Citra RGB Processing  
✅ Metrik Kualitas Citra (PSNR, Similarity)  
✅ Histogram Analysis  
✅ Image Visualization  

---

## 🔗 Referensi Silang

**main.ipynb → LAPORAN_PRAKTIKUM.md**
- Cell 1 → Bab III (Implementasi Kode)
- Cell 4 → Bab IV (Hasil Korelasi)
- Cell 8 → Bab V (Hasil Konvolusi)
- Cell 14 → Bab VIII (Analisis Metrik)

**main.ipynb → TEMPLATE_LAPORAN.md**
- Cell 1-3 → Bab III.2 (Peralatan)
- Cell 4-8 → Bab IV.1-4.2 (Hasil)
- Cell 14-20 → Bab IV.3-4.4 (Analisis)

---

## ✨ Highlights

🌟 **Best Practice:**
- Lihat QUICK_REFERENCE.md untuk formula cepat
- Gunakan TEMPLATE_LAPORAN.md sebagai kerangka

🌟 **Most Important:**
- main.ipynb adalah core dari praktikum
- Run semua cell untuk hasil lengkap

🌟 **Most Helpful:**
- README.md untuk setup dan troubleshooting
- QUICK_REFERENCE.md untuk cheat sheet

---

## 🏁 Selesai!

Jika sudah membaca file ini, Anda sudah memahami struktur lengkap dari praktikum ini.

**Langkah berikutnya:**
1. Jalankan **main.ipynb**
2. Buat laporan dengan **TEMPLATE_LAPORAN.md**
3. Selesai! 🎉

---

**Last Updated:** 17 Maret 2026  
**Status:** ✅ Lengkap  
**Total Files:** 6 files  
**Total Words:** ~10,000+  
**Total Code Cells:** 32 cells  

