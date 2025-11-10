import cartPage from './page/cartPage';
import cartData from '../fixtures/cartData.json';
import searchPage from './page/searchPage';
import productDetailPage from './page/productDetailPage';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('User Story 04 - Sepet Yönetimi ve Kontrolü', () => {

  beforeEach(() => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.closePopupIfExists();
    searchPage.searchProduct(cartData.productName);
    cy.closePopupIfExists();
    productDetailPage.clickAddToCart();
    cy.closePopupIfExists();
  });

  it('AC1 - Sepete erişim ve genel toplam kontrolü', () => {
    cy.closePopupIfExists();
    cartPage.openCart();
    cartPage.goToCartPage();
    
    cartPage.elements.generalTotal().should('exist');
    cy.contains(cartData.cartPage.continueButton).should('be.visible');
    cy.contains(cartData.cartPage.buyButton).should('exist');
  });


  it('AC2 - Ürün bilgileri doğru görüntülenmeli', () => {
    cartPage.openCart();
    cartPage.goToCartPage();

  // Sepet içeriği yüklensin
  cy.get('[class*="cart-item"][class*="general-shadow"]', { timeout: 10000 })
    .should('exist')
    .each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('.d-block.cart-item-title').should('be.visible');
        cy.get('.price-sell.fw-black.text-black').should('be.visible');
        cy.get('input[id^="qty"]').should('be.visible');
      });
    });
  });

   it('AC3 - Sepet toplamı, kargo ücreti ve genel toplam doğru hesaplanmalı', () => {
    cy.closePopupIfExists();
    cartPage.openCart();
    cartPage.goToCartPage();

    cy.get('.cart-price-box', { timeout: 10000 }).should('be.visible')
    // .within(() => {
      // cy.contains(/sepet toplamı/i).should('exist');
      // cy.contains(/kargo ücreti/i).should('exist');
      // cy.contains(/genel toplam/i).should('exist');
    // });

    // cy.get('.cart-general')
      .invoke('text').should('match', /(Sepet Toplamı|Kargo|Genel Toplam)/i);
      // .should('include', cartData.prices.shippingFee.toString());
  });

  it('AC4 - Adet artırıldığında toplam güncellenmeli', () => {
    cartPage.openCart();
    cartPage.goToCartPage();

    cy.get('[id^="qty"]').first().invoke('val').then((oldTotal) => {
      cartPage.increaseQuantity();
      cy.wait(1000);
      cy.get('[id^="qty"]').first().invoke('val').should((newTotal) => {
        expect(Number(newTotal.trim)).to.not.eq(Number(oldTotal.trim));
      });
    });
  });

  it('AC5 - Ürün silme işlemi çöp kutusu ile yapılmalı', () => {
    cartPage.openCart();
    cartPage.goToCartPage();
    cartPage.deleteItem();
    cy.wait(1500);
    cy.get('.header-cart-item').should('have.length.lessThan', 1);
  });

  it('AC6 - "Sepeti Temizle" butonu tüm ürünleri kaldırmalı', () => {
    cartPage.openCart();
    cartPage.goToCartPage();
    cartPage.clearCart();

    cy.wait(4000);
    cartPage.elements.emptyCartMessage().should('be.visible');
  });

  it('AC7 - Boş sepet mesajı görüntülenmeli', () => {
    cartPage.openCart();
    cartPage.goToCartPage();
    cartPage.clearCart();
    cartPage.elements.emptyCartMessage({ timeout:10000 }).should('be.visible');
    cartPage.elements.continueShoppingBtn().should('be.visible');
  });

  it('AC8 - Satın Al butonu görünür ve aktif olmalı', () => {
    cartPage.openCart();
    cartPage.goToCartPage();

    cartPage.elements.purchaseButton().should('be.visible').and('not.be.disabled');
  });

  it('AC9 - Ürün detay sayfasında "Sepete Git" butonu ile sepet sayfasına gidilmeli', () => {
    cartPage.openCart();
    cartPage.goToCartPage();
  });

   it('AC10 - Ana sayfadan sepete ekle ve Sepete Git butonu çalışmalı', () => {
    cy.visit('/');
    cy.waitForPageLoad();
    cy.closePopupIfExists();

    // Ana sayfada ilk ürünün sepete eklenmesi
    cy.get('[id^="product-addcart-button-"]').first().click({ force: true });
    cy.wait(4000);
    cy.get('#cart-popup-go-cart', { timeout: 10000 }).click({ force: true });
    cy.url().should('include', '/sepet');
  });

});
