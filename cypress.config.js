// cypress.config.js

module.exports = {
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.js', // Certifique-se de que está apontando para os arquivos de teste
    supportFile: false, // Se não estiver usando um arquivo de suporte
  },
};
