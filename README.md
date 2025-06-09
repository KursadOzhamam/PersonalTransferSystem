# Personel Transfer Sistemi

Bu proje, **personel tayin işlemlerinin yönetimini kolaylaştırmak** amacıyla **AYEP programı** çerçevesinde geliştirilmiş modern ve kullanıcı odaklı bir **web uygulamasıdır**.

Tayin talebinde bulunan personelin, **anlaşılır ve sade bir arayüz (UI/UX)** ile işlemlerini hızlı, rahat ve adım adım gerçekleştirebilmesi hedeflenmiştir.

Uygulama, **React**, **Vite.js**, **Bootstrap 5**, **React Router DOM v7**, **React Toastify** ve **ESLint** gibi modern teknolojiler kullanılarak geliştirilmiştir. Bu sayede sadece kullanıcı dostu bir deneyim sunulmakla kalmayıp, aynı zamanda **tayin taleplerinin dijital ortamda iletilmesi**, ilgili birimlerce **görüntülenmesi**, **onaylanması veya reddedilmesi** gibi süreçler de eksiksiz şekilde dijitalleştirilmiştir.

Ayrıca yöneticiler tarafından sonuçlandırılan talepler, kullanıcılara **dinamik bildirim alanları** üzerinden iletilerek sistemin işlevselliği artırılmıştır. Tüm tasarım, **responsive** prensiplere uygun biçimde hazırlanmış ve böylece masaüstü, tablet ve mobil cihazlarda sorunsuz kullanım sağlanmıştır.

Proje kapsamında ayrıca **izin talepleri ekranı**, **profil görüntüleme**, **sidebar navigasyonu** gibi modüller de hazırlanmıştır. Ancak odak noktası **tayin talep süreci** olduğu için bu modüller temel bir yapıda bırakılmış, işlevsellik öncelikli olarak tayin sürecine verilmiştir. 

---

## 🔑 Giriş Bilgileri

### 👤 Kullanıcı Girişi
- **Sicil No:** 123456 
- **Şifre:** Admin148*

### 👨‍💼 Yönetici Girişi
- **e-mail:** admin@admin.com
- **Şifre:** admin123

### 🔄 Şifremi Unuttum
- **Telefon Numarası:** 1234567890
- **Doğrulama Kodu:** 123456

---

## 🚀 Özellikler

- Modern ve responsive kullanıcı arayüzü  
- Tayin talebi oluşturma, gerekçe seçimi ve tercih işlemleri  
- Bildirim sistemi ile kullanıcı bilgilendirmesi  
- Yöneticiler için onaylama, reddetme ve sonuçlandırma modülleri  
- React Router ile çoklu sayfa yönetimi  
- Bootstrap tabanlı tasarım altyapısı  
- Mobil uyumlu ve sade kullanıcı deneyimi  

---

## 🛠️ Kullanılan Teknolojiler

- **React 19**  
- **Vite 6**  
- **Bootstrap 5**  
- **React Router DOM v7**  
- **React Toastify**  
- **ESLint**

---

## 📦 Kurulum

```bash
git clone [proje-url]
cd personel-transfers
npm install
npm run dev
```

---

## 🏗️ Proje Yapısı

```
src/
├── assets/          # İkonlar ve görseller
├── components/      # Ortak bileşenler
├── data/            # JSON veri dosyaları
├── pages/           # Giriş, şifre sıfırlama vb. sayfalar
├── views/           # Profil, talepler, izinler vb.
├── App.jsx          # Ana bileşen
├── main.jsx         # Başlatıcı dosya
└── index.css        # Global stiller
```

---

## 🚀 Kullanılabilir Komutlar

| Komut            | Açıklama                            |
|------------------|--------------------------------------|
| `npm run dev`    | Geliştirme sunucusunu başlatır       |
| `npm run build`  | Production için projeyi derler       |
| `npm run preview`| Derlenmiş projeyi önizler            |
| `npm run lint`   | ESLint ile kod kalitesi kontrolü     |

---

## 🧩 Ana Modüller

### 👤 Personel Bilgi Yönetimi
- Detaylı profil bilgisi
- Eğitim, aile ve tercih bilgileri

### 🔄 Transfer Süreci
- Tayin talebi oluşturma
- Gerekçe ve kararname seçimi
- Tercih bilgileri yönetimi
- Talep durumu takibi

### 🔔 Bildirimler
- Başarı ve hata bildirimleri
- Yönetici onay/ret bildirimi
- Mobil uyumlu toast mesajları

### 💻 Arayüz Bileşenleri
- `PersonnelInfo`, `TransferModal`, `PreferenceModal`, `SuccessModal`, `AlertModal`  
- `CircleButton`, `ModalTabs`, `MobileSearchModal`

---

## 📱 Mobil Uyumluluk

- Responsive tasarım  
- Dokunmatik uyumlu bileşenler  
- Her ekran boyutunda erişilebilir yapı  

---

## 📋 Katkıda Bulunma

1. Fork'layın  
2. Yeni bir branch oluşturun: `git checkout -b feature/ozellik`  
3. Commit yapın: `git commit -m 'feat: yeni özellik'`  
4. Branch'i push edin: `git push origin feature/ozellik`  
5. Pull Request gönderin  
