# kitapsepeti

Bu projenin amacı, bir kullanıcının Kitapsepeti.com E-Ticaret Sitesi alışveriş deneyimini kesintisiz ve güvenli şekilde tamamlayabilmesini sağlayan kritik akışları test etmektir.

PROJE ÖZETİ

- Kullanıcı Girişi
- Ürün Arama ve Listeleme
- Ürün Detay Sayfası Görüntüleme ve Sepete Ekleme
- Sepet Yönetimi ve Kontrolü
- Ödeme ve Sipariş Onayı
- Misafir Olarak Satın Alma Akışı

  Tekrarlanan adımların kod tekrarını önlemek ve bakımı kolaylaştırmak için test dosyalarında Mocha Hooks (beforeEach) metodu etkin olarak kullanılmıştır.

PROJE KLASÖRÜ YAPISI

Page Object Model mimarisi kulanılmıştır.

cypress-automation
┣ 📂 cypress
┃ ┣ 📂 e2e
┃ ┃ ┣ 📂 page # Page Object dosyaları
┃ ┃ ┣ 📂 tests # Test senaryoları (cy.js)
┃ ┣ 📂 fixtures # Test verileri (JSON)
┃ ┣ 📂 screenshots # Hatalı test görüntüleri
┣ 📜 cypress.config.js
┣ 📜 package.json
┣ 📜 README.md







