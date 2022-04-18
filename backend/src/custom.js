/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  const newQuestion = {
    questionId: question.questionId,
    question: question.question,
    type: question.type,
    answers: question.answers,
    timeLimit: question.timeLimit,
    points: question.points,
    embed: question.embed,
  }
  return newQuestion;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  return question.correctAnswer;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  allAnswerIds = [];
  (question.answers).forEach(answer => {
    allAnswerIds.push(answer.id)
  });
  return allAnswerIds;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.timeLimit;
};
