# Küçük Çiftlik Oyunu (Cow Edition)

## Oyun Hakkında

"Küçük Çiftlik Oyunu (Cow Edition)", oyuncuların tek bir ineği hayatta tutarak, süt üretimi ve puan kazanımı ile gerçek para elde etmelerini sağlayan bir çiftlik simülasyon oyunudur. Oyunun temel amacı, ineğin ölmesini engelleyerek sürekli gelir elde etmektir. Oyuncular, ineklerinin açlık ve sağlık durumlarını takip etmeli, onları beslemeli ve sütlerini satarak puan kazanmalıdır. Kazandıkları puanları kullanarak yem alabilir veya oyuna göndererek aylık reklam gelirinden pay alabilirler.

## Temel Özellikler

*   **Tek İnek Yönetimi:** Oyuncular, oyuna bir inek ile başlar ve onu hayatta tutmaya çalışır.
*   **Açlık ve Sağlık Takibi:** İneğin açlık ve sağlık durumları sürekli olarak takip edilmelidir.
*   **Besleme:** İneğin açlığını gidermek için envanterdeki yemler kullanılır.
*   **Süt Üretimi:** Açlığı giderilen inek süt üretir.
*   **Süt Satışı:** Üretilen sütler satılarak puan kazanılır.
*   **Puan Sistemi:** Kazanılan puanlarla yem alınabilir veya gerçek para kazanmak için oyuna gönderilebilir.
*   **Gerçek Para Kazanma:** Oyuncular, puanlarını oyuna göndererek aylık reklam gelirinden pay alırlar.
*   **Kullanıcı Dostu Arayüz:** Oyuncuların oyunu kolayca anlaması ve oynaması için basit ve sezgisel bir arayüz.

## Oyun Mekaniği

1.  **İnek Bakımı:** Oyuncular, ineklerinin açlık ve sağlık durumlarını takip ederler.
2.  **Açlık Yönetimi:**
    *   İneğin açlığı %100'den %0'a düşmesi 240 dakikada gerçekleşir.
    *   Açlık %0 olduğunda, ineğin sağlığı her dakika azalmaya başlar.
    *   Oyuncular, envanterdeki yemlerle ineği beslerler.
    *   1 yem, açlığı %25 doldurur. Toplam 4 yem ile açlık %100 olur.
3.  **Sağlık Yönetimi:**
    *   İneğin sağlığı başlangıçta %100'dür.
    *   Açlık bittiğinde sağlık azalmaya başlar.
    *   Sağlık azaldığında iyileştirilemez.
4.  **Süt Üretimi:**
    *   İneğin açlığı %100 olduğunda her dakika süt üretir.
5.  **Ticaret:**
    *   Oyuncular, sütlerini satarak puan kazanırlar.
    *   Puanlarla marketten yem alınabilir veya puanlar oyuna gönderilerek gerçek para (TL) kazanılabilir.
6.  **Puan Sistemi:**
    *   Süt satışı ile puan kazanılır.
    *   Puanlar ile marketten yem alınabilir.
    *   Puanlar oyuna gönderilerek, o ayki reklam gelirinden pay alınabilir.
    *   İnek ölürse, tüm puanlar, süt ve oyuna gönderilen puanlar silinir.
    *   İnek canlandırılabilir ama daha önce gönderilen puanlar geri gelmez. Yeni kazançlarla tekrar para kazanılabilir.
7.  **Gerçek Para Kazanma:**
    *   Oyuncular, kazandıkları puanları oyun içi hesaba göndererek, aylık reklam gelirinden pay alırlar.
    *   Reklam gelirinden alınacak pay, gönderilen puanların toplam puanlara oranı ile belirlenir.
    *   Kazançlar, bir sonraki ayın 3. gününde oyun içi hesaba yansır.
    *   Oyuncular, oyun içi hesaplarındaki para minimum çekim limitine ulaştığında, istedikleri zaman para çekme talebinde bulunabilir.
    *   Ödemeler, her ayın 25. günü yapılır.

## Kullanıcı Arayüzü (UI)

*   **Genel Tasarım:** Sevimli, kullanıcı dostu ve rahatlatıcı bir çiftlik teması.
*   **İnek Durumu:**
    *   İnek sağlık göstergesi (yüzdelik olarak).progress bar olarak gösterilebilir.
    *   İnek açlık göstergesi (yüzdelik olarak).progress bar olarak gösterilebilir.
*   **Süt Satma Butonu:**
    *   Üzerinde "Sütü Sat" metni ve parantez içinde o ana kadar üretilmiş süt miktarı (litre cinsinden) gösterilir. (Örneğin: "Sütü Sat (151.25 Litre)")
*   **Envanter:** Yem stoğunu gösterir.
*   **Market:** Yem satın alma ekranı. Yem çeşitleri için örnek: ürün adı Grass:verim:0.15lt/1Dk., Enerji %25, seviye:1
*   **Puan ve Gelir Bilgileri:** Oyun içi puanlar, gerçek para (TL) ve diğer finansal bilgiler gösterilir. oyun içi genel istatistik sayfası tasarlanacak. oyuncular birbirlerinin ne kadar puan gönderdiğini görebilmeli kendi sıralamalarını kontrol edebilmeliler.
*   **Para Çekme Butonu:** Oyun içi hesaptan para çekme talebi gönderme butonu.
*   **oyun nasıl oynanır sayfası tasarımı: statik olarak bir sayfa tasarlanacak. burada anlatılan oyun  mekaniği hakkında bilgiler yer alacak.


## Teknik Bilgiler

*   **Programlama Dili (Frontend):** React
*   **Programlama Dili (Backend):** Node.js (TypeScript)
*   **Veritabanı:** (Kullanıcı verileri, puanlar, gelir takibi için gerekli) - PostgreSQL veya MongoDB düşünülebilir. Başlangıç için veriler dummy data ile json olarak tutulabilir. oyun mekaniği tam olarak oturduktan sonra uygun veriltabanına geçilebilir.
// *   **Gerçek Para Entegrasyonu:** (Ödeme sistemleri ile entegrasyon) - Stripe, PayPal veya diğer ödeme API'leri
// *   **Sunucu:** (Puan ve reklam gelirlerinin takibi için gerekli) - AWS, Google Cloud, Azure veya özel sunucu

## Backend API Tasarımı ve Önerileri

*   **API Mimarisi:** RESTful API
*   **API Endpointleri:**
    *   `POST /auth/register`: Kullanıcı kaydı.
    *   `POST /auth/login`: Kullanıcı girişi (authentication).
    *   `GET /user`: Kullanıcı bilgilerini alma.
    *   `GET /cow`: İnek verilerini (sağlık, açlık) alma.
    *   `PUT /cow`: İnek verilerini güncelleme.
    *   `GET /inventory`: Envanteri alma.
    *   `PUT /inventory`: Envanteri güncelleme (yem kullanma).
    *   `GET /market`: Market verilerini alma.
    *   `POST /market/buy`: Yem satın alma.
    *   `POST /milk/sell`: Süt satma.
    *   `POST /points/transfer`: Puan gönderme.
    *   `GET /transactions`: Kullanıcı işlem geçmişini alma.
*   **Öneriler:**
    *   **Authentication:** JWT (JSON Web Tokens) tabanlı authentication kullanılabilir.
    *   **Veritabanı:** PostgreSQL veya MongoDB, proje gereksinimlerine göre seçilebilir.
    *   **Gerçek Para Entegrasyonu:** Stripe, PayPal gibi bir ödeme API'si entegrasyonu yapılabilir.
    *   **Sunucu:** AWS, Google Cloud, Azure veya özel sunucu kullanılabilir.
    *   **Güvenlik:** API güvenliği için gerekli önlemler alınmalıdır (veri şifreleme, yetkilendirme vb.).

## Gelecek Özellikler

*   Farklı yem çeşitleri ve verimlilikleri
*   İneğin genetik özellikleri ve süt verimi
*   Sosyal özellikler
*   Daha fazla oyun içi etkinlikler
*   Mobil optimizasyon

## Nasıl Katkıda Bulunabilirsiniz?

*   Geri bildirimlerinizle oyunu geliştirmemize yardımcı olabilirsiniz.
*   Oyunun geliştirme sürecine katılarak yeni özellikler ekleyebilir veya hataları düzeltebilirsiniz.

## İletişim

(İletişim bilgilerinizi buraya ekleyin)

# Oyun Kuralları

## Temel Kurallar
- Oyuna 1 inek ile başlarsınız ve her ayın son gününe kadar (23:59'a kadar) ineğinizi hayatta tutmalısınız.
- İneğinizin sağlığı başlangıçta %100'dür ve 5.040 dakika boyunca devam eder.
- İneğin açlığı %100'den başlar ve 240 dakika içinde %0'a düşer.
- Açlık %0'a düştüğünde, ineğin sağlığı her dakika azalmaya başlar.
- Sağlık azaldığında tekrar iyileştirilemez.
- İneğinizi açlığı bitmeden önce envanterdeki yemlerle beslemelisiniz.
- Her yem kullanımı açlığı %25 artırır. Toplam 4 yem ile açlık %100 olur.
- İnek tok olduğunda (açlık %100), her dakika süt üretimi yapar.
- Üretilen sütü satarak puan kazanabilirsiniz.

## Yem Çeşitleri ve Özellikleri
- Standart Yem: %25 enerji, 0.15L/dk süt verimi
- Premium Yem: %35 enerji, 0.25L/dk süt verimi
- Süper Yem: %50 enerji, 0.40L/dk süt verimi

## Puan Sistemi
- Süt satışından kazandığınız puanlarla yem satın alabilirsiniz.
- Puanlarınızı oyuna göndererek aylık reklam gelirinden pay alabilirsiniz.
- İnek öldüğünde tüm puanlar ve gönderilen puanlar sıfırlanır.
- İneği canlandırabilirsiniz ancak gönderilen puanlar geri gelmez.

## Kazanç Sıralaması
- Kazanç sıralaması sonuçları her ayın 3. gününde açıklanır.

## Oyun Sıfırlama
Her ayın ilk günü saat 00:00'da tüm üyeler için aşağıdaki işlemler gerçekleştirilir:
- İneğin sağlığı %100'e çıkarılır
- Tüm puanlar sıfırlanır
- Tüm süt miktarı sıfırlanır
- Sistem döngü kilitlenmesini önlemek için tüm kullanıcılara 450 puan eklenir
- Kazançlar (TL), Seviyeler, XP ve Yemler kalıcıdır

## Seviye Sistemi
Oyunda seviye sistemi aşağıdaki gibi ilerler:
- Level 1: 0 XP
- Level 2: 2.000 XP
- Level 3: 10.000 XP
- Level 4: 80.000 XP
- Level 5: 175.000 XP
- Level 6: 420.000 XP
- Level 7: 800.000 XP
- Level 8: 2.000.000 XP
- Level 9: 5.000.000 XP
- Level 10: 10.000.000 XP
- Level 11: 15.000.000 XP
- Level 12: 20.000.000 XP
- Level 13: 25.000.000 XP
- Level 14: 30.000.000 XP
- Level 15: 45.000.000 XP
- Level 16: 80.000.000 XP

Her seviye atladığınızda markette yeni ve daha verimli ürünler açılır. Seviye atlamak için süt satışı yapmanız ve XP kazanmanız gerekir. Her 1 litre süt satışı size 100 XP kazandırır. XP ve seviyeler kalıcıdır, oyun sıfırlansa bile korunur.

## Referans Sistemi
- Referans linkiniz üzerinden 1 ziyaretçi kayıt olduğunda referansınız olur.
- Referans olduğunuz üyenin her süt satışından kazandığı toplam puanların %3'ü kadar puan kazanırsınız.
  Örnek: Referansınız 100 puanlık süt satışı yaptığında, %3'ü olan 3 puan size eklenir.
- Referansınız kayıt olduktan sonra 25 gün geçerlidir. Süre dolduğunda referans geçerliliğiniz sona erer.

## İnek Yaşam Döngüsü
İnek yaşam döngüsü aşağıdaki oranlara göre çalışır:
- İnek yemlenmediğinde açlık oranı 240 dakikada %0'a düşer
- Açlık %0 olduğunda, inek 5.040 dakika içinde ölür
- Her dakikada:
  - Sağlık %0.02 azalır (1 saatte %1.19, 1 günde %28.57)
  - Açlık %0.42 azalır (1 saatte %25)

## Puan Gönderme Sistemi
- Minimum puan gönderme limiti 5.000 puandır
- Puanlarınızı her ayın son günü saat 23:59'a kadar gönderebilirsiniz
- O ay içinde puan gönderimi yaparsanız, ayın reklam gelirlerinden pay alırsınız
- Gönderilen puan miktarına göre reklam gelirinden alacağınız pay belirlenir
- En çok puan gönderen kişi, reklam gelirinin en büyük payını alır

## Yem Çeşitleri ve Seviyeleri
Her ürünün kendine özel seviyesi ve verimliliği vardır. Ürünler ilgili seviyeye ulaştığınızda aktif olur.

| Yem Adı    | Enerji | Verim (Lt/dk) | Fiyat (Puan) |
|------------|--------|---------------|--------------|
| Çim        | %25    | 0.15         | 450          |
| Yaprak     | %25    | 0.18         | 540          |
| Buğday     | %25    | 0.21         | 630          |
| Ayçiçeği   | %25    | 0.24         | 720          |
| Mısır      | %25    | 0.27         | 810          |
| Karpuz     | %25    | 0.30         | 900          |
| Havuç      | %25    | 0.33         | 990          |
| Patlıcan   | %25    | 0.36         | 1080         |
| Elma       | %25    | 0.39         | 1170         |
| Kiraz      | %25    | 0.43         | 1290         |
| Üzüm       | %25    | 0.47         | 1410         |
| Lahana     | %25    | 0.50         | 1500         |
| Şeftali    | %25    | 0.53         | 1590         |
| Balkabağı  | %25    | 0.56         | 1680         |
| Biber      | %25    | 0.59         | 1770         |
| Limon      | %25    | 0.62         | 1860         |