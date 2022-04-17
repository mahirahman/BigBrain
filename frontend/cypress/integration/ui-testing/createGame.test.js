const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

context('create Game flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('Successfully log in', () => {
    const email = 'jane.doe@gmail.com';
    const password = 'password';

    cy.get('input[placeholder="Email"]').focus().type(email);
    cy.get('input[placeholder="Password"]').focus().type(password);
    cy.get('button[type=button]').click();
    cy.get('.NavigationMenu_menu_links__3uHzw > div').eq(1).click();

    const gameName = 'cypress test';
    cy.get('input[class="form-control"]').focus().type(gameName);
    cy.get('.modal-footer > button').click();
  });
});
