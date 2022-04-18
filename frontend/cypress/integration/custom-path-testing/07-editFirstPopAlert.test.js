const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Remove answers of the first question', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    // Edit the 1st Question
    cy.get(
      ':nth-child(3) > .card-body > .QuizQuestionCard_container_flex__2ri_9 > .QuizQuestionCard_test__OdXmk > .QuizQuestionCard_question_controls__fT5k3 > .QuizQuestionCard_edit_btn__2-T2E'
    ).click();
    // Remove answers
    cy.get(
      '.AddEditQuestion_add_remove_input_box__2Vk-f.btn-outline-danger'
    ).click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('You must have at least 3 answers');
    });
  });
});
