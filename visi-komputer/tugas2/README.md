# Tugas Domain Spasial: Korelasi, Konvolusi, dan Low Pass Filter

Program Python untuk implementasi korelasi, konvolusi, dan low pass filter pada citra berwarna menggunakan OpenCV, NumPy, dan SciPy.

## 📋 Daftar Isi

- [Persiapan](#persiapan)
- [File-file Proyek](#file-file-proyek)
- [Instalasi](#instalasi)
- [Cara Menjalankan](#cara-menjalankan)
- [Deskripsi Kode](#deskripsi-kode)
- [Hasil Praktikum](#hasil-praktikum)
- [Analisis](#analisis)

---

## 🎯 Persiapan

### Persyaratan Sistem
- Python 3.7 atau lebih tinggi
- Windows 10/11 atau Linux
- RAM minimal 4GB
- Disk space minimal 500MB

### Library yang Diperlukan
```
opencv-python==4.13.0.92
numpy==2.2.3
matplotlib==3.10.3
scipy==1.15.3
```

---

## 📁 File-file Proyek

```
tugas2/
├── main.ipynb                    # Notebook utama dengan semua kode
├── LAPORAN_PRAKTIKUM.md          # Laporan lengkap hasil praktikum
├── TEMPLATE_LAPORAN.md           # Template laporan akademik
├── README.md                     # File ini
└── citra-objek.jpg               # Citra input (400x400 RGB)
```

---

## ⚙️ Instalasi

### 1. Clone Repository (Jika belum ada)
```bash
cd c:\Users\LENOVO\Documents\GitHub\ss-level-4\visi-komputer\tugas2
```

### 2. Install Dependencies
```bash
pip install opencv-python numpy matplotlib scipy
```

### 3. Verifikasi Instalasi
```bash
python -c "import cv2, numpy, matplotlib, scipy; print('All libraries installed!')"
```

---

## 🚀 Cara Menjalankan

### Metode 1: Jupyter Notebook (Recommended)

```bash
jupyter notebook main.ipynb
```

Kemudian:
1. Tekan `Shift + Enter` pada setiap cell untuk menjalankannya
2. Atau gunakan `Cell → Run All` untuk menjalankan semua

### Metode 2: Python Script

Ekstrak kode dari notebook dan simpan sebagai `.py`, kemudian jalankan:

```bash
python main.py
```

### Metode 3: VS Code

1. Buka folder di VS Code
2. Buka `main.ipynb`
3. Gunakan tombol play di sebelah cell

---

## 📝 Deskripsi Kode

### Bagian 1: Import Library

```python
import cv2                              # OpenCV
import numpy as np                      # NumPy
import matplotlib.pyplot as plt         # Matplotlib
from scipy import signal                # SciPy signal
from scipy.ndimage import correlate, convolve  # Korelasi & Konvolusi
```

**Penjelasan:**
- `cv2`: Library utama untuk pengolahan citra
- `numpy`: Operasi numerik dan array
- `matplotlib.pyplot`: Visualisasi dan plotting
- `scipy.ndimage`: Fungsi correlate() dan convolve()

### Bagian 2: Pembacaan Citra

```python
image_bgr = cv2.imread('citra-objek.jpg')
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
image_gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
```

**Output:**
- Dimensi citra RGB: (400, 400, 3)
- Dimensi citra Grayscale: (400, 400)
- Range pixel: 0-255 (uint8)

### Bagian 3: Pembuatan Kernel

#### Kernel Sobel X (Edge Vertikal)
```python
kernel_sobel_x = np.array([[-1,  0,  1],
                            [-2,  0,  2],
                            [-1,  0,  1]], dtype=np.float32)
```

#### Kernel Sobel Y (Edge Horizontal)
```python
kernel_sobel_y = np.array([[-1, -2, -1],
                            [ 0,  0,  0],
                            [ 1,  2,  1]], dtype=np.float32)
```

#### Kernel Low Pass - Averaging
```python
kernel_lowpass = np.array([[1, 1, 1],
                           [1, 1, 1],
                           [1, 1, 1]], dtype=np.float32) / 9.0
```

#### Kernel Low Pass - Gaussian
```python
kernel_gaussian = np.array([[1, 2, 1],
                            [2, 4, 2],
                            [1, 2, 1]], dtype=np.float32) / 16.0
```

### Bagian 4: Operasi Korelasi

```python
correlation_sobel_x = correlate(image_gray.astype(np.float32), 
                                kernel_sobel_x, mode='reflect')
correlation_magnitude = np.sqrt(correlation_sobel_x**2 + correlation_sobel_y**2)
```

**Karakteristik:**
- Kernel TIDAK di-flip
- Untuk pattern matching
- Deteksi edge efektif

### Bagian 5: Operasi Konvolusi

```python
convolution_sobel_x = convolve(image_gray.astype(np.float32), 
                               kernel_sobel_x, mode='reflect')
```

**Karakteristik:**
- Kernel DI-FLIP 180°
- Fundamental untuk filtering
- Standard dalam signal processing

### Bagian 6: Low Pass Filter

```python
# Averaging
lowpass_averaging = convolve(image_gray.astype(np.float32), 
                             kernel_lowpass, mode='reflect')
lowpass_averaging = np.clip(lowpass_averaging, 0, 255).astype(np.uint8)

# Gaussian
lowpass_gaussian = convolve(image_gray.astype(np.float32), 
                            kernel_gaussian, mode='reflect')

# OpenCV Built-in
lowpass_cv2_blur = cv2.blur(image_gray, (3, 3))
lowpass_cv2_gaussian = cv2.GaussianBlur(image_gray, (3, 3), 1.0)
```

**Mode Padding:**
- `mode='reflect'`: Mencerminkan pixel di edge

### Bagian 7: Low Pass Filter pada RGB

```python
# Metode 1: Direct
lowpass_rgb = cv2.blur(image_rgb, (3, 3))

# Metode 2: Per-channel
r_filtered = convolve(r_channel, kernel_gaussian, mode='reflect')
g_filtered = convolve(g_channel, kernel_gaussian, mode='reflect')
b_filtered = convolve(b_channel, kernel_gaussian, mode='reflect')

# Gabung
lowpass_rgb_custom = np.stack([r_filtered, g_filtered, b_filtered], axis=2)
```

---

## 📊 Hasil Praktikum

### Metrik Citra Grayscale

| Metrik | Asli | Averaging(3x3) | Gaussian(3x3) | Blur(5x5) |
|--------|------|---|---|---|
| Mean | 94.50 | 94.48 | 94.48 | 94.50 |
| Std Dev | 20.74 | 20.53 | 20.57 | 20.53 |
| Min | 24 | 28 | 28 | 29 |
| Max | 156 | 150 | 150 | 151 |
| Range | 132 | 122 | 122 | 122 |

### Metrik Kualitas

| Filter | PSNR (dB) | Similarity |
|--------|-----------|-----------|
| Averaging (3x3) | 41.70 | 0.9949 |
| **Gaussian (3x3)** | **43.88** | **0.9969** |
| Blur (5x5) | 41.63 | 0.9948 |

**Kesimpulan:** Gaussian filter memberikan hasil terbaik!

### Statistik Korelasi

- Sobel X: Range [-303, 289]
- Sobel Y: Range [-299, 291]
- Magnitude: Range [0, 334.57]

### Statistik Konvolusi

- Sobel X: Range [-289, 303]
- Sobel Y: Range [-291, 299]
- Laplacian: Range [-183, 212]

---

## 🔬 Analisis

### Korelasi vs Konvolusi

| Aspek | Korelasi | Konvolusi |
|-------|----------|-----------|
| Flip Kernel | Tidak | Ya (180°) |
| Pattern Matching | Baik | Baik |
| Edge Detection | Baik | Baik |
| Kernel Simetris | Hasil sama | Hasil sama |
| Kernel Asimetris | Berbeda | Berbeda |

### Efek Low Pass Filter

```
Brightness (Mean)   : Tetap stabil ✓
Detail (Std Dev)    : Berkurang ↓
Dynamic Range       : Berkurang ↓
Noise              : Berkurang ↓
Edge               : Melembut ↓
```

### Perbandingan Filter

- **Averaging**: Cepat, blur sedang
- **Gaussian**: Natural, blur optimal
- **Multi-pass**: Blur kuat, komputasi lebih
- **Kernel besar**: Blur lebih kuat, detail hilang

### Rekomendasi Penggunaan

| Kebutuhan | Filter | Kernel |
|-----------|--------|--------|
| Edge Detection | Sobel/Laplacian | 3x3 |
| Noise Reduction | Gaussian | 3x3 |
| Preprocessing | Averaging | 3x3 |
| Real-time | Averaging | 3x3 |
| Aesthetic Blur | Gaussian | 5x5-7x7 |

---

## 📈 Visualisasi Output

Program menghasilkan beberapa visualisasi:

1. **Citra Asli** - RGB dan Grayscale
2. **Kernel Visualization** - Heatmap setiap kernel
3. **Korelasi Results** - Sobel X, Y, dan Magnitude
4. **Konvolusi Results** - Sobel dan Laplacian
5. **Low Pass Filter** - Perbandingan berbagai kernel
6. **RGB Filtered** - Hasil pada citra berwarna
7. **Histogram** - Distribusi intensitas

---

## 🔧 Tips & Troubleshooting

### Q: Library tidak ter-install?
**A:** Gunakan pip dengan flag --upgrade
```bash
pip install --upgrade opencv-python numpy matplotlib scipy
```

### Q: Error "Citra tidak ditemukan"?
**A:** Pastikan file `citra-objek.jpg` ada di folder yang sama

### Q: Hasil blur terlalu kuat?
**A:** Gunakan kernel lebih kecil atau single-pass filter

### Q: Hasil blur terlalu lemah?
**A:** Gunakan kernel lebih besar atau multi-pass filtering

### Q: Memory error pada citra besar?
**A:** Gunakan grayscale atau resize citra terlebih dahulu

---

## 📚 Referensi

### Dokumentasi
- [OpenCV](https://opencv.org/)
- [NumPy](https://numpy.org/)
- [SciPy](https://scipy.org/)
- [Matplotlib](https://matplotlib.org/)

### Buku
1. Gonzalez & Woods - Digital Image Processing
2. Forsyth & Ponce - Computer Vision: A Modern Approach

### Paper
- Sobel Operator - Sobel, I. (1968)
- Laplacian Operator - Laplace, P. S. (1749)

---

## ✅ Checklist Praktikum

- [x] Import library dan setup
- [x] Pembacaan citra RGB dan grayscale
- [x] Pembuatan kernel (Sobel, Laplacian, LPF)
- [x] Implementasi korelasi
- [x] Implementasi konvolusi
- [x] Low pass filter (grayscale)
- [x] Low pass filter (RGB)
- [x] Analisis metrik
- [x] Visualisasi hasil
- [x] Dokumentasi lengkap

---

## 📄 Lisensi

Praktikum ini merupakan bagian dari kurikulum perguruan tinggi.

---

## 👨‍💻 Informasi Pengembang

**Program**: Computer Vision / Pengolahan Citra  
**Tingkat**: Intermediate  
**Durasi**: 1-2 jam  
**Last Updated**: 17 Maret 2026

---

## 📞 Support

Untuk pertanyaan atau masalah, silakan:
1. Baca file LAPORAN_PRAKTIKUM.md untuk detail lengkap
2. Baca komentar dalam code untuk penjelasan
3. Lihat visualisasi output untuk hasil

---

**Status: ✅ SELESAI**  
**Semua fungsi berfungsi dengan baik!**

