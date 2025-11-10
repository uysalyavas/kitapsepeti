import guestCheckoutPage from './page/guestCheckoutPage';
import guestCheckoutData from '../fixtures/guestCheckoutData.json';
import searchPage from './page/searchPage';
import productDetailPage from './page/productDetailPage';

describe('User Story - 06 - Misafir Olarak Satın Alma Akışı', () => {

   beforeEach(() => {
  
      cy.visit('/', { timeout: 90000, failOnStatusCode: false });
      searchPage.searchProduct(guestCheckoutData.productName);
      productDetailPage.clickAddToCart();
      guestCheckoutPage.clickBuyButton();
      cy.url({ timeout: 20000 }).should('include', '/siparis-uye-giris');
      guestCheckoutPage.elements.guestContinueBtn().should('be.visible');
      guestCheckoutPage.continueAsGuest();
      cy.wait(2000);
      cy.url({ timeout: 20000 }).should('include', '/order/address');
      guestCheckoutPage.elements.addressTitle().should('be.visible');
    });
  

  it('TC01-AC1,AC2,AC3,AC4,AC5 - Zorunlu alan boş bırakıldığında uyarı görünmeli', () => {
    guestCheckoutPage.fillAddressForm({});
    guestCheckoutPage.elements.saveAddressBtn().click({ force: true });
    guestCheckoutPage.elements.validationMessage()
      .should('contain.text', 'Lütfen bu alanı doldurunuz');
  });

   it('TC02-AC1,AC2,AC3,AC4,AC6 - Tüm bilgiler geçerli girildiğinde ödeme adımına geçilmeli', () => {
    guestCheckoutPage.fillAddressForm(guestCheckoutData.guestInfo);
    guestCheckoutPage.elements.saveAddressBtn().should('be.visible').click({ force:true });
    cy.url({ timeout:20000 }).should('include', '/payment');
   });

});
