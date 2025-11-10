class productDetailPage {
    elements = {
        productTitle: () => cy.get('#product-title'),
        author: () => cy.get('#model-title'),
        publisher: () => cy.get('#brand-title'),
        price: () => cy.get('.product-current-price.fw-black'),
        addToCartBtn: () => cy.contains('Sepete Ekle'),
        successMessage: () => cy.contains('Ürün Başarıyla Sepete Eklendi', { timeout: 10000 }),
        cartIconCount: () => cy.get('.badge.cart-soft-count'),
        
        productInfoSection: () => cy.get('.w-100.text-black.fw-bold.mb-5px.info-title'),
        productType: () => cy.get('.col-6.col-sm-4.col-md-6.col-lg-4.px-0.book-info-box:contains("Türü")'),
        productISBN: () => cy.get('.col-6.col-sm-4.col-md-6.col-lg-4.px-0.book-info-box:contains("ISBN")'),
        productPageCount: () => cy.get('.col-6.col-sm-4.col-md-6.col-lg-4.px-0.book-info-box:contains("Sayfa Sayısı")'),
        productYear: () => cy.get('.col-6.col-sm-4.col-md-6.col-lg-4.px-0.book-info-box:contains("Basım Yılı")'),

        goToCartBtn: () => cy.get('#cart-popup-go-cart'),
        buyNowBtn: () => cy.get('#cart-popup-continue-shopping')
    };


    verifyBasicInfo(productData) {
        this.elements.productTitle().should('contain', productData.productName);
        this.elements.author().should('contain', productData.productAuthor);
        this.elements.publisher().should('contain', productData.productPublisher);
        this.elements.price().should('contain', productData.productPrice);
    }

    verifyProductInfo(productData) {
        this.elements.productType().should('be.visible');
        this.elements.productISBN().should('be.visible');
        this.elements.productPageCount().should('be.visible');
        this.elements.productYear().should('be.visible');
    }

    clickAddToCart() {
        this.elements.addToCartBtn({ timeout: 10000 }).click({ force:true });
    }

    verifyCartConfirmation() {
        this.elements.successMessage().should('be.visible').and('contain', 'Ürün Başarıyla Sepete Eklendi');
        this.elements.goToCartBtn().should('be.visible');
        this.elements.buyNowBtn().should('be.visible');
    }

    verifyCartCountIncreased() {
  cy.get('.badge.cart-soft-count', { timeout: 10000 })
    .invoke('text')
    .then((beforeText) => {
      const beforeCount = parseInt(beforeText.trim(), 10) || 0;

      // Ürünü sepete ekle
      this.clickAddToCart();
      cy.wait(1500);

      // Sonraki sayıyı kontrol et
      cy.get('.badge.cart-soft-count', { timeout: 10000 })
        .invoke('text')
        .then((afterText) => {
          const afterCount = parseInt(afterText.trim(), 10) || 0;
          expect(afterCount).to.eq(beforeCount + 1);
        });
    });
}

}

export default new productDetailPage();