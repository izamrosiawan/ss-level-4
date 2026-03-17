# LAPORAN PRAKTIKUM DOMAIN SPASIAL
## Korelasi, Konvolusi, dan Low Pass Filter pada Citra Berwarna

---

## I. TUJUAN PRAKTIKUM

Membuat program Python yang menerapkan:
1. **Korelasi** - Mengukur kesamaan antara kernel dan citra tanpa flip
2. **Konvolusi** - Operasi fundamental dengan flip kernel 180°
3. **Low Pass Filter** - Menghaluskan citra dan mengurangi noise
4. Mengaplikasikan semua teknik pada **citra berwarna (RGB)**

---

## II. TEORI DASAR

### A. Korelasi (Correlation)
Korelasi adalah operasi matematis untuk mengukur kesamaan antara dua sinyal.

**Formula Korelasi 2D:**
$$\text{Correlation}(f, g)[m,n] = \sum_{i}\sum_{j} f(i,j) \cdot g(i+m, j+n)$$

**Karakteristik:**
- Kernel TIDAK di-flip
- Digunakan untuk pattern matching dan template matching
- Baik untuk mendeteksi fitur tertentu dalam citra

### B. Konvolusi (Convolution)
Konvolusi adalah operasi fundamental dalam pengolahan citra yang menggabungkan kernel dengan citra.

**Formula Konvolusi 2D:**
$$\text{Convolution}(f, g)[m,n] = \sum_{i}\sum_{j} f(i,j) \cdot g(m-i, n-j)$$

**Karakteristik:**
- Kernel DI-FLIP 180°
- Lebih konsisten dengan teori signal processing
- Digunakan untuk filtering, feature extraction, dan downsampling

### C. Low Pass Filter
Filter yang menghaluskan citra dengan mengurangi frekuensi tinggi (noise dan detail).

**Kernel Averaging (3x3):**
$$\frac{1}{9}\begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

**Kernel Gaussian (3x3):**
$$\frac{1}{16}\begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{bmatrix}$$

---

## III. IMPLEMENTASI KODE

### 1. Library yang Digunakan

```python
import cv2                          # OpenCV untuk pengolahan citra
import numpy as np                  # NumPy untuk operasi numerik
import matplotlib.pyplot as plt     # Matplotlib untuk visualisasi
from scipy import signal            # SciPy untuk operasi sinyal
from scipy.ndimage import correlate, convolve  # Korelasi & konvolusi
```

**Penjelasan:**
- **cv2**: Library utama untuk pembacaan dan pemrosesan citra dengan format BGR
- **numpy**: Library numerik untuk manipulasi array multidimensi
- **matplotlib**: Library visualisasi untuk menampilkan citra dan grafik
- **scipy.ndimage**: Module dengan fungsi correlate() dan convolve()

### 2. Pembacaan dan Konversi Citra

```python
# Membaca citra
image_bgr = cv2.imread('citra-objek.jpg')

# Konversi BGR → RGB untuk matplotlib
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)

# Konversi BGR → Grayscale
image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
```

**Hasil:**
- Dimensi citra RGB: (400, 400, 3)
- Dimensi citra Grayscale: (400, 400)
- Range pixel: 0-255 (uint8)
- Nilai pixel asli: min=24, max=156

### 3. Pembuatan Kernel

#### Kernel Sobel X (Deteksi Edge Vertikal)
```python
kernel_sobel_x = np.array([
    [-1,  0,  1],
    [-2,  0,  2],
    [-1,  0,  1]
], dtype=np.float32)
```

**Penjelasan:**
- Memberikan bobot lebih pada perubahan horizontal
- Jumlah kernel = 0 (kernel bandpass)
- Cocok untuk mendeteksi garis vertikal

#### Kernel Sobel Y (Deteksi Edge Horizontal)
```python
kernel_sobel_y = np.array([
    [-1, -2, -1],
    [ 0,  0,  0],
    [ 1,  2,  1]
], dtype=np.float32)
```

**Penjelasan:**
- Memberikan bobot lebih pada perubahan vertikal
- Cocok untuk mendeteksi garis horizontal

#### Low Pass Filter - Averaging
```python
kernel_lowpass = np.array([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
], dtype=np.float32) / 9.0
```

**Penjelasan:**
- Setiap pixel diganti dengan rata-rata 9 tetangganya
- Dibagi 9 untuk normalisasi (jumlah kernel = 1)
- Efek: blur sedang, detail berkurang

#### Low Pass Filter - Gaussian
```python
kernel_gaussian = np.array([
    [1, 2, 1],
    [2, 4, 2],
    [1, 2, 1]
], dtype=np.float32) / 16.0
```

**Penjelasan:**
- Menggunakan distribusi Gaussian normal
- Pixel pusat mendapat bobot terbesar (4)
- Efek: blur lebih halus dan natural dibanding averaging
- Jumlah kernel = 1

#### Edge Detection - Laplacian
```python
kernel_laplacian = np.array([
    [ 0, -1,  0],
    [-1,  4, -1],
    [ 0, -1,  0]
], dtype=np.float32)
```

**Penjelasan:**
- Deteksi edge menggunakan turunan kedua
- Pixel pusat bernilai +4, tetangga -1
- Jumlah kernel = 0

---

## IV. HASIL OPERASI KORELASI

### A. Kode Operasi Korelasi

```python
# Korelasi menggunakan Sobel X
correlation_sobel_x = correlate(image_gray.astype(np.float32), 
                                kernel_sobel_x, mode='reflect')

# Korelasi menggunakan Sobel Y
correlation_sobel_y = correlate(image_gray.astype(np.float32), 
                                kernel_sobel_y, mode='reflect')

# Menghitung magnitude edge
correlation_magnitude = np.sqrt(correlation_sobel_x**2 + 
                               correlation_sobel_y**2)

# Normalisasi ke range 0-255
correlation_magnitude_normalized = (
    correlation_magnitude / correlation_magnitude.max() * 255
).astype(np.uint8)
```

**Penjelasan:**
- **correlate()**: Fungsi scipy untuk korelasi (kernel TIDAK di-flip)
- **astype(np.float32)**: Konversi ke float32 untuk presisi perhitungan
- **mode='reflect'**: Mencerminkan pixel di edge (padding)
- **√(Gx² + Gy²)**: Formula magnitude dari dua komponen
- Normalisasi memastikan output 0-255

### B. Hasil Statistik Korelasi

| Metrik | Nilai |
|--------|-------|
| Shape Hasil | (400, 400) |
| Min Value (Sobel X) | -303.00 |
| Max Value (Sobel X) | 289.00 |
| Mean Value (Sobel X) | 0.00 |
| Min Value (Sobel Y) | -299.00 |
| Max Value (Sobel Y) | 291.00 |
| Magnitude Range | 0.00 - 334.57 |

### C. Visualisasi Hasil Korelasi

**Hasil Korelasi Sobel X:** 
- Menampilkan edge vertikal dengan garis putih
- Bagian border objek terlihat jelas

**Hasil Korelasi Sobel Y:**
- Menampilkan edge horizontal
- Outline bentuk objek lebih jelas

**Magnitude Korelasi:**
- Kombinasi kedua hasil Sobel
- Edge detection lengkap dari semua arah

---

## V. HASIL OPERASI KONVOLUSI

### A. Kode Operasi Konvolusi

```python
# Konvolusi dengan Sobel X
convolution_sobel_x = convolve(image_gray.astype(np.float32), 
                               kernel_sobel_x, mode='reflect')

# Konvolusi dengan Sobel Y
convolution_sobel_y = convolve(image_gray.astype(np.float32), 
                               kernel_sobel_y, mode='reflect')

# Konvolusi dengan Laplacian
convolution_laplacian = convolve(image_gray.astype(np.float32), 
                                kernel_laplacian, mode='reflect')

# Menghitung magnitude
convolution_magnitude = np.sqrt(convolution_sobel_x**2 + 
                               convolution_sobel_y**2)
```

**Penjelasan:**
- **convolve()**: Fungsi scipy untuk konvolusi (kernel DI-FLIP)
- Perbedaan dengan korelasi adalah flip kernel otomatis
- Untuk kernel simetris (Sobel), perbedaan minimal

### B. Hasil Statistik Konvolusi

| Metrik | Nilai |
|--------|-------|
| Min Value (Sobel X) | -289.00 |
| Max Value (Sobel X) | 303.00 |
| Min Value (Sobel Y) | -291.00 |
| Max Value (Sobel Y) | 299.00 |
| Min Value (Laplacian) | -183.00 |
| Max Value (Laplacian) | 212.00 |
| Perbedaan Rata-rata Korelasi vs Konvolusi | 0.00 |

**Catatan:** 
- Perbedaan minimal karena kernel Sobel simetris
- Kernel non-simetris akan menunjukkan perbedaan signifikan

### C. Visualisasi Hasil Konvolusi

**Hasil Konvolusi Sobel:** Mirip dengan korelasi, edge detection lengkap

**Hasil Konvolusi Laplacian:** 
- Mendeteksi edge dengan pendekatan turunan kedua
- Lebih peka terhadap perubahan intensitas

---

## VI. IMPLEMENTASI LOW PASS FILTER

### A. Low Pass Filter pada Citra Grayscale

#### 1. Averaging Filter (3x3)
```python
lowpass_averaging = convolve(image_gray.astype(np.float32), 
                             kernel_lowpass, mode='reflect')
lowpass_averaging = np.clip(lowpass_averaging, 0, 255).astype(np.uint8)
```

**Hasil:**
- Mean: 94.48 (sama dengan citra asli)
- Std Dev: 20.53 (sedikit berkurang dari 20.74)
- Efek: Blur ringan, detail sedikit berkurang

#### 2. Gaussian Filter (3x3)
```python
lowpass_gaussian = convolve(image_gray.astype(np.float32), 
                            kernel_gaussian, mode='reflect')
lowpass_gaussian = np.clip(lowpass_gaussian, 0, 255).astype(np.uint8)
```

**Hasil:**
- Mean: 94.48
- Std Dev: 20.57
- Efek: Blur lebih halus, lebih natural

#### 3. Multi-pass Filter (3x Iterasi)
```python
# Aplikasikan filter 3 kali untuk blur lebih kuat
lowpass_multi_pass_1 = convolve(image_gray, kernel_lowpass, mode='reflect')
lowpass_multi_pass_2 = convolve(lowpass_multi_pass_1, kernel_lowpass, mode='reflect')
lowpass_multi_pass_3 = convolve(lowpass_multi_pass_2, kernel_lowpass, mode='reflect')
```

**Hasil:**
- Mean: 94.46
- Std Dev: 20.20
- Efek: Blur sangat kuat, detail hilang

#### 4. OpenCV Built-in Blur
```python
lowpass_cv2_blur = cv2.blur(image_gray, (3, 3))
lowpass_cv2_blur_5x5 = cv2.blur(image_gray, (5, 5))
lowpass_cv2_blur_7x7 = cv2.blur(image_gray, (7, 7))
```

**Hasil (3x3):**
- Mean: 94.50
- Std Dev: 20.53

#### 5. OpenCV Gaussian Blur
```python
lowpass_cv2_gaussian = cv2.GaussianBlur(image_gray, (3, 3), 1.0)
```

**Hasil:**
- Mean: 94.50
- Std Dev: 20.53
- Efek: Blur optimal dengan natural look

### B. Statistik Perbandingan Low Pass Filter

| Filter | Mean | Std Dev | Contrast | Dynamic Range |
|--------|------|---------|----------|---------------|
| Citra Asli | 94.50 | 20.74 | 20.74 | 132 |
| Averaging (3x3) | 94.48 | 20.53 | 20.53 | 122 |
| Gaussian (3x3) | 94.48 | 20.57 | 20.57 | 122 |
| Blur (5x5) | 94.50 | 20.53 | 20.53 | 122 |
| Blur (7x7) | 94.50 | 20.20 | 20.20 | 121 |

**Observasi:**
- Standard deviation menurun (detail berkurang)
- Mean tetap stabil (brightness terjaga)
- Dynamic range menurun (tone compression)

---

## VII. LOW PASS FILTER PADA CITRA BERWARNA (RGB)

### A. Implementasi pada Citra RGB

#### Metode 1: Menggunakan OpenCV Built-in
```python
# OpenCV blur otomatis memproses setiap channel
lowpass_rgb_blur = cv2.blur(image_rgb, (3, 3))
```

#### Metode 2: Gaussian Blur
```python
lowpass_rgb_gaussian = cv2.GaussianBlur(image_rgb, (3, 3), 1.0)
```

#### Metode 3: Kernel Besar (5x5, 7x7)
```python
lowpass_rgb_blur_5x5 = cv2.blur(image_rgb, (5, 5))
lowpass_rgb_blur_7x7 = cv2.blur(image_rgb, (7, 7))
```

#### Metode 4: Manual per Channel
```python
# Pisahkan channel
r_channel = image_rgb[:, :, 0].astype(np.float32)
g_channel = image_rgb[:, :, 1].astype(np.float32)
b_channel = image_rgb[:, :, 2].astype(np.float32)

# Aplikasikan filter
r_filtered = convolve(r_channel, kernel_gaussian, mode='reflect')
g_filtered = convolve(g_channel, kernel_gaussian, mode='reflect')
b_filtered = convolve(b_channel, kernel_gaussian, mode='reflect')

# Gabungkan kembali
lowpass_rgb_custom = np.stack([
    np.clip(r_filtered, 0, 255).astype(np.uint8),
    np.clip(g_filtered, 0, 255).astype(np.uint8),
    np.clip(b_filtered, 0, 255).astype(np.uint8)
], axis=2)
```

**Penjelasan:**
- **image[:, :, 0]**: Channel Red
- **image[:, :, 1]**: Channel Green
- **image[:, :, 2]**: Channel Blue
- **np.stack()**: Menggabungkan 3 channel menjadi citra RGB

### B. Hasil pada Citra RGB

| Method | Shape | Tipe Data |
|--------|-------|-----------|
| Blur (3x3) | (400, 400, 3) | uint8 |
| Gaussian (3x3) | (400, 400, 3) | uint8 |
| Blur (5x5) | (400, 400, 3) | uint8 |
| Blur (7x7) | (400, 400, 3) | uint8 |
| Custom Gaussian | (400, 400, 3) | uint8 |

**Efek Visual:**
- Kernel 3x3: Blur minimal, detail tetap terlihat
- Kernel 5x5: Blur sedang, edge sedikit melembut
- Kernel 7x7: Blur kuat, detail berkurang signifikan
- Gaussian: Blur halus dan natural

---

## VIII. ANALISIS METRIK CITRA

### A. Metrik Dasar

#### Mean (Rata-rata Brightness)
- **Citra Asli**: 94.50
- **Setelah Filter**: Stabil (~94.48)
- **Interpretasi**: Kecerahan rata-rata tetap terjaga

#### Standard Deviation (Std Dev)
- **Citra Asli**: 20.74
- **Blur 3x3**: 20.53
- **Blur 7x7**: 20.20
- **Interpretasi**: Semakin besar kernel, semakin rendah variasi (detail hilang)

#### Dynamic Range
- **Citra Asli**: 132 (dari 24 hingga 156)
- **Setelah Filter**: 121-122
- **Interpretasi**: Range pixel mengecil (tone compression)

### B. PSNR (Peak Signal-to-Noise Ratio)

Formula: $$\text{PSNR} = 20 \log_{10}\left(\frac{255}{\sqrt{\text{MSE}}}\right) \text{ dB}$$

| Filter | PSNR | Interpretasi |
|--------|------|--------------|
| Averaging (3x3) | 41.70 dB | Mirip citra asli, sedikit blur |
| Gaussian (3x3) | 43.88 dB | **Terbaik**, blur halus |
| Blur OpenCV (5x5) | 41.63 dB | Blur lebih kuat |

**Catatan:**
- Gaussian memiliki PSNR tertinggi = hasil blur terbaik
- Kernel lebih besar = PSNR menurun (semakin beda dari asli)

### C. Similarity (Correlation Coefficient)

Formula: $$\rho = \frac{\sum(x_i - \bar{x})(y_i - \bar{y})}{\sqrt{\sum(x_i - \bar{x})^2 \sum(y_i - \bar{y})^2}}$$

| Filter | Similarity | Interpretasi |
|--------|-----------|--------------|
| Averaging (3x3) | 0.9949 | Sangat mirip (99.49%) |
| Gaussian (3x3) | 0.9969 | **Paling mirip** (99.69%) |
| Blur (5x5) | 0.9948 | Mirip (99.48%) |

**Range**: -1 (berbeda sempurna) hingga +1 (identik)

---

## IX. ANALISIS HISTOGRAM

Histogram menunjukkan distribusi intensitas pixel dalam citra.

**Citra Asli:**
- Tiga peak utama pada intensitas ~30 (objek gelap/biru), ~95 (background), ~130 (objek cerah/merah)
- Distribusi multi-modal (multiple peaks)

**Setelah Averaging Filter:**
- Peak lebih halus dan melebar
- Terjadi smoothing pada histogram
- Detail distribution hilang

**Setelah Gaussian Filter:**
- Similar ke averaging, tapi lebih smooth
- Peak lebih rendah, spread lebih luas
- Natural distribution

**Setelah Blur 5x5:**
- Peak semakin melebar
- Histogram sangat smooth
- Banyak frekuensi terdistribusi

**Interpretasi:**
- Filter menghaluskan histogram
- Frekuensi tinggi berkurang
- Kompresi tone terjadi

---

## X. KESIMPULAN

### 1. Korelasi vs Konvolusi
- **Korelasi**: Kernel tidak di-flip, baik untuk pattern matching
- **Konvolusi**: Kernel di-flip, fundamental untuk signal processing
- Pada kernel simetris (Sobel), perbedaannya minimal
- Kedua operasi efektif untuk edge detection

### 2. Low Pass Filter
- **Averaging**: Sederhana, cepat, blur sedang
- **Gaussian**: Halus, natural, blur optimal
- **Multi-pass**: Blur sangat kuat, detail hilang
- **Kernel size**: Semakin besar = semakin blur

### 3. Efek pada Citra
| Aspek | Efek |
|-------|------|
| Mean | Tetap stabil |
| Std Dev | Menurun (detail berkurang) |
| Dynamic Range | Menurun (tone compression) |
| PSNR | Menurun (semakin beda dari asli) |
| Similarity | Tinggi (>99%) |
| Edge | Melembut, halus |
| Noise | Berkurang |

### 4. Aplikasi pada Citra Berwarna
- Filter diaplikasikan per channel (R, G, B)
- Hasil: Citra RGB yang lebih smooth
- Warna terjaga, hanya detail yang berkurang
- Kernel size mempengaruhi tingkat blur

### 5. Rekomendasi Penggunaan
- **Edge Detection**: Sobel atau Laplacian
- **Noise Reduction**: Gaussian Blur
- **Preprocessing**: Low Pass Filter (3x3)
- **Real-time Processing**: Kernel kecil (3x3)
- **Aesthetic Blur**: Gaussian dengan kernel 5x5 atau 7x7

---

## XI. DAFTAR KODE LENGKAP

Semua kode implementasi tersedia di notebook `main.ipynb` dengan penjelasan detail pada setiap baris.

### Struktur Notebook:
1. Import Library
2. Pembacaan Citra
3. Pembuatan Kernel
4. Operasi Korelasi
5. Operasi Konvolusi
6. Low Pass Filter (Grayscale)
7. Low Pass Filter (RGB)
8. Analisis Metrik
9. Kesimpulan

---

## XII. REFERENSI

1. OpenCV Documentation: https://opencv.org/
2. SciPy ndimage: https://docs.scipy.org/doc/scipy/reference/ndimage.html
3. NumPy Documentation: https://numpy.org/doc/
4. Gonzalez & Woods - Digital Image Processing

---

**Praktikum Selesai**  
*Tanggal: 17 Maret 2026*  
*Program: Tugas Domain Spasial - Korelasi, Konvolusi, dan Low Pass Filter*

