import loginPage from './page/loginPage';
import loginData from '../fixtures/loginData.json';

describe('User Story 01 - Kullanıcı Girişi', () => {
  
  beforeEach(() => {
    cy.waitForPageLoad();
    cy.closePopupIfExists();
    loginPage.visitHomePage();
    loginPage.clickLoginButton();
  });

  it('TC01 - AC1: Giriş popup erişimi', () => {
    loginPage.elements.emailField().should('exist').and('be.visible');
  });

  it('TC02 - AC2: Giriş popup alanları görünmeli', () => {
    loginPage.elements.emailField().should('exist');
    loginPage.elements.passwordField().should('exist');
    loginPage.elements.rememberMeCheckbox().should('exist');
    loginPage.elements.forgotPasswordLink().should('exist');
    loginPage.elements.submitButton().should('exist');
  });

  it('TC03 - AC3/AC4: Geçerli kullanıcı ile başarılı giriş', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.enterEmail(data.validUser.email);
      loginPage.enterPassword(data.validUser.password);
      loginPage.submitLogin();

      // Başarılı giriş sonrası yönlendirme doğrulaması
      cy.url({ timeout: 10000 }).should('include', '/');
      cy.contains('Başarıyla giriş yaptınız.', { matchCase: false }).should('exist');
    });
  });

  it('TC05 - AC5: Hatalı bilgilerle giriş başarısız olmalı', () => {
    cy.fixture('loginData').then((data) => {
      loginPage.enterEmail(data.invalidUser.email);
      loginPage.enterPassword(data.invalidUser.password);
      loginPage.submitLogin();
      loginPage.verifyErrorMessage('Giriş bilgileriniz hatalı');
    });
  });

  it('TC06 - AC6: Geçersiz e-posta formatı uyarısı', () => {
    loginPage.enterEmail('userexample.com');
    loginPage.enterPassword('123456');
    loginPage.submitLogin();
    cy.contains('Giriş bilgileriniz hatalı.').should('exist');
  });

  it('TC07 - AC7: Boş alanlarla giriş yapılamaz', () => {
    loginPage.submitLogin();
    cy.contains('Giriş bilgileriniz hatalı.').should('exist');
  });

  it('TC08 - AC8: Çok fazla hatalı deneme sonrası uyarı', () => {

    for (let i = 0; i < 11; i++) {
      loginPage.enterEmail(loginData.invalidUser.email);
      loginPage.enterPassword(loginData.invalidUser.password);
      loginPage.submitLogin();
    }
    loginPage.verifyExcessiveLoginAttemptMessage();
  
  });  


  it('TC09 - AC9: Şifremi unuttum sayfasına yönlendirme', () => {
    
    loginPage.elements.forgotPasswordLink().click();
    cy.url().should('include', '/uye-sifre-hatirlat');
    cy.get('#email-292').should('be.visible');
    cy.get('#forgot-password-btn-292').should('exist').click();
  });
});