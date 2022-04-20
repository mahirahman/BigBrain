const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('load result', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    // Log in now
    // start the game
    cy.get('.btn-outline-success').click();
    cy.contains('Quiz Started');
    cy.get('.modal-footer > .btn').click();
    // end the game
    cy.get('.btn-outline-secondary').click();
    // load result page
    cy.get('.btn-success').click();
    // show the result page
    cy.contains('Results');
  });
});
