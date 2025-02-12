import { faker } from '@faker-js/faker';

describe('Cadastro de usuário', () => {
  let nome, senha;

  beforeEach(() => {
    nome = faker.name.fullName() + faker.string.uuid().slice(0, 6);  // Garante que o nome seja único
    senha = faker.internet.password({ length: 10, memorable: true });
    cy.visit('https://www.demoblaze.com/#');
  });

  it('Deve permitir o cadastro e login de um novo usuário', () => {
    // Clica no botão "Sign up"
    cy.get('#signin2').click();

    // Espera o modal de cadastro ser exibido
    cy.get('#signInModal').should('be.visible');

    // Preenche os campos com os dados gerados pelo Faker
    cy.get('#sign-username').type(nome);
    cy.get('#sign-password').type(senha);

    // Clica no botão "Sign up" para registrar o usuário
    cy.get('button[onclick="register()"]').click();

    // Verifica se o alerta contém a mensagem correta, caso o cadastro já tenha sido feito
    cy.on('window:alert', (alertText) => {
      if (alertText.includes('This user already exist')) {
        cy.log('Usuário já existe, prosseguindo com o login...');
      } else {
        expect(alertText).to.contains('Sign up successful');
      }
    });

    // Se o usuário já existir, ignora o cadastro e tenta fazer o login
    cy.get('#login2').click({ force: true });

    // Espera o modal de login aparecer
    cy.get('#loginModal', { timeout: 10000 }).should('be.visible');

    // Preenche os campos de login com as credenciais do usuário recém-criado
    cy.get('#login-username').type(nome);
    cy.get('#login-password').type(senha);

    // Clica no botão "Login"
    cy.get('button[onclick="logIn()"]').click();

    // Verifica se o login foi bem-sucedido
    cy.contains(nome).should('be.visible');
  });
});
