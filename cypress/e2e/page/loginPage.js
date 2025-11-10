class LoginPage {

  elements = {
    
    loginButton: () => cy.get('a.member-login-btn'), 
    emailField: () => cy.get('#header-email'),
    passwordField: () => cy.get('#header-password'),
    rememberMeCheckbox: () => cy.get('#header-remember'),
    forgotPasswordLink: () => cy.get('.text-gray.text-underline.mb-1'),
    submitButton: () => cy.get('#login-btn-322'),
    errorMessage: () => cy.contains('Giriş bilgileriniz hatalı.'),
    bestsellersheaders: () => cy.get('#menu-16322'),
    loginModal: () => cy.get('#header-member-panel-322'),
    remindPasswordEmailInput: () => cy.get('#email-292'),
    remindPasswordButton: () => cy.get('#forgot-password-btn-292'),
    remindPasswordButtonText: () => cy.contains('Şifremi Hatırlat'),
    excessiveLoginAttemptMessage: () => cy.contains('Çok fazla istek talebinde bulundunuz. Lütfen 30 dakika sonra tekrar deneyin.'),
    excessiveLoginAttemptLocator: () => cy.get('.popover-item.fade-in.inline', { timeout:10000 })
  }

  
  visitHomePage() {
    cy.visit('/');
  }

  clickLoginButton() {
    this.elements.loginButton().click({ force: true });
    this.elements.emailField().should('be.visible');
  }

  enterEmail(email) {
    this.elements.emailField().clear().type(email);
  }

  enterPassword(password) {
    this.elements.passwordField().clear().type(password);
  }

  submitLogin() {
    this.elements.submitButton().click({ force: true });
  }

  verifyLoginPopupElementsVisible() {
    this.elements.emailField().should('be.visible');
    this.elements.passwordField().should('be.visible');
    this.elements.submitButton().should('be.visible');
    this.elements.forgotPasswordLink().should('be.visible');
  }

  verifyErrorMessage(message) {
    this.elements.errorMessage().should('contain', message);
  }

  clickForgotPasswordLink() {
    this.elements.url();
    this.elements.clickAcceptCookieButton();
    this.elements.clickAccountIcon();
    this.elements.forgotPasswordLink().should('be.visible').click();
  }

  verifyForgotPasswordPageLoaded() {
    this.elements.remindPasswordEmailInput().should('be.visible');
    this.elements.remindPasswordButton.should('be.visible').and('contain', this.remindPasswordButtonText);
  }

  verifyExcessiveLoginAttemptMessage() {
  cy.contains('Çok fazla istek talebinde bulundunuz', { timeout: 10000 })
    .should('be.visible')
    .and('contain.text', 'Lütfen 30 dakika sonra tekrar deneyin');
}

  login({email, password}) {
    this.elements.loginButton({ timeout:10000 }).click({ force:true });
    this.elements.emailField().should('be.visible').clear().type(email);
    this.elements.passwordField().should('be.visible').clear().type(password);
    this.elements.submitButton().click({ force:true });
  }
}

module.exports = new LoginPage();
