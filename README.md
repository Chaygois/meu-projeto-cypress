# Teste Cypress: Cadastro, Login e Compra de Usuário

Este projeto contém um teste Cypress que simula o fluxo completo de cadastro, login e compra de um usuário no site [demoblaze.com](https://www.demoblaze.com/#).

## Cenário de Teste

O teste automatiza os seguintes passos:

1.  **Cadastro de Novo Usuário:**
    * Gera um nome de usuário e senha únicos usando `faker-js`.
    * Acessa a página de cadastro.
    * Preenche os campos de nome de usuário e senha.
    * Envia o formulário de cadastro.
    * Verifica se o alerta de "Sign up successful." é exibido.
2.  **Login do Usuário Cadastrado:**
    * Acessa a página de login.
    * Preenche os campos de nome de usuário e senha com os dados gerados.
    * Envia o formulário de login.
    * Verifica se a mensagem de boas-vindas é exibida.
3.  **Seleção e Adição de Produto ao Carrinho:**
    * Seleciona o produto "Samsung galaxy s6".
    * Verifica se a URL do produto está correta.
    * Adiciona o produto ao carrinho.
4.  **Acesso ao Carrinho:**
    * Acessa a página do carrinho.
    * Verifica se a URL do carrinho está correta.
5.  **Realização do Pedido:**
    * Abre o modal "Place Order".
    * Preenche os campos do formulário de pedido.
    * Envia o formulário de pedido.
    * Verifica se a mensagem de confirmação de compra é exibida.

## Pré-requisitos

* Node.js e npm (ou yarn) instalados.
* Cypress instalado globalmente ou localmente no projeto.

## Instalação

1.  Clone este repositório.
2.  Navegue até o diretório do projeto.
3.  Execute `npm install` ou `yarn install` para instalar as dependências.

## Execução do Teste

Para executar o teste, utilize um dos seguintes comandos:

* `npx cypress open`: Abre a interface gráfica do Cypress, onde você pode selecionar e executar o teste.
* `npx cypress run`: Executa os testes em modo headless (sem interface gráfica).

## Dependências

* `cypress`: Framework de testes end-to-end.
* `@faker-js/faker`: Biblioteca para geração de dados fictícios.

## Observações

* O teste utiliza `faker-js` para gerar dados únicos, garantindo que cada execução seja independente.
* O teste inclui verificações de alertas e mensagens de sucesso para garantir a integridade do fluxo.
* O teste utiliza `cy.wait()` em alguns pontos, o que pode ser substituído por esperas mais robustas, se necessário.
* O teste utiliza stub para verificar o alert do navegador.
* O teste utiliza o comando force: true, para forçar a digitação em alguns campos.
