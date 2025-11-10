// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// --- Genel yardımcı komutlar ---
// cypress/support/commands.js
import 'cypress-wait-until';

// 🔹 Tüm popup’ları otomatik kapatma
Cypress.Commands.add('closePopupIfExists', () => {
  const selectors = [
    '#t-modal-close-1',                     // kampanya popup
    '.ti-close',                            // newsletter
    '.t-modal-backdrop',                    // modal arka plan
    'button:contains("Tümünü Kabul Et")',   // çerez popup
    '.ccp---nb-interstitial-overlay',       // senin hatadaki overlay 👈
  ];

  selectors.forEach((selector) => {
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).then(($el) => {
          // Bazı overlay'ler tıklanabilir değilse direkt DOM’dan kaldır
          if ($el.is(':visible')) {
            cy.wrap($el).click({ force: true });
          } else {
            cy.wrap($el).invoke('remove');
          }
        });
      }
    });
  });
});

// 🔹 Sayfanın tamamen yüklenmesini bekle
Cypress.Commands.add('waitForPageLoad', () => {
  cy.document().its('readyState').should('eq', 'complete');
  cy.get('body').should('not.have.class', 'is-loading');
});
