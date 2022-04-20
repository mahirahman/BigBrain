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

export const getAverageAnswerTime = (results) => {
  let totalTime = 0;
  results.forEach(result => {
    totalTime += new Date(result.answeredAt) - new Date(result.questionStartedAt)
  })
  const totalTimeSecs = parseFloat((totalTime / 1000).toFixed(1));
  return totalTimeSecs / getTotalAnswers(results);
};
