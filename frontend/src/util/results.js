// Get the total number of correct answers
export const numberOfCorrectAnswers = (results) => {
  let correct = 0;
  results.forEach(result => {
    if (result.correct) correct++;
  })
  return correct;
};

export const numberOfIncorrectAnswers = (results) => {
  return getTotalAnswers(results) - numberOfCorrectAnswers(results);
};

// Get the total number of answers
export const getTotalAnswers = (results) => {
  return results.length;
};

// Get the total number of answers
export const getTotalUsers = (results) => {
  return results.length;
};

// Gets the average time taken for a user to answer a question
export const getAverageAnswerTime = (results) => {
  let totalTime = 0;
  results.forEach(result => {
    totalTime += timeTakenToAnswer(result);
  })
  const totalTimeSecs = parseFloat((totalTime / 1000).toFixed(1));
  return (totalTimeSecs / getTotalAnswers(results)).toFixed(2);
};

// Gets the time taken to answer a question
export const timeTakenToAnswer = (result) => {
  return new Date(result.answeredAt) - new Date(result.questionStartedAt)
};

// Gets the total score of a set of users
export const getTotalScoreUser = (resultAnswers, questions) => {
  let totalScore = 0;
  resultAnswers.forEach((resultAnswer, index) => {
    if (resultAnswer.correct) {
      totalScore += questions[index].points;
    }
  })
  return totalScore;
};

export const getavg = (resultAnswers, questionsLength) => {
  // Create a zero array of size questionsLength
  const correctAnswersArr = new Array(questionsLength).fill(0);
  console.log(correctAnswersArr);

  resultAnswers.forEach((resultAnswer, index) => {
    if (resultAnswer.correct) {
      // correctAnswer += 1;
      correctAnswersArr[index] += 1;
    }
  });
  return correctAnswersArr;
};
