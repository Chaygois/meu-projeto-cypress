import { faker } from '@faker-js/faker';

describe('Cadastro, login e compra de usuário', () => {
  let nome, senha;

  beforeEach(() => {
    // Gera dados únicos para o usuário
    nome = faker.internet.userName() + faker.string.uuid().slice(0, 6);
    senha = faker.internet.password(10, true);
    cy.visit('https://www.demoblaze.com/#');
  });

  it('Deve permitir o cadastro, login e compra de um novo usuário', () => {
    // Cria o stub para window.alert para o cadastro
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alertStub');
    });

    // --- Cadastro ---
    cy.get('#signin2').click();
    cy.get('#signInModal').should('be.visible');
    cy.get('#sign-username').type(nome, { force: true });
    cy.get('#sign-password').type(senha, { force: true });
    cy.get('button[onclick="register()"]').click();

    // Aguarda e verifica o alerta de "Sign up successful."
    cy.wait(3000);
    cy.get('@alertStub').should('have.been.calledWith', 'Sign up successful.');
    // Reseta o stub para não interferir nas próximas verificações
    cy.get('@alertStub').invoke('resetHistory');

    // --- Login ---
    cy.get('#login2').click({ force: true });
    cy.wait(3000);
    cy.get('#logInModalLabel', { timeout: 15000 }).should('be.visible');
    cy.get('#loginusername').type(nome, { force: true });
    cy.get('#loginpassword').type(senha, { force: true });
    cy.get('button[onclick="logIn()"]').click();
    cy.get('.navbar-nav').contains('Welcome').should('be.visible');

    // --- Seleção do Produto ---
    // Clica no produto "Samsung galaxy s6" e verifica a URL (permitindo o # no final)
    cy.get('a[href="prod.html?idp_=1"]').contains('Samsung galaxy s6').click();
    cy.url().should('include', 'prod.html?idp_=1');

    // Adiciona o produto ao carrinho clicando no botão correto
    cy.get('a[onclick="addToCart(1)"]').click(); // Clicando no botão Add to cart com o evento onclick

    // --- Acessa o Carrinho ---
    cy.get('a.nav-link').contains('Cart').click();
    cy.url().should('include', 'cart.html');

    // --- Realiza o Pedido ---
    // Abre o modal "Place Order"
    cy.get('button.btn.btn-success').contains('Place Order').click();
    cy.get('#orderModalLabel').should('be.visible');

    // Preenche os campos do modal de pedido
    cy.get('#name').type('Nome do Comprador');
    cy.get('#country').type('Brasil');
    cy.get('#city').type('Fortaleza');
    cy.get('#card').type('1234567812345678');
    cy.get('#month').type('12');
    cy.get('#year').type('2025');

    // Clica no botão "Purchase"
    cy.get('button.btn.btn-primary').contains('Purchase').click();

    // Verifica se a compra foi concluída com sucesso (exemplo com Sweet Alert)
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.sweet-alert').contains('Thank you for your purchase!');
  });
});
