import paymentPage from './page/paymentPage';
import paymentData from '../fixtures/paymentData.json';
import searchPage from './page/searchPage';
import productDetailPage from './page/productDetailPage';
import cartPage from './page/cartPage';
import loginPage from './page/loginPage';
import loginData from '../fixtures/loginData.json';


describe('User Story 05 - Ödeme ve Sipariş Onayı', () => {

  beforeEach(() => {

    cy.on('uncaught:exception', (err) => {
      // DOMException gibi Cypress’in kendi iç hatalarını yoksay
    if (err.message.includes('DOMException')) {
    return false;
    }
  });

    cy.visit('/', { timeout: 90000, failOnStatusCode: false });
    cy.waitForPageLoad();
    cy.closePopupIfExists();
    cy.waitForPageLoad();
    cy.closePopupIfExists();
    loginPage.login(loginData.validUser);
    cy.closePopupIfExists();
    searchPage.searchProduct(paymentData.productName);
    productDetailPage.clickAddToCart();
    cartPage.openCart();
  });

  it.only('AC1 - Satın Al butonuna tıklanınca Adres Bilgileri sayfasına yönlendirilmeli', () => {
    paymentPage.clickBuyNow();
    cy.wait(10000); // yönlendirmeye zaman tanı
    paymentPage.verifyAddressPage();
  });

  it('AC2 - Ödeme adımına geçiş yapılmalı', () => {
    paymentPage.goToPaymentPage();
    paymentPage.verifyPaymentPage();
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // cy.closePopupIfExists();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    // Ödeme sayfasına geldikten sonra
//cy.get('body').then(($body) => {
  // if ($body.find('#cookie-modal, .cookie-consent, .cookie-popup').length) {
    // cy.contains('Tümünü Kabul Et').click({ force: true });
  // }
// });

// Sipariş özeti yüklenmesini bekle
// cy.get('.order-summary, .cart-summary, #order-summary', { timeout: 20000 }).should('be.visible');

// Sipariş özetini doğrula
// cy.contains('Sipariş Özet').should('be.visible');
// cy.contains('Genel Toplam').should('contain.text', '12.732,94 TL');

  });

  it('AC3 - Kargo seçenekleri doğrulanmalı', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.verifyShippingOptions();
  });

  it('AC4 - Ödeme yöntemleri görünür olmalı', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.verifyPaymentOptions();
  });

  it('AC5 - Kartla ödeme seçildiğinde form alanları görünmeli', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.selectCardPayment();
    paymentPage.verifyCardFormFields();
  });

  it('AC6 - Tüm alanlar doluysa ÖDE butonu aktif olmalı', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.fillCardInfo(paymentData.validCard);
    paymentPage.verifyPayButtonActive();
  });

  it('AC7 - Eksik alan varsa uyarı gösterilmeli', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.fillCardInfo(paymentData.invalidCard);
    paymentPage.clickPayButton();
    paymentPage.verifyFieldErrorMessage();
  });

  it('AC8 - Sipariş özeti doğru görünmeli', () => {
    // paymentPage.clickBuyNow();
    // paymentPage.verifyAddressPage();
    // paymentPage.clickNextPaymentStep();
    // paymentPage.verifyPaymentPage();
    paymentPage.goToPaymentPage();
    paymentPage.verifyOrderSummary(paymentData.totalAmount);
    // cy.get('iframe').its('0.contentDocument.body').should('not.be.empty').then(cy.wrap).find('.order-summary').should('contain', 'Genel Toplam');

  });
});
