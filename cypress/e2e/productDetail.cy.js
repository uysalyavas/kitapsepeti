import searchPage from './page/searchPage';
import productListPage from './page/productListPage';
import productDetailPage from './page/productDetailPage';
import productData from '../fixtures/productData.json';

describe('User Story 03 - Ürün Detay Sayfası Görüntüleme ve Sepete Ekleme', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.closePopupIfExists();
    searchPage.searchProduct(productData.productName);
  });

  it('AC1 - Ürün görseline veya adına tıklanınca detay sayfasına yönlendirilmelidir', () => {
    productListPage.clickFirstProduct();
    cy.location('pathname', { timeout: 10000 }).should('not.include', '/arama')
    .and('match', /\/gece-yarisi-kutuphanesi|\/kitap\//);
});

  it('AC2 - Ürün detay sayfasında temel bilgiler görünmelidir', () => {
    productListPage.clickFirstProduct();
    productDetailPage.verifyBasicInfo(productData);
  });

  it('AC3 - "Ürün Hakkında Bilgiler" bölümü tür, ISBN, sayfa sayısı, kağıt tipi, basım yılı içermelidir', () => {
    productListPage.clickFirstProduct();
    productDetailPage.verifyProductInfo(productData);
  });

  it('AC4 - Sayfada işlevsel bir "Sepete Ekle" butonu bulunmalıdır', () => {
    productListPage.clickFirstProduct();
    productDetailPage.clickAddToCart();
  });

  it('AC5 - "Sepete Ekle" tıklandığında onay mesajı ve butonlar görünmelidir', () => {
    productListPage.clickFirstProduct();
    productDetailPage.clickAddToCart();
    productDetailPage.verifyCartConfirmation();
  });

  it('AC6 - Ürün sepete eklendikten sonra sepet ikonundaki ürün sayısı 1 artmalıdır', () => {
    productListPage.clickFirstProduct();
    productDetailPage.verifyCartCountIncreased(1);
  });

});
