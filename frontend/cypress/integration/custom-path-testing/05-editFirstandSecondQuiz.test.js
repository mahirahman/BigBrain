const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Edit first and second questions', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    // Edit the 1st Question
    cy.get(
      ':nth-child(3) > .card-body > .QuizQuestionCard_container_flex__2ri_9 > .QuizQuestionCard_test__OdXmk > .QuizQuestionCard_question_controls__fT5k3 > .QuizQuestionCard_edit_btn__2-T2E'
    ).click();
    cy.get('.AddEditQuestion_select_question_type_border__35dq1').select(
      'Multiple Choice'
    );
    cy.get(':nth-child(5) > .form-control').focus().type('DummmyAnswer1');
    cy.get(':nth-child(8) > .form-control').focus().type('1,3');
    cy.get('.btn-outline-success').click();
    cy.get(':nth-child(12) > .form-control').selectFile(
      'cypress/fixtures/pics/earth-icon.png'
    );
    cy.get('.btn-primary').click();
    // Edit the 2nd Question
    cy.get('.NavigationMenu_menu_links__3uHzw > :nth-child(1)').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    cy.get(
      ':nth-child(4) > .card-body > .QuizQuestionCard_container_flex__2ri_9 > .QuizQuestionCard_test__OdXmk > .QuizQuestionCard_question_controls__fT5k3 > .QuizQuestionCard_edit_btn__2-T2E'
    ).click();
    cy.get(':nth-child(8) > .form-control').focus().type('120');
    cy.get('.btn-primary').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Time limit must not exceed 90 seconds');
    });
  });
});
