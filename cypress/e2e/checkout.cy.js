
import { faker } from '@faker-js/faker';

describe('Checkout', () => {
  beforeEach(() => {
    cy.visit('https://exemplo.com/carrinho');
  });

  it('Deve finalizar compra com sucesso', () => {
    const nome = faker.person.fullName();
    const cartao = faker.finance.creditCardNumber();
    const validade = '12/30';
    const cvv = faker.string.numeric(3);

    cy.get('#produto1').click();
    cy.get('#carrinho').click();
    cy.get('#finalizarCompra').click();

    cy.get('#nome').type(nome);
    cy.get('#cartao').type(cartao);
    cy.get('#validade').type(validade);
    cy.get('#cvv').type(cvv);
    cy.get('button[type="submit"]').click();

    cy.contains('Compra realizada com sucesso').should('be.visible');
  });
});
