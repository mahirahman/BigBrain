const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Update the quiz', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    // Rename
    cy.get(':nth-child(1) > .form-control')
      .eq(0)
      .focus()
      .type('Custom - version 2');
    // Upload the thumbnail
    cy.get('.EditQuizCard_input_spacing__2lL5w.input-group > input')
      .eq(1)
      .selectFile('cypress/fixtures/pics/earth-icon.png');
    cy.get('.EditQuizCard_save_changes__3TdcL.btn.btn-success').click();
  });
});
