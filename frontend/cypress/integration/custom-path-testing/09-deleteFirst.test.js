const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('delete the first question', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    // Edit the 1st Question
    cy.get(
      ':nth-child(3) > .card-body > .QuizQuestionCard_container_flex__2ri_9 > .QuizQuestionCard_test__OdXmk > .QuizQuestionCard_question_controls__fT5k3 > .QuizQuestionCard_delete_btn__2ExlT'
    ).click();
    cy.get('.modal-footer > .btn').click();
    cy.contains('DummmmmmyQuestion3');
  });
});
