const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('Start a quiz', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.btn-outline-success').click();
    cy.contains('Quiz Started');
  });
});
