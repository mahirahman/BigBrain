const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

context('Custom flow', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });
  it('Signs up', () => {
    const name = 'someone';
    const email = 'someone@mail';
    const password = 'password';
    const confirmPassword = 'password';
    // Sign Up Flow
    cy.get('input[placeholder="Name"]').focus().type(name);
    cy.get('input[placeholder="Email"]').focus().type(email);
    cy.get('input[placeholder="Password"]').focus().type(password);
    cy.get('input[placeholder="Confirm Password"]')
      .focus()
      .type(confirmPassword);
    cy.get('button[type=button]').click();
    // Check alert message because of email format
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Please enter a valid email address.');
    });
    cy.get('input[placeholder="Email"]').clear();
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('button[type=button]').click();
    // At this point, successfully sign up
    // Create a quiz
    cy.get('.NavigationMenu_menu_links__3uHzw > div').eq(1).click();
    const gameName = 'custom test';
    cy.get('input[class="form-control"]').focus().type(gameName);
    cy.get('.modal-footer > button').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').click();
    // Rename it to "Custom - version 2"
    cy.get('input[aria-label="Quiz Name"]')
      .eq(0)
      .focus()
      .type('Custom - version 2');
    // Upload the thumbnail
    cy.get('.EditQuizCard_input_spacing__2lL5w.input-group > input')
      .eq(1)
      .selectFile(
        'cypress/integration/custom-path-testing/pics/earth-icon.png'
      );
    // Save name and thumbnail
    cy.get('.EditQuizCard_save_changes__3TdcL.btn.btn-success').click();
    // Add a quiz
    cy.get('.EditQuizCard_add_question__aV3vI > .btn').click();
    cy.get('.AddEditQuestion_center_btn__3s2_d > :nth-child(1) > .form-control')
      .focus()
      .type('DummmmmmyQuestion1');
    cy.get(':nth-child(3) > .form-control').focus().type('DummmmyAnswer1');
    cy.get(':nth-child(4) > .form-control').focus().type('DummmmyAnswer1');
    cy.get(':nth-child(7) > .form-control').focus().type('1');
    cy.get(':nth-child(8) > .form-control').focus().type('10');
    cy.get(':nth-child(9) > .form-control').focus().type('10');
    cy.get('.modal-footer > .btn').click();
    // Test the quiz showing on the screen
    cy.contains('Question 1');
    // Add 2nd question single choice (embed)
    cy.get('.EditQuizCard_add_question__aV3vI > .btn').click();
    cy.get('.AddEditQuestion_center_btn__3s2_d > :nth-child(1) > .form-control')
      .focus()
      .type('DummmmmmyQuestion2');
    cy.get(':nth-child(3) > .form-control').focus().type('DummmmyAnswer2');
    cy.get(':nth-child(4) > .form-control').focus().type('DummmmyAnswer2');
    cy.get(':nth-child(7) > .form-control').focus().type('1');
    cy.get(':nth-child(8) > .form-control').focus().type('10');
    cy.get(':nth-child(9) > .form-control').focus().type('10');
    cy.get('label[class="btn btn-outline-success"]').click();
    cy.get(':nth-child(11) > .form-control').selectFile(
      'cypress/integration/custom-path-testing/pics/earth-icon.png'
    );
    cy.get('.modal-footer > .btn').click();
  });
});
