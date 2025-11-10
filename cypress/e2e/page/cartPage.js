class cartPage {
  elements = {
    cartIcon: () => cy.get('.custom-cart'),
    cartSidePanel: () => cy.get('#header-cart-panel-302'),
    goToCartButton: () => cy.get('#go-cart-btn'),
    cartItem: () => cy.get('.col-12[class*="p-"]'),
    itemName: () => cy.get('.cp-title'),
    itemPrice: () => cy.get('.cp-price.price-sell.text-black.fw-black'),
    itemQuantity: () => cy.get('[id^="qtyHeaderCart"]'),
    itemTotal: () => cy.get('[id^="qty"]'),
    increaseBtn: () => cy.get('.ti-plus'), // + butonu
    deleteBtn: () => cy.get('.ti-trash-o'), // çöp kutusu
    clearCartBtn: () => cy.contains('Sepeti Temizle'), // #clear-cart-btn-129
    emptyCartMessage: () => cy.contains('Sepetinizde Ürün Bulunmamaktadır'),
    continueShoppingBtn: () => cy.contains('Alışverişe Devam Et'), // #cart-back-btn
    purchaseButton: () => cy.contains('Satın Al'), // #cart-buy-btn
    generalTotal: () => cy.get('.cart-general, .cart-summary, .cart-total'),
  };

  openCart() {
    // cy.closePopupIfExists();
    this.elements.cartIcon().click({ force: true });
    this.elements.cartSidePanel().should('be.visible');
  }


  goToCartPage() {
    // cy.closePopupIfExists();
    this.elements.goToCartButton({ timeout:20000 }).click({ force: true });
    cy.url({ timeout: 20000 }).should('include', '/sepet');
  }

  increaseQuantity() {
    cy.closePopupIfExists();
    this.elements.increaseBtn().first().click({ force: true });
  }

  deleteItem() {
    cy.closePopupIfExists();
    this.elements.deleteBtn().first().click({ force: true });
  }

  clearCart() {
    cy.closePopupIfExists();
    this.elements.clearCartBtn().click({ force: true });
  }
}

module.exports = new cartPage();
