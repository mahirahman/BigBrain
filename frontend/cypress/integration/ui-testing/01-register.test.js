const { describe } = require('eslint/lib/rule-tester/rule-tester');
const { it } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('Register Successfully', () => {
    cy.visit('localhost:3000/register');
    cy.get('input[placeholder="Name"]').focus().type('Jane Doe');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('input[placeholder="Confirm Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.contains('View My Games');
  });
});
