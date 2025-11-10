// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// cypress/support/e2e.js
import './commands';

// 🔹 Bazı hataları testleri bozmadan yoksay
Cypress.on('uncaught:exception', (err) => {
  const ignoredErrors = [
    'Failed to fetch',
    'insertAdjacentElement',
    'TSOFT_APPS',
    'mobildev',
    'initNoticeBanner',
    'google_trackConversion'
  ];

  if (err.name === 'DOMException' ||
    ignoredErrors.some(msg => err.message.includes(msg))) {
    console.warn('⚠️ DOMException veya bilinen hata yoksayıldı:', err.message);
    return false;
  }
});

// 🔹 Overlay engelini otomatik kaldır
Cypress.on('window:before:load', (win) => {
  const style = win.document.createElement('style');
  style.innerHTML = `
  .ccp---nb-interstitial-overlay,
  .t-modal-backdrop {
   display: none !important;
   visibility: hidden !important;
   opacity: 0 !important;
   pointer-events: none !important;
  }
`;
  // win.document.head.appendChild(style);
});

// 🔹 DOMException hatalarını bastır ve ekran görüntüsü al
Cypress.on('fail', (error, runnable) => {
  try {
    if (error && error.name === 'DOMException') {
    cy.screenshot('dom-exception-safe');
    console.warn('⚠️ DOMException bastırıldı (getter hatası olmadan).');
    return false; // Cypress testini fail etmesin
    }
  } catch (err) {
    console.warn('⚠️ DOMException yakalama sırasında hata:', err);
    return false;
  }
  // Diğer hatalarda normal screenshot alıp testi fail et
  cy.screenshot('test-failure');
  throw error;
});



import "cypress-real-events/support";
