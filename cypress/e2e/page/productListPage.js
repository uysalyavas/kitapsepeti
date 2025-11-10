class productListPage {
    elements = {
        productCard: () => cy.get('.col-6 > .bg-white a[href*="/"]'),
        firstProductName: () => cy.get('.product-title.text-center'),
        firstProductImage: () => cy.get('.w-100.position-relative')
        };
    
    clickFirstProduct() {
        cy.get('.col-6 > .bg-white a[href*="/"]', { timeout: 10000 })
        .first().should('be.visible').click({ force: true });
}
}

export default new productListPage();
