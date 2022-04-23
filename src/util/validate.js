import { fileToDataUrl } from '../util/helper';

// Given a string, check if the string is a valid youtube URL.
// Returns true if the string is not given, otherwise checks the string and returns false if
// does not match the regex.
// If it matches the regex pattern then iit returns the video id.
// Source: https://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
export const validateYoutubeMedia = (url) => {
  if (!url) {
    return true;
  }
  const urlRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url !== null && !url.match(urlRegex)) {
    return false;
  }
  return url.match(urlRegex)[1];
};

export const validateQuestionName = (questionName) => {
  if (!questionName.length) {
    alert('Please enter a name for your new question');
    return false;
  } else if (questionName.length > 64) {
    alert('Game name must be less than 64 characters');
    return false;
  }
  return true;
};

export const validateQuestionTimeLimit = (timeLimit) => {
  if (timeLimit === null) {
    alert('Please enter a time limit for your question');
    return false;
  } else if (timeLimit < 10) {
    alert('Time limit must be at least 10 seconds');
    return false;
  } else if (timeLimit > 90) {
    alert('Time limit must not exceed 90 seconds');
    return false;
  }
  return true;
};

export const validateQuestionPoints = (points) => {
  if (points === null) {
    alert('Please enter a point value for your question');
    return false;
  } else if (points < 1) {
    alert('Point value must be at least 1');
    return false;
  } else if (points > 10000) {
    alert('Point value must not exceed 10000');
    return false;
  }
  return true;
};

export const validateAnswerInputs = (answerInputs) => {
  // Check all the answer inputs for empty strings
  const emptyAnswerInputs = [];
  answerInputs.forEach(answer => {
    try {
      if (answer.answer.length === 0) {
        emptyAnswerInputs.push(answer.id);
      }
    } catch {
      emptyAnswerInputs.push(answer.id);
    }
  });
  if (emptyAnswerInputs.length > 0) {
    alert('Please enter an answer for all the answer inputs');
    return false;
  }
  return true;
};

export const validateCorrectAnswer = (correctAnswer, questionType, answerInputs) => {
  if (correctAnswer.length === 0) {
    alert('Please select a correct answer');
    return false;
  }
  const split = correctAnswer.split(',');
  // Convert the string of correct answers to an array of integers
  const arrOfCorrectAnswersNum = [];
  split.forEach(str => {
    arrOfCorrectAnswersNum.push(Number(str));
  });
  // Remove duplicates from the array of integers
  const uniqueCorrectAnswersNum = [...new Set(arrOfCorrectAnswersNum)];

  // Check if the correct answers are in the answer inputs
  const correctAnswersInAnswerInputs = [];
  answerInputs.forEach(answer => {
    if (uniqueCorrectAnswersNum.includes(answer.id)) {
      correctAnswersInAnswerInputs.push(answer.id);
    }
  });
  if (correctAnswersInAnswerInputs.length !== uniqueCorrectAnswersNum.length) {
    alert('Please select a correct answer that is in the answer inputs');
    return false;
  }

  if (questionType === 'single-choice') {
    if (correctAnswersInAnswerInputs.length > 1) {
      alert('Please select only 1 correct answer');
      return false;
    }
  } else if (questionType === 'multiple-choice') {
    if (correctAnswersInAnswerInputs.length < 2) {
      alert('Please select at least 2 correct answers');
      return false;
    } else if (correctAnswersInAnswerInputs.length > answerInputs.length) {
      alert('Please select no more than the number of answers');
      return false;
    }
  }
  return [true, correctAnswersInAnswerInputs];
};

export const getBase64 = async (file) => {
  let base64Image;
  try {
    base64Image = await fileToDataUrl(file);
  } catch {
    base64Image = null;
  }
  return base64Image;
};
