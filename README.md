# Personel Transfer Sistemi

Bu proje, personel transfer işlemlerini yönetmek için geliştirilmiş modern bir web uygulamasıdır. React ve Vite kullanılarak oluşturulmuştur.

## 🚀 Özellikler

- Modern ve kullanıcı dostu arayüz
- Responsive tasarım
- Bootstrap ve React Bootstrap entegrasyonu
- Toast bildirimleri
- React Router ile sayfa yönetimi
- İkon desteği (Bootstrap Icons, React Icons, SVGrepo)

## 🛠️ Teknolojiler

- React 19
- Vite 6
- Bootstrap 5
- React Router DOM 7
- React Toastify
- ESLint

## 📦 Kurulum

1. Projeyi klonlayın:
```bash
git clone [proje-url]
```

2. Proje dizinine gidin:
```bash
cd personel-transfers
```

3. Bağımlılıkları yükleyin:
```bash
npm install
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## 🏗️ Proje Yapısı

```
src/
├── assets/        # Statik dosyalar (resimler, fontlar vb.)
├── components/    # Yeniden kullanılabilir bileşenler
├── data/         # Veri dosyaları
├── pages/        # Sayfa bileşenleri
├── views/        # Görünüm bileşenleri
├── App.jsx       # Ana uygulama bileşeni
├── main.jsx      # Uygulama giriş noktası
└── index.css     # Global stil dosyası
```

## 🚀 Kullanılabilir Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır
- `npm run build`: Projeyi production için derler
- `npm run preview`: Derlenmiş projeyi önizleme
- `npm run lint`: ESLint ile kod kontrolü

## 🔧 Geliştirme

1. Yeni bir özellik eklemek için:
   - İlgili bileşeni `components/` dizinine ekleyin
   - Gerekirse yeni bir sayfa oluşturun
   - Stil dosyalarını güncelleyin

2. Kod kalitesi için:
   - ESLint kurallarına uyun
   - Bileşenleri modüler tutun
   - Props ve state yönetimini dikkatli yapın

## 📝 Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.

## 👥 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📋 Proje Detayları

### 🎯 Temel Özellikler ve Modüller

1. **Personel Bilgi Yönetimi**
   - Personel detaylı bilgi görüntüleme
   - Eğitim bilgileri yönetimi
   - Aile bilgileri yönetimi
   - Tercih bilgileri yönetimi

2. **Transfer İşlemleri**
   - Transfer talebi oluşturma
   - Transfer nedenleri yönetimi
   - Kararname işlemleri
   - Transfer durumu takibi

3. **Bildirim Sistemi**
   - Alert bildirimleri
   - Mesaj bildirimleri
   - Başarı bildirimleri
   - Mobil uyumlu bildirimler

4. **Arayüz Bileşenleri**
   - Responsive tasarım
   - Modal pencereler
   - Sekme tabanlı arayüzler
   - Özel butonlar ve formlar

### 🔄 İş Akışı

1. **Personel Girişi**
   - Personel bilgilerinin görüntülenmesi
   - Eğitim ve aile bilgilerinin yönetimi
   - Tercih bilgilerinin güncellenmesi

2. **Transfer Süreci**
   - Transfer talebi oluşturma
   - Transfer nedenlerinin belirtilmesi
   - Kararname işlemlerinin yönetimi
   - Transfer durumunun takibi

3. **Bildirim Yönetimi**
   - Sistem bildirimlerinin görüntülenmesi
   - Mesajların yönetimi
   - Alert bildirimlerinin takibi

### 🎨 Kullanıcı Arayüzü

1. **Ana Bileşenler**
   - `PersonnelInfo`: Personel bilgi görüntüleme
   - `TransferModal`: Transfer işlemleri
   - `PreferenceModal`: Tercih yönetimi
   - `AlertModal`: Bildirim yönetimi

2. **Yardımcı Bileşenler**
   - `CircleButton`: Özel buton tasarımı
   - `ModalTabs`: Sekme tabanlı arayüz
   - `MobileSearchModal`: Mobil arama
   - `SuccessModal`: Başarı bildirimleri

3. **Stil ve Tasarım**
   - Bootstrap tabanlı responsive tasarım
   - Özel CSS modülleri
   - Modern ve kullanıcı dostu arayüz
   - Mobil uyumlu bileşenler

### 🔒 Güvenlik ve Doğrulama

1. **Kullanıcı Doğrulama**
   - Güvenlik modalı
   - Şifre sıfırlama
   - Oturum yönetimi

2. **Veri Doğrulama**
   - Form doğrulamaları
   - Veri bütünlüğü kontrolleri
   - Hata yönetimi

### 📱 Mobil Uyumluluk

- Responsive tasarım
- Mobil özel bileşenler
- Touch-friendly arayüz
- Mobil bildirimler
