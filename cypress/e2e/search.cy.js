import searchPage from './page/searchPage';
import searchData from '../fixtures/searchData.json';

describe('User Story 02 - Ürün Arama ve Listeleme', () => {
  
  beforeEach(() => {
    searchPage.visitHomePage();
    cy.waitForPageLoad();
    cy.closePopupIfExists();
  });

  it('TC01 - AC1: Kullanıcı arama kutusuna en az 1 karakter yazarak arama yapabilmeli', () => {
    searchPage.searchProduct(searchData.validKeyword);
    cy.url().should('include', '/arama');
  });

  it('TC02 - AC2: Arama sonrası sayfa ve ürünler listelenmeli', () => {
    searchPage.searchProduct(searchData.singleLetterSearch);
    searchPage.verifySearchResultPage(searchData.singleLetterSearch);
  });

  it('TC03 - AC3: Geçersiz arama sonucu ürün bulunamamalı', () => {
    searchPage.searchProduct(searchData.invalidKeyword);
    searchPage.verifyNoResult().should('not.exist');
  });

  it('TC04 - AC4: Ürün kart yapısı doğrulanmalı', () => {
    searchPage.searchProduct(searchData.validKeyword);
    searchPage.verifyProductCardStructure();
  });

  it('TC05 - AC5: Sepete ekle butonu hover ile görünmeli', () => {
    searchPage.searchProduct(searchData.validKeyword);
    searchPage.verifyAddToCartButton();
  });

  it('TC06 - AC6: Sıralama menüsü seçenekleri görüntülenmeli', () => {
    searchPage.searchProduct(searchData.validKeyword);
    searchPage.verifySortOptions();
  });

  it('TC07 - AC7: Filtreleme panelinde kategoriler/markalar görünmeli', () => {
    searchPage.searchProduct(searchData.validKeyword);
    searchPage.elements.filterSection('Kategoriler').should('be.visible');
    searchPage.elements.filterSection('Marka').should('be.visible');
  });

  it('TC08 - AC8: Kullanıcı üst kategoriden ürün seçebilmeli', () => { 
    searchPage.verifyCategorySelection('ROMAN'); 
  });

  it('TC09 - AC9: Aşağı scroll ile yeni sayfa yüklenmeli', () => {
    searchPage.searchProduct(searchData.validKeyword);
    searchPage.verifyScrollLoadsMore();
  });
});

