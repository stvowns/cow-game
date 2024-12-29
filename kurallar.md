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
    *   İneğin açlığı 240 dakikada %100'den %0'a düşer.
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