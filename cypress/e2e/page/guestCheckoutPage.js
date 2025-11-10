class GuestCheckoutPage {

  elements = {
    buyButton: () => cy.get('#cart-popup-continue-shopping'),
    guestContinueBtn: () => cy.contains('button', 'Üye Olmadan Devam Et'),
    fullNameField: () => cy.get('#fullname'),
    emailField: () => cy.get('input[name="email"], [type="email"]').filter(':visible'),
    phoneField: () => cy.get('#mobile_phone'),
    provinceField: () => cy.get('select[name="city_code"]'),
    districtField: () => cy.get('select[name="town"], #town'),
    neighborhoodField: () => cy.get('select[name="district"], #district'),
    addressField: () => cy.get('#address'),
    addressTitle: () => cy.contains('.col-6', 'Adres Bilgileri'),
    continueBtn: () => cy.contains('button', 'Devam Et'),
    saveAddressBtn: () => cy.contains('button', 'Adresi Kaydet'),
    validationMessage: () => cy.get('.popover-item.fade-in.inline'),
  };

  clickBuyButton() {
    this.elements.buyButton().should('be.visible').first().click({ force: true });
  }

  continueAsGuest() {
    this.elements.guestContinueBtn().should('be.visible').click({ force: true });
  }

  fillAddressForm(data) {
    if (data.fullName) this.elements.fullNameField().clear().type(data.fullName);
    if (data.email) this.elements.emailField().clear().type(data.email);
    if (data.phone) this.elements.phoneField().clear().type(data.phone);
    if (data.province) this.elements.provinceField().select(data.province);
    if (data.district) this.elements.districtField().type(data.district);
    if (data.neighborhood) this.elements.neighborhoodField().type(data.neighborhood);
    if (data.address) this.elements.addressField().clear().type(data.address);
  }

}

export default new GuestCheckoutPage();
