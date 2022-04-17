const { it } = require('eslint/lib/rule-tester/rule-tester');

context('Signup flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });
  it('Successfully signs up', () => {
    const name = 'Jane Doe';
    const email = 'jane.doe@gmail.com';
    const password = 'password';
    const confirmPassword = 'password';

    cy.get('input[placeholder="Name"]').focus().type(name);
    cy.get('input[placeholder="Email"]').focus().type(email);
    cy.get('input[placeholder="Password"]').focus().type(password);
    cy.get('input[placeholder="Confirm Password"]')
      .focus()
      .type(confirmPassword);
    cy.get('button[type=button]').click();
  });
});
