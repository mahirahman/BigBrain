const { describe } = require('eslint/lib/rule-tester/rule-tester');
const { it } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Register Successfully', () => {
    cy.visit('localhost:3000/register');
    cy.get('input[placeholder="Name"]').focus().type('Someone');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('input[placeholder="Confirm Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a valid email address.');
    });
    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('button[type=button]').click();
  });
});
