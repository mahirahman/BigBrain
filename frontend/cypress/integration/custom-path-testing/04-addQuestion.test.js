const { it } = require('eslint/lib/rule-tester/rule-tester');
const { describe } = require('eslint/lib/rule-tester/rule-tester');

describe('UI custom path testing', () => {
  it('Add Questions', () => {
    cy.visit('localhost:3000/');
    cy.get('input[placeholder="Email"]').focus().type('someone@mail.com');
    cy.get('input[placeholder="Password"]').focus().type('password');
    cy.get('button[type=button]').click();
    cy.get('.QuizCard_quiz_card__35WOr.card').eq(0).click();
    // add 1st question
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
    // add 2nd question
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
      'cypress/fixtures/pics/earth-icon.png'
    );
    cy.get('.modal-footer > .btn').click();
    cy.contains('Question 2');
    // add 3rd question
    cy.get('.EditQuizCard_add_question__aV3vI > .btn').click();
    cy.get('.AddEditQuestion_center_btn__3s2_d > :nth-child(1) > .form-control')
      .focus()
      .type('DummmmmmyQuestion3');
    cy.get(
      '.AddEditQuestion_question_type_container__rSWJ_ > .AddEditQuestion_input_spacing__NGIb4'
    ).select('Multiple Choice');
    cy.get('.btn-outline-primary').click();
    cy.get('.btn-outline-primary').click();
    cy.get('.btn-outline-primary').click();
    cy.get(':nth-child(3) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(4) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(5) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(6) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(7) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(8) > .form-control').focus().type('DummmmyAnswer3');
    cy.get(':nth-child(11) > .form-control').focus().type('1,3');
    cy.get(':nth-child(12) > .form-control').focus().type('10');
    cy.get(':nth-child(13) > .form-control').focus().type('10');
    cy.get(':nth-child(15) > .form-control')
      .focus()
      .type('https://www.youtube.com/watch?v=5xyMYPkBO_o&t=2254s');
    cy.get('.modal-footer > .btn').click();
    cy.contains('Question 3');
    // 4th question multiple choice (no embed) (3 answers) (correct answer = 1,4)
    cy.get('.EditQuizCard_add_question__aV3vI > .btn').click();
    cy.get('.AddEditQuestion_center_btn__3s2_d > :nth-child(1) > .form-control')
      .focus()
      .type('DummmmmmyQuestion4');
    cy.get(
      '.AddEditQuestion_question_type_container__rSWJ_ > .AddEditQuestion_input_spacing__NGIb4'
    ).select('Multiple Choice');
    cy.get(':nth-child(3) > .form-control').focus().type('DummmmyAnswer4');
    cy.get(':nth-child(4) > .form-control').focus().type('DummmmyAnswer4');
    cy.get(':nth-child(5) > .form-control').focus().type('DummmmyAnswer4');
    cy.get(':nth-child(8) > .form-control').focus().type('1,4');
    cy.get(':nth-child(9) > .form-control').focus().type('10');
    cy.get(':nth-child(10) > .form-control').focus().type('10');
    cy.get('.modal-footer > .btn').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains(
        'Please select a correct answer that is in the answer inputs'
      );
    });
  });
});
