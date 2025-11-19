class PaymentPage {
  elements = {
    buyNowBtn: () => cy.get('#go-order-btn').contains('Satın Al'),
    addressPageHeader: () => cy.contains('Adres Bilgileri'),
    nextPaymentStepBtn: () => cy.contains('.btn.btn-primary.w-100.text-uppercase.order-next-btn', 'Ödeme Adımına Geç'),
    paymentPageHeader: () => cy.contains('ÖDEME BİLGİLERİ'),
    shippingOptions: () => cy.contains('Kargo Seçenekleri'),
    defaultShipping: () => cy.get('input[value="PTT Kargo"]:checked'),
    paymentMethods: () => cy.contains('Ödeme Seçenekleri'),
    cardPaymentOption: () => cy.contains('Kartla Ödeme'),
    cardName: () => cy.get('#ccname'),
    cardNumber: () => cy.get('#ccnumber'),
    cardDate: () => cy.get('#ccexp'),
    cardCvv: () => cy.get('#cccvc'),
    payButton: () => cy.get('#iyz-payment-button'),
    fieldError: () => cy.contains('Lütfen tüm alanları doldurunuz'),
    orderSummaryBox: () => cy.get('#order-products'),
    totalAmount: () => cy.get('.w-100.d-flex.align-items-center.order-price.btn'),
  };


  clickBuyNow() {
    cy.wait(1000);
    cy.get('#header-cart-panel-302')
    .should('be.visible')
    .and('have.css', 'visibility', 'visible'); // panel gerçekten görünür olmalı

  // "Satın Al" butonu görünür hale gelene kadar bekle
  cy.get('#go-order-btn', { timeout: 15000 })
    .should('exist')
    .and('be.visible')
    .as('buyNowBtn');

  cy.get('@buyNowBtn').click({ force:true });

    // cy.closePopupIfExists();
    // cy.wait(1000);
    // this.elements.buyNowBtn({ timeout:15000 }).should('be.visible').click({ force: true });
    // cy.url({ timeout:20000 }).should('include', '/order/');
  }

  verifyAddressPage() {
    this.elements.addressPageHeader('Adres Bilgileri',{ timeout:25000 }).should('be.visible').scrollIntoView();
  }

  clickNextPaymentStep() {
    this.elements.nextPaymentStepBtn().should('be.visible').and('not.be.disabled')
    .scrollIntoView().click({ force:true });
  };

  verifyPaymentPage() {
    // this.elements.paymentPageHeader().should('exist').and('be.visible');
    // cy.contains('ÖDEME BİLGİLERİ', { matchCase: false, timeout: 25000 }).should('be.visible');
    // cy.get('body', { timeout:200000 }).should('contain.text', 'ÖDEME BİLGİLERİ');
    cy.url({ timeout:20000 }).should('include', 'order/payment');
    this.elements.paymentPageHeader().should('be.visible');
  }

  goToPaymentPage() {
    this.clickBuyNow();
    cy.handleAllPopups();
    this.verifyAddressPage();
    this.clickNextPaymentStep();
    this.verifyPaymentPage();
  }

  verifyShippingOptions() {
    this.elements.shippingOptions().should('have.length', 2);
    this.elements.defaultShipping().should('exist');
  }

  verifyPaymentOptions() {
    this.elements.paymentMethods().should('contain.text', 'iyzico')
    .and('contain.text', 'Kartla Ödeme');
  }

  selectCardPayment() {
    this.elements.cardPaymentOption().should('exist').click({ force: true });
  }

  verifyCardFormFields() {
    this.elements.cardName().should('be.visible');
    this.elements.cardNumber().should('be.visible');
    this.elements.cardDate().should('be.visible');
    this.elements.cardCvv().should('be.visible');
  }

  fillCardInfo(card) {
    if (card.name) this.elements.cardName().type(card.name);
    if (card.number) this.elements.cardNumber().type(card.number);
    if (card.date) this.elements.cardDate().type(card.date);
    if (card.cvv) this.elements.cardCvv().type(card.cvv);
  }

  verifyPayButtonActive() {
    this.elements.payButton().should('be.enabled').and('have.class', 'btn-primary');
  }

  clickPayButton() {
    this.elements.payButton().should('be.visible').click({ force: true });
  }

  verifyFieldErrorMessage() {
    this.elements.fieldError().should('be.visible');
  }

  verifyOrderSummary(expectedTotal) {
    this.elements.orderSummaryBox().should('be.visible');
    this.elements.totalAmount().should('contain.text', expectedTotal);
  }
}

export default new PaymentPage();
