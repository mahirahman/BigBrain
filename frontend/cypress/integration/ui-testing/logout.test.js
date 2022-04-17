const { it } = require('eslint/lib/rule-tester/rule-tester');

context('Logout flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/');
  });
  it('Successfully log in', () => {
    const email = 'jane.doe@gmail.com';
    const password = 'password';

    cy.get('input[placeholder="Email"]').focus().type(email);
    cy.get('input[placeholder="Password"]').focus().type(password);
    cy.get('button[type=button]').click();
    cy.get('.NavigationMenu_menu_links__3uHzw > div')
      .eq(2)
      .click()
      .should(() => {
        expect(localStorage.getItem('Key')).to.be.null;
        expect(localStorage.getItem('Value')).to.be.null;
      });
    cy.contains('Sign in to your account');
  });
});
