class SearchPage {
  elements = {
    searchBox: () => cy.get('#live-search'), 
    searchButton: () => cy.get('#live-search-btn'),
    productCard: () => cy.get('.w-100.bg-white.ease.border-round.overflow-hidden'),
    sortDropdown: () => cy.get('#sort'),
    categoryTab: (name) => cy.contains('a', name),
    filterSection: (name) => cy.get('#accordion-categories-361'),
    cartPopup: () => cy.get('.col-12.py-1', { timeout: 60000 }),
    addToCartButton: () => cy.contains('Sepete Ekle')
  }

  visitHomePage() {
    cy.visit('/');
  }

   searchProduct(keyword) {
    this.elements.searchBox().clear({ force:true }).type(keyword);
    this.elements.searchButton().click();
  }

  scrollToAddToCartButton() {
    this.elements.addToCartButton().scrollIntoView({ offset: { top: -100 } });
  }

   addToCart() {
    this.elements.addToCartButton().should('be.visible').click({ force: true });
  }

  verifySearchResultPage(keyword) {
    cy.url().should('include', '/arama');
    cy.get('.image-inner').should('exist');
    this.elements.searchBox().should('have.value', '');
  }

  verifyNoResult() {
    return cy.get('.no-result');
  }

  verifyProductCardStructure() {
    this.elements.productCard().first().within(() => {
      cy.get('.image-wrapper.image-animate-zoom img').should('be.visible').and('have.attr','alt').and('not.be.empty');
      cy.get('[id^="product-title-"]').should('be.visible').and('contain.text', 'Kürk Mantolu Madonna')
      cy.get('[id^="brand-title-"]').should('be.visible').and('not.be.empty');
      cy.get('.fw-regular.current-price').should('be.visible');
      cy.root().trigger('mouseover'); // Ürün kartının tamamına hover uygular
      cy.get('[id^="product-addcart-button-"]').should('exist').and('contain.text', 'Sepete Ekle');
    });
  }

  verifyAddToCartButton() {
    this.elements.productCard().first().scrollIntoView().should('be.visible');
    cy.get('.fw-regular.current-price').first().realHover();
    cy.wait(3000);
    cy.get('[id^="product-addcart-button-"]').should('exist');
  }

  verifySortOptions() {
    this.elements.sortDropdown( { timeout:10000 }).select('Varsayılan Sıralama', { force: true });
    cy.get('#sort').should('contain.text', 'Varsayılan Sıralama');
    cy.get('#sort').should('contain.text', 'Yeniden Eskiye');
    cy.get('#sort').should('contain.text', 'Eskiden Yeniye');
    cy.get('#sort').should('contain.text', 'Fiyat Artan');
    cy.get('#sort').should('contain.text', 'Fiyat Azalan');
  }

  verifyCategorySelection(name) {
  // 1️⃣ Üst menüyü hover et (örneğin "Kitap")
  cy.contains('a', 'Kitap').realHover(); 

  // 2️⃣ Alt kategori görünür olana kadar bekle
  cy.contains('a', name, { timeout: 10000 }).should('be.visible');

  // 3️⃣ Alt kategoriye tıkla (force: true ile)
  cy.contains('a', name).click({ force: true });

  // 4️⃣ URL doğrulaması
  cy.url({ timeout: 10000 }).should('include', name.toLowerCase());

  // 5️⃣ Breadcrumb doğrulaması (normalize edilmiş metinle)
  cy.get('.breadcrumb', { timeout: 10000 })
    .invoke('text')
    .then(text => {
      const normalized = text.replace(/\s+/g, ' ').trim().toLowerCase();
      expect(normalized).to.include(name.toLowerCase());
    });
}

verifyScrollLoadsMore() {
  cy.get('.col-6 > .bg-white')
    .its('length')
    .then(initialCount => {
      cy.scrollTo('bottom', { ensureScrollable: true });
      cy.wait(5000);
      cy.get('.col-6 > .bg-white')
        .its('length')
        .should('be.gte', initialCount + 1);
    });
}

waitForCartPopup() {
  cy.log('🛒 Sepet popup kontrolü başlatılıyor...');

  const popupSelector = '#modal-popup-cart, #popup-cart, [id^="popup-cart-"], .t-modal-content';

  cy.get('body').then($body => {
    const hasPopup = $body.find(popupSelector).length > 0;

    if (!hasPopup) {
      cy.log('⚠️ Popup DOM’da bulunamadı, sepete tıklanıyor...');
      cy.get('.custom-cart, [id^="header-cart"]').click({ force: true });
      cy.wait(1500);
    }
    
  });

  // Popup'ın görünür hale gelmesini bekle
  cy.get(popupSelector, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  cy.log('✅ Sepet popup başarıyla açıldı');
}




}


module.exports = new SearchPage();