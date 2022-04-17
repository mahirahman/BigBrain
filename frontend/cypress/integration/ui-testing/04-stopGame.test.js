const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('Start a quiz', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.NavigationMenu_menu_links__3uHzw > div').eq(1).click();
    const gameName = 'cypress test';
    cy.get('input[class="form-control"]').focus().type(gameName);
    cy.get('.modal-footer > button').click();
    cy.get(':nth-child(3) > .card-body > .btn-outline-secondary').click();
  });
});
