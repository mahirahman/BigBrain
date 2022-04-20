const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI testing', () => {
  it('Stop a quiz', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('jane.doe@gmail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    // Manually end previous quiz from 04-startGame.test.js
    cy.get('.btn-outline-dark').click();
    // it should pop up an alert
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Quiz has no active session');
    });
  });
});
