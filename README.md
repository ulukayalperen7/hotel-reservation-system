# hotel-reservation-system
# Proje Analizi ve Spesifikasyon Dokümanı: Multi-Tenant Otel Rezervasyon Platformu

## 1. Proje Vizyonu ve Kapsamı

Bu doküman, Elektrwaweb Talya Bilişim bünyesinde geliştirilecek olan, birden fazla otelin kayıt olarak kendi envanterlerini, fiyatlarını ve rezervasyonlarını yönetebileceği **Multi-Tenant (Çok Kiracılı) bir Otel Rezervasyon Platformu**'nun analizini ve teknik yol haritasını içerir.

Projenin temel vizyonu, hem son kullanıcıya zengin filtreleme ve keşif araçlarıyla kişiselleştirilmiş bir deneyim sunmak hem de otel işletmelerine kendi operasyonlarını yönetecekleri ve pazarlayacakları güçlü bir panel sağlamaktır.

## 2. Platformun Ana Sistemleri

Platform, birbiriyle entegre çalışan modüler sistemler üzerine inşa edilecektir:

#### Sistem 1: Kullanıcı ve Kimlik Yönetim Sistemi
Bu sistem, platforma giren her aktörün kimliğini, rolünü ve yetkilerini yönetir.
*   **Temel Kimlik Doğrulama:** E-posta/Şifre ile Kayıt, Giriş, Çıkış, Şifre Sıfırlama.
*   **Rol Tabanlı Yetkilendirme (RBAC):**
    *   **Müşteri (Customer):** Otel arama, rezervasyon yapma ve kendi profilini yönetme yetkisine sahiptir.
    *   **Otel Yöneticisi (Hotel Admin):** Yalnızca kendi oteline ait içerik, oda, fiyat ve rezervasyonları yönetir.
    *   **Platform Yöneticisi (Super Admin):** Tüm sistemi denetler ve yeni otel kayıtlarını onaylar.
*   **Kullanıcı Profili:** Kişisel bilgiler, geçmiş/gelecek rezervasyonlar ve favoriye eklenen otellerin listesi.
*   **(Öneri) Sosyal Medya ile Giriş:** Google/Facebook entegrasyonu ile hızlı kayıt/giriş.

#### Sistem 2: Otel ve İçerik Yönetim Sistemi
Otel yöneticilerinin platformdaki dijital vitrinlerini oluşturup yönettikleri alandır.
*   **Otel Profili:** Otel adı, yıldız sayısı, açıklama, adres ve iletişim bilgileri.
*   **Coğrafi Konum (Geolocation):** Harita üzerinde gösterim için otelin enlem ve boylam bilgisinin kaydedilmesi.
*   **Oda Yönetimi:** Farklı oda tipleri (örn: Süit, Standart) ve bu tiplere bağlı fiziksel oda envanterinin (Oda No: 101, 102 vb.) yönetimi.
*   **Görsel Yönetimi:** Otel ve oda galerileri için fotoğraf yükleme ve yönetimi.
*   **İmkan ve Olanak Yönetimi (Amenities):** Otel yöneticisinin, platformda tanımlı olan `[Havuz, Spa, Wifi, Otopark, Restoran]` gibi imkanlardan kendi tesisinde olanları işaretleyerek profilini zenginleştirmesi.

#### Sistem 3: Arama, Keşif ve Filtreleme Motoru
Platformun kullanıcıya dönük en akıllı ve dinamik parçasıdır.
*   **Ana Arama:** Konum, giriş/çıkış tarihi ve misafir sayısına göre arama.
*   **Detaylı Filtreleme:**
    *   Fiyat Aralığı (Min-Max Slider).
    *   Otel Yıldız Sayısı.
    *   Pansiyon Tipi (Her Şey Dahil, Oda Kahvaltı vb.).
    *   Tesis İmkanları (Kullanıcı, "Havuz" ve "Spa" seçerek sadece bu imkanlara sahip otelleri listeler).
    *   Misafir Değerlendirme Puanı.
*   **Sonuç Gösterimi:** Hem klasik liste görünümü hem de filtrelenmiş sonuçların gösterildiği interaktif bir harita görünümü.

#### Sistem 4: Değerlendirme ve Yorum Sistemi
Platformun güvenilirliğini ve şeffaflığını sağlayan sosyal kanıt mekanizmasıdır.
*   **Puanlama:** Genel puana ek olarak Temizlik, Personel, Konum gibi alt kategorilerde puanlama.
*   **Güvenlik:** **Yalnızca "Onaylı Konaklama" yapmış kullanıcıların** yorum ve puanlama yapabilmesi.
*   **Etkileşim:** Otel yöneticisinin, yapılan yorumlara herkese açık olarak cevap verebilmesi.

#### Sistem 5: Rezervasyon ve Fiyatlandırma Motoru
Platformun ticari işlemlerinin ve en karmaşık iş mantığının yönetildiği çekirdek sistemdir.
*   **Anlık Müsaitlik Kontrolü:** Seçilen tarihlerde bir odanın rezerve edilebilir olup olmadığının anlık kontrolü.
*   **Dinamik Fiyatlandırma:** Oda temel fiyatına ek olarak, otel yöneticisinin tanımlayabileceği kurallara göre fiyatın dinamik olarak hesaplanması (örn: Sezon, hafta sonu, uzun konaklama indirimleri).
*   **Rezervasyon Akışı:** Oda seçimi, fiyat dökümünün şeffaf gösterimi, misafir bilgileri ve ödeme simülasyonu ile rezervasyonun tamamlanması.

## 3. Proje Fazları ve Geliştirme Stratejisi

Projenin büyüklüğü göz önüne alındığında, özellikler mantıksal fazlara ayrılmıştır. 4 haftalık staj sürecinde **Faz 1'in tamamlanması ana hedeftir.**

#### FAZ 1: MVP (Minimum Viable Product - Staj Hedefi)
- [ ] **Kullanıcı Sistemi:** Müşteri ve Otel Yöneticisi rolleriyle kayıt/giriş.
- [ ] **Otel Yönetimi:** Otel yöneticisinin kendi otelini, odalarını ve temel fiyatını ekleyebilmesi.
- [ ] **Temel Arama:** Müşterinin konum ve tarihe göre otel arayabilmesi.
- [ ] **Rezervasyon Akışı:** Müşterinin bir odaya rezervasyon yapabilmesi.
- [ ] **Temel Değerlendirme:** Konaklama sonrası müşterinin puan/yorum bırakabilmesi.

#### FAZ 2: Gelişmiş Özellikler (Platformun Olgunlaşması)
- [ ] Gelişmiş Filtreleme Motoru (imkanlar, yıldız, fiyat aralığı).
- [ ] Favorilere Ekleme Sistemi ve Kullanıcı Profili.
- [ ] Harita Üzerinde Otelleri Gösterme.
- [ ] Kural Tabanlı Dinamik Fiyatlandırma Motoru.

#### FAZ 3: Stratejik Vizyon (Gelecek Potansiyeli)
- [ ] Akıllı Otel Karşılaştırma Aracı.
- [ ] Fiyat Takibi ve Alarm Kurma Özelliği.
- [ ] Kişiselleştirilmiş Öneri Motoru.
- [ ] Otel Yöneticileri için Analitik Raporlama Paneli.
- [ ] Promosyon Kodu ve Reklam Modülleri.
- [ ] Misafir-Otel Arası Direkt Mesajlaşma.

## 4. Teknik Mimarî ve Geliştirme Yaklaşımı

*   **Geliştirme Yaklaşımı: Backend-First**
    *   Öncelikle projenin tüm iş mantığını barındıran API altyapısı tasarlanacak, kodlanacak ve test edilecektir. Sağlam bir backend temeli oluşturulduktan sonra ön yüz geliştirmesi daha verimli ilerleyecektir.

*   **Teknoloji Yığını (Tech Stack):**
    *   **Backend:** Node.js
    *   **Framework:** Express.js
    *   **Veritabanı:** PostgreSQL
    *   **Temel Kütüphaneler:** `pg` (veya Sequelize), `bcryptjs`, `jsonwebtoken`, `cors`, `dotenv`.

*   **Kavramsal Veritabanı Mimarisi:**
    *   Sistem, veriler arasındaki karmaşık ve çok-çok'a (many-to-many) ilişkileri yönetmek üzere tasarlanacaktır. `hotels`, `users`, `rooms` gibi ana tablolara ek olarak; imkanları otellerle eşleştiren `hotel_amenities`, favorileri kullanıcılarla eşleştiren `user_favorites` ve fiyatlandırma kurallarını tutan `pricing_rules` gibi birçok ilişkisel ve detay tablosu kullanılacaktır.
