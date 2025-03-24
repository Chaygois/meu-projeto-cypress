import { faker } from '@faker-js/faker';

describe('Cadastro de usuário', () => {
  let nome, senha;

  beforeEach(() => {
    nome = faker.internet.userName() + faker.string.uuid().slice(0, 6);
    senha = faker.internet.password(10, true);
    cy.visit('https://www.demoblaze.com/#');
  });

  it('Deve permitir o cadastro e login de um novo usuário', () => {
    // Clica no botão "Sign up"
    cy.get('#signin2').click();

    // Aguarda o modal de cadastro ser exibido
    cy.get('#signInModal').should('be.visible');

    // Preenche os campos de cadastro
    cy.get('#sign-username').type(nome, { force: true });
    cy.get('#sign-password').type(senha, { force: true });

    // Clica no botão "Sign up"
    cy.get('button[onclick="register()"]').click();

    // Aguarda alerta de sucesso
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Sign up successful.');
    });

    // Aguarda o backend processar o cadastro
    cy.wait(3000);

    // Realiza o login após o cadastro
    cy.get('#login2').click({ force: true });  // Clica no botão de login
    cy.wait(3000); // Espera o modal carregar completamente

    // Aumenta o tempo de espera para garantir que o modal carregue
    cy.get('#logInModalLabel', { timeout: 15000 }).should('be.visible'); // Usando o ID correto do modal de login

    // Insere os dados nos campos de login
    cy.get('#loginusername').type(nome, { force: true });
    cy.get('#loginpassword').type(senha, { force: true });

    // Clica no botão de login
    cy.get('button[onclick="logIn()"]').click();

  });
});
