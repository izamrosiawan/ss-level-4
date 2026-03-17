# TEMPLATE LAPORAN PRAKTIKUM
## Tugas Domain Spasial: Korelasi, Konvolusi, dan Low Pass Filter

---

## DATA DIRI PRAKTIKAN

| Aspek | Keterangan |
|-------|-----------|
| Praktikum | Domain Spasial pada Pengolahan Citra |
| Materi | Korelasi, Konvolusi, dan Low Pass Filter |
| Tanggal | 17 Maret 2026 |
| Program | Computer Vision / Image Processing |

---

## BAB I. PENDAHULUAN

### 1.1 Latar Belakang

Pengolahan citra digital merupakan salah satu aplikasi penting dalam berbagai bidang seperti computer vision, medical imaging, dan content-based image retrieval. Salah satu teknik fundamental dalam pengolahan citra adalah operasi domain spasial, yaitu operasi yang bekerja langsung pada pixel citra dengan menggunakan kernel (filter mask).

Dalam praktikum ini, kita mempelajari tiga operasi penting:
1. **Korelasi** - untuk mengukur kesamaan pola dalam citra
2. **Konvolusi** - untuk filtering dan feature extraction
3. **Low Pass Filter** - untuk smoothing dan noise reduction

### 1.2 Tujuan Praktikum

Tujuan dari praktikum ini adalah:

1. Memahami konsep korelasi dan implementasinya pada citra
2. Memahami konsep konvolusi dan perbedaannya dengan korelasi
3. Mengimplementasikan berbagai jenis low pass filter
4. Menerapkan operasi-operasi tersebut pada citra berwarna (RGB)
5. Menganalisis efek setiap operasi terhadap kualitas citra

### 1.3 Ruang Lingkup

Praktikum ini mencakup:
- Implementasi dalam bahasa Python
- Menggunakan library OpenCV, NumPy, dan SciPy
- Operasi pada citra grayscale dan RGB
- Visualisasi hasil dan analisis metrik
- Perbandingan berbagai kernel dan parameter

---

## BAB II. LANDASAN TEORI

### 2.1 Operasi Domain Spasial

Operasi domain spasial adalah operasi yang dilakukan langsung pada nilai pixel citra dengan menggunakan kernel (mask) yang berukuran kecil, biasanya 3x3.

#### Formula Umum:
$$g(x,y) = \sum_{i} \sum_{j} f(x+i, y+j) \times h(i,j)$$

Di mana:
- f(x,y) = nilai pixel input
- h(i,j) = kernel (filter mask)
- g(x,y) = nilai pixel output

### 2.2 Korelasi (Correlation)

Korelasi mengukur kesamaan antara dua sinyal tanpa melakukan pembalikan kernel.

**Formula Korelasi:**
$$r(x,y) = \sum_{i} \sum_{j} f(x+i, y+j) \times h(i,j)$$

**Karakteristik Korelasi:**
- Kernel tetap dalam orientasi aslinya
- Digunakan untuk pattern matching
- Digunakan untuk template matching
- Baik untuk deteksi fitur spesifik

**Contoh Aplikasi:**
- Mendeteksi kehadiran pola tertentu
- Mencocokkan template dengan citra
- Feature detection (tepi, sudut, tekstur)

### 2.3 Konvolusi (Convolution)

Konvolusi adalah operasi yang melakukan pembalikan kernel sebelum diterapkan pada citra.

**Formula Konvolusi:**
$$g(x,y) = \sum_{i} \sum_{j} f(x+i, y+j) \times h(-i,-j)$$

**Karakteristik Konvolusi:**
- Kernel di-flip 180° sebelum digunakan
- Lebih konsisten dengan teori signal processing
- Digunakan untuk filtering umum
- Digunakan untuk feature extraction

**Perbedaan Korelasi vs Konvolusi:**
- Untuk kernel simetris (seperti averaging), hasilnya sama
- Untuk kernel asimetris, hasilnya berbeda
- Konvolusi adalah operasi yang lebih "standar" dalam DSP

### 2.4 Low Pass Filter

Low pass filter adalah filter yang melewatkan frekuensi rendah sambil memblokir frekuensi tinggi. Dalam domain spasial, ini berarti menghaluskan citra dan mengurangi detail.

**Jenis-jenis Low Pass Filter:**

#### a. Averaging Filter (Mean Filter)
$$h = \frac{1}{9}\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Keunggulan:**
- Sederhana dan cepat
- Mengurangi noise

**Kelemahan:**
- Blur tidak natural
- Edge menjadi blur juga

#### b. Gaussian Filter
$$h = \frac{1}{16}\begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{bmatrix}$$

**Keunggulan:**
- Blur lebih halus dan natural
- Sesuai dengan distribusi natural
- Edge lebih presisi

**Kelemahan:**
- Sedikit lebih lambat

#### c. Median Filter
- Menggunakan nilai tengah pixel tetangga
- Sangat baik untuk salt-and-pepper noise
- Non-linear filter

### 2.5 Edge Detection Filters

#### a. Sobel X (Deteksi Edge Vertikal)
$$h_x = \begin{bmatrix} -1 & 0 & 1 \\ -2 & 0 & 2 \\ -1 & 0 & 1 \end{bmatrix}$$

#### b. Sobel Y (Deteksi Edge Horizontal)
$$h_y = \begin{bmatrix} -1 & -2 & -1 \\ 0 & 0 & 0 \\ 1 & 2 & 1 \end{bmatrix}$$

#### c. Magnitude Sobel
$$M = \sqrt{G_x^2 + G_y^2}$$

#### d. Laplacian (Edge Detection Turunan Kedua)
$$h = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 4 & -1 \\ 0 & -1 & 0 \end{bmatrix}$$

---

## BAB III. METODE PENELITIAN

### 3.1 Peralatan dan Software

**Hardware:**
- Processor: Intel Core i7
- RAM: 8GB
- Disk: SSD 256GB

**Software:**
- Python 3.11
- OpenCV (cv2)
- NumPy
- SciPy
- Matplotlib
- Jupyter Notebook

### 3.2 Metodologi

**Langkah-langkah Praktikum:**

1. **Persiapan**
   - Import library yang diperlukan
   - Membaca citra dari file

2. **Pembuatan Kernel**
   - Kernel Sobel X dan Y
   - Kernel Low Pass Filter
   - Kernel Edge Detection

3. **Operasi Korelasi**
   - Terapkan kernel Sobel X dan Y
   - Hitung magnitude
   - Normalisasi hasil

4. **Operasi Konvolusi**
   - Terapkan kernel yang sama
   - Bandingkan hasil dengan korelasi

5. **Low Pass Filter**
   - Pada citra grayscale
   - Pada setiap channel RGB

6. **Analisis**
   - Hitung metrik kualitas
   - Bandingkan hasil
   - Visualisasi

### 3.3 Dataset

**Citra Input:**
- File: citra-objek.jpg
- Dimensi: 400 x 400 pixels
- Format: RGB (3 channel)
- Konten: Objek geometrik (lingkaran, persegi) dengan warna berbeda

---

## BAB IV. HASIL DAN PEMBAHASAN

### 4.1 Korelasi

**Hasil Statistik:**
- Korelasi Sobel X: Range [-303, 289]
- Korelasi Sobel Y: Range [-299, 291]
- Magnitude: Range [0, 334.57]

**Interpretasi:**
- Sobel X mendeteksi edge vertikal dengan jelas
- Sobel Y mendeteksi edge horizontal
- Magnitude menggabungkan kedua hasil untuk edge detection lengkap

**Visualisasi:**
[Lihat pada notebook untuk visualisasi]

### 4.2 Konvolusi

**Hasil Statistik:**
- Konvolusi Sobel X: Range [-289, 303]
- Konvolusi Sobel Y: Range [-291, 299]
- Laplacian: Range [-183, 212]

**Interpretasi:**
- Hasil sangat mirip dengan korelasi (kernel simetris)
- Laplacian memberikan edge detection yang lebih tajam
- Perbedaan dengan korelasi minimal untuk kernel simetris

**Visualisasi:**
[Lihat pada notebook untuk visualisasi]

### 4.3 Low Pass Filter - Grayscale

**Tabel Perbandingan Metrik:**

| Metrik | Asli | Averaging(3x3) | Gaussian(3x3) | Blur(5x5) | Blur(7x7) |
|--------|------|-----------------|--------------|-----------|-----------|
| Mean | 94.50 | 94.48 | 94.48 | 94.50 | 94.50 |
| Std Dev | 20.74 | 20.53 | 20.57 | 20.53 | 20.20 |
| Min | 24 | 28 | 28 | 29 | 31 |
| Max | 156 | 150 | 150 | 151 | 151 |
| Range | 132 | 122 | 122 | 122 | 120 |

**Analisis:**
- Mean tetap stabil → brightness terjaga
- Std Dev menurun → detail berkurang
- Range menurun → tone compression terjadi
- Kernel lebih besar → efek lebih kuat

### 4.4 Metrik Kualitas

**PSNR (Peak Signal-to-Noise Ratio):**
- Averaging (3x3): 41.70 dB
- Gaussian (3x3): 43.88 dB ← Terbaik
- Blur (5x5): 41.63 dB

**Similarity (Correlation Coefficient):**
- Averaging (3x3): 0.9949
- Gaussian (3x3): 0.9969 ← Paling mirip
- Blur (5x5): 0.9948

**Interpretasi:**
- Gaussian filter memberikan hasil terbaik
- Semua filter mempertahankan similarity >99%
- Blur 3x3 cukup untuk most applications

### 4.5 Low Pass Filter - RGB

**Hasil:**
- Blur (3x3): Blur minimal, detail jelas
- Blur (5x5): Blur sedang, lebih smooth
- Blur (7x7): Blur kuat, aesthetic
- Gaussian: Blur natural optimal

**Observasi:**
- Warna tetap terjaga
- Edge melembut secara gradual
- Tidak ada color bleeding

### 4.6 Analisis Histogram

**Citra Asli:**
- Multi-modal dengan 3 peak utama
- Peak 1: ~30 (objek dark)
- Peak 2: ~95 (background)
- Peak 3: ~130 (objek bright)

**Setelah Filter:**
- Peak lebih halus dan melebar
- Histogram lebih smooth
- Frekuensi extreme berkurang
- Tone compression terlihat

---

## BAB V. KESIMPULAN

### 5.1 Kesimpulan Umum

Berdasarkan hasil praktikum, dapat disimpulkan:

1. **Korelasi dan Konvolusi**
   - Keduanya efektif untuk edge detection
   - Perbedaan minimal untuk kernel simetris
   - Konvolusi lebih sesuai dengan teori DSP

2. **Low Pass Filter**
   - Efektif menghaluskan citra dan mengurangi noise
   - Gaussian filter memberikan hasil terbaik (PSNR 43.88 dB)
   - Kernel 3x3 sudah cukup untuk most applications
   - Semakin besar kernel → blur semakin kuat

3. **Aplikasi RGB**
   - Filter dapat diterapkan per-channel
   - Warna terjaga dengan baik
   - OpenCV otomatis menangani 3 channel

4. **Kualitas Citra**
   - Similarity tetap tinggi (>99%)
   - Mean brightness terjaga
   - Detail berkurang seiring kernel size meningkat

### 5.2 Rekomendasi

1. **Untuk Deteksi Edge**: Gunakan Sobel atau Laplacian
2. **Untuk Noise Reduction**: Gunakan Gaussian Blur
3. **Untuk Preprocessing**: Gunakan Low Pass Filter 3x3
4. **Untuk Real-time**: Kernel kecil (3x3)
5. **Untuk Aesthetic Blur**: Gaussian 5x5 atau 7x7

### 5.3 Saran untuk Praktikum Selanjutnya

1. Membandingkan dengan filter frequency domain
2. Menggunakan adaptive filtering
3. Implementasi morphological operations
4. Kombinasi multiple filters
5. Performance optimization dengan GPU

---

## LAMPIRAN

### A. Daftar Library dan Fungsi

```python
import cv2                      # OpenCV
import numpy as np              # NumPy
import matplotlib.pyplot as plt # Matplotlib
from scipy.ndimage import correlate, convolve  # SciPy
```

### B. Fungsi Utama

**Pembacaan Citra:**
- cv2.imread(): Baca citra dari file
- cv2.cvtColor(): Konversi format warna

**Operasi Spasial:**
- correlate(): Korelasi 2D
- convolve(): Konvolusi 2D
- cv2.filter2D(): Custom filter
- cv2.blur(): Averaging filter
- cv2.GaussianBlur(): Gaussian filter

**Visualisasi:**
- plt.imshow(): Tampilkan citra
- plt.hist(): Tampilkan histogram

### C. Kernel yang Digunakan

Lihat pada BAB II - Landasan Teori untuk detail lengkap setiap kernel.

---

## DAFTAR PUSTAKA

1. Gonzalez, R. C., & Woods, R. E. (2017). *Digital Image Processing* (4th ed.). Pearson.

2. OpenCV Documentation. (2023). Retrieved from https://opencv.org/

3. SciPy Documentation. (2023). Retrieved from https://scipy.org/

4. NumPy Documentation. (2023). Retrieved from https://numpy.org/

5. Pratt, W. K. (2007). *Digital Image Processing: PIKS Scientific Inside* (4th ed.). Wiley.

6. Forsyth, D. A., & Ponce, J. (2003). *Computer Vision: A Modern Approach*. Prentice Hall.

---

**Status: Selesai ✓**  
**Tanggal Selesai: 17 Maret 2026**  
**File Utama: main.ipynb**  
**File Laporan: LAPORAN_PRAKTIKUM.md**

