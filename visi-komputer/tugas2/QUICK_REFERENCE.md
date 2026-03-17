# QUICK REFERENCE - Korelasi, Konvolusi, Low Pass Filter

## 🎯 Ringkasan Cepat

### Definisi

| Operasi | Rumus | Kernel | Kegunaan |
|---------|-------|--------|----------|
| **Korelasi** | $r(x,y) = \sum f(x+i,y+j) \times h(i,j)$ | Tidak di-flip | Pattern matching |
| **Konvolusi** | $g(x,y) = \sum f(x+i,y+j) \times h(-i,-j)$ | Di-flip 180° | Filtering, DSP |
| **LPF** | Rata-rata tetangga | Positif semua | Blur, smoothing |

---

## 📐 Kernel Standar

### Sobel X (Edge Vertikal)
```
[-1  0  1]
[-2  0  2]
[-1  0  1]
```

### Sobel Y (Edge Horizontal)
```
[-1 -2 -1]
[ 0  0  0]
[ 1  2  1]
```

### Averaging (3x3)
```
[1 1 1]  /9
[1 1 1]
[1 1 1]
```

### Gaussian (3x3)
```
[1 2 1]  /16
[2 4 2]
[1 2 1]
```

### Laplacian (Edge 2nd Derivative)
```
[ 0 -1  0]
[-1  4 -1]
[ 0 -1  0]
```

---

## 💻 Kode Penting

### Import
```python
import cv2, numpy as np
from scipy.ndimage import correlate, convolve
```

### Korelasi
```python
result = correlate(image.astype(np.float32), kernel, mode='reflect')
```

### Konvolusi
```python
result = convolve(image.astype(np.float32), kernel, mode='reflect')
```

### Blur dengan OpenCV
```python
blur3 = cv2.blur(image, (3, 3))
blur5 = cv2.blur(image, (5, 5))
gaussian = cv2.GaussianBlur(image, (3, 3), 1.0)
```

### Edge Detection
```python
edges = cv2.Canny(image, 100, 200)
```

---

## 📊 Hasil pada Citra 400x400

### Korelasi Sobel
- Range X: [-303, 289]
- Range Y: [-299, 291]
- Magnitude: [0, 334.57]

### Low Pass Filter
| Filter | Mean | Std Dev | PSNR |
|--------|------|---------|------|
| Original | 94.50 | 20.74 | - |
| Averaging | 94.48 | 20.53 | 41.70 |
| Gaussian | 94.48 | 20.57 | **43.88** |
| Blur 5x5 | 94.50 | 20.53 | 41.63 |

---

## ⚙️ Parameter Penting

### Mode Padding
- `'reflect'` - Cerminkan pixel (recommended)
- `'constant'` - Tambah 0
- `'nearest'` - Ulangi edge

### Normalisasi
```python
# Min-max normalization
normalized = (arr - arr.min()) / (arr.max() - arr.min()) * 255

# Clip to 0-255
clipped = np.clip(arr, 0, 255).astype(np.uint8)
```

### Channel Separation RGB
```python
r = image[:, :, 0]
g = image[:, :, 1]
b = image[:, :, 2]

# Gabung kembali
rgb = np.stack([r, g, b], axis=2)
```

---

## 🎬 Workflow Standar

```
1. Import Library
   ↓
2. Baca Citra
   ↓
3. Buat Kernel
   ↓
4. Korelasi / Konvolusi
   ↓
5. Normalisasi & Clip
   ↓
6. Visualisasi
   ↓
7. Analisis Metrik
```

---

## 📈 Metrik Penting

### PSNR (Signal Quality)
```
PSNR = 20 * log10(255 / √MSE)  [dB]
Range: 0-100 (lebih tinggi = lebih bagus)
```

### Similarity (Correlation)
```
ρ = Σ(xi - x̄)(yi - ȳ) / √[Σ(xi-x̄)² Σ(yi-ȳ)²]
Range: -1 hingga +1
```

### Contrast (Std Dev)
```
σ = √[Σ(x - μ)² / N]
Lebih tinggi = lebih banyak detail
```

---

## ✅ Checklist

Saat mengerjakan:
- [ ] Library sudah ter-import
- [ ] Citra sudah dibaca
- [ ] Kernel sudah dibuat
- [ ] Data type: float32 untuk perhitungan
- [ ] Mode padding: 'reflect'
- [ ] Normalisasi ke 0-255
- [ ] Clip value menggunakan np.clip()
- [ ] Visualisasi dengan matplotlib
- [ ] Analisis metrik

---

## 🚀 Tips Optimasi

### Kecepatan
- Gunakan kernel kecil (3x3)
- Gunakan mode='reflect'
- Batches processing untuk banyak citra

### Kualitas
- Gaussian filter lebih baik dari averaging
- Multi-pass untuk blur lebih kuat
- Edge detection dengan Laplacian lebih tajam

### Memory
- Convert ke grayscale jika tidak perlu RGB
- Resize citra jika terlalu besar
- Gunakan dtype yang tepat

---

## ⚠️ Common Mistakes

❌ Lupa convert ke float32
```python
correlate(image, kernel)  # SALAH
correlate(image.astype(np.float32), kernel)  # BENAR
```

❌ Lupa normalisasi hasil
```python
result = correlate(...)  # Bisa diluar 0-255
result = np.clip(result, 0, 255).astype(uint8)  # BENAR
```

❌ Kernel tidak dinormalisasi
```python
kernel_lowpass = np.array([[1,1,1],[1,1,1],[1,1,1]]) / 9.0  # BENAR
```

❌ Lupa convert BGR to RGB
```python
image_bgr = cv2.imread('file.jpg')  # BGR
image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)  # RGB
```

---

## 📱 Untuk Berbagai Kebutuhan

### Object Detection
→ Gunakan Sobel / Canny

### Denoise Image
→ Gunakan Gaussian Blur (3x3)

### Aesthetic Blur (Portrait Mode)
→ Gunakan Gaussian Blur (5x5 - 7x7)

### Preprocessing
→ Gunakan Low Pass Filter (3x3)

### Edge Detection
→ Gunakan Sobel / Laplacian / Canny

### Smoothing
→ Gunakan Averaging atau Gaussian

---

## 🎓 Konsep Penting

### Low Frequency vs High Frequency
- **Low**: Area datar, tidak banyak perubahan
- **High**: Detail, noise, edge, tekstur

### Low Pass Filter
- Melewatkan frekuensi rendah
- Memblokir frekuensi tinggi
- Efek: Blur, smoothing, noise reduction

### High Pass Filter
- Melewatkan frekuensi tinggi
- Memblokir frekuensi rendah
- Efek: Edge enhancement, sharpening

### Frequency Domain vs Spatial Domain
- **Frequency**: Lebih cepat untuk operasi besar
- **Spatial**: Lebih intuitif, kernel lebih jelas

---

## 📚 Formula Penting

### Magnitude Calculation
$$M = \sqrt{G_x^2 + G_y^2}$$

### Direction of Gradient
$$θ = \arctan\left(\frac{G_y}{G_x}\right)$$

### Normalization
$$x_{norm} = \frac{x - x_{min}}{x_{max} - x_{min}} \times 255$$

### Gaussian Distribution (1D)
$$G(x) = \frac{1}{\sqrt{2πσ^2}} e^{-\frac{x^2}{2σ^2}}$$

---

**Print halaman ini untuk referensi cepat! 📋**

