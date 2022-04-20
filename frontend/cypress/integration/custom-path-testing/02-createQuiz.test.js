const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Create a new game', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.NavigationMenu_menu_links__3uHzw > div').eq(1).click();
    const gameName = 'custom test';
    cy.get('input[class="form-control"]').focus().type(gameName);
    cy.get('.modal-footer > button').click();
    cy.contains('custom test');
  });
});
