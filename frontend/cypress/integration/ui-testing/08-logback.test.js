const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('Logs Back', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.NavigationMenu_menu_links__3uHzw > div')
      .eq(2)
      .click()
      .should(() => {
        expect(localStorage.getItem('Key')).to.be.null;
        expect(localStorage.getItem('Value')).to.be.null;
      });
    cy.contains('Sign in to your account');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.contains('View My Games');
  });
});
