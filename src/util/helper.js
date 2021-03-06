// Calculates the difference between two dates and returns the formatted string.
// Some code sourced from - https://bobbyhadz.com/blog/javascript-check-if-date-is-within-24-hours

export const formatDateString = (date) => {
  const oldDate = new Date(date);
  const currDate = new Date();

  // Calculate the difference in milliseconds.
  const msBetweenDates = Math.abs(oldDate.getTime() - currDate.getTime());
  // Convert milliseconds to hours.
  const hoursBetweenDates = msBetweenDates / (60 * 60 * 1000);

  const hours = Math.floor(hoursBetweenDates);
  // Seperate the minutes from the hours.
  const minutes = Math.round((hoursBetweenDates - hours) * 60);

  // If the job was posted today (in the last 24 hours), it should display how many hours and minutes ago it was posted
  if (hoursBetweenDates < 24) {
    const hourPlural = hours > 1 ? 'hours' : 'hour';
    const minutePlural = minutes > 1 ? 'minutes' : 'minute';
    if (hours === 0) {
      if (minutes === 0) return 'Just now';
      return `${minutes} ${minutePlural} ago`;
    }

    return `${hours} ${hourPlural} ${minutes} ${minutePlural} ago`;
  }
  // If the job was posted more than 24 hours ago, it should just display the date DD/MM/YYYY that it was posted
  return `on ${oldDate.getDate()}/${oldDate.getMonth() + 1}/${oldDate.getFullYear()}`;
};

// Converts File objects to Base64 images
// By Hayden Smith - COMP6080
export const fileToDataUrl = (file) => {
  const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'image/gif', 'image/tiff']
  const valid = validFileTypes.find(type => type === file.type);
  // Bad data, let's walk away.
  if (!valid) {
    throw Error('Provided File is not a valid image');
  }

  const reader = new FileReader();
  const dataUrlPromise = new Promise((resolve, reject) => {
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
  });
  reader.readAsDataURL(file);
  return dataUrlPromise;
}

// Disables or re-enables the answer inputs
export const disableInputs = (disable) => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.disabled = disable;
  });
};

// Uncheck or checks the answer inputs
export const checkInputs = (check) => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.checked = check;
  });
};

// Capitalise the first letter of each word in a string
export const capitaliseFirstLetterString = (string) => {
  // Split the string based on "-"
  const words = string.split('-');
  // Each word in the array
  let capitalisedWords = '';
  words.map(word => {
    capitalisedWords = `${capitalisedWords}${word.charAt(0).toUpperCase() + word.slice(1)}`;
    // Add space between words
    if (words.indexOf(word) !== words.length - 1) {
      capitalisedWords += ' '
    }
  });
  return capitalisedWords;
};

// Total time given to complete a quiz.
export const getTotalTimeTaken = (data) => {
  let totalTime = 0;
  data.questions.forEach(question => {
    totalTime += question.timeLimit;
  })
  if (totalTime < 60) {
    return `${totalTime} sec(s)`;
  }
  return `${(totalTime / 60).toFixed(2)} min(s)`;
};

// Set the authToken in localStorage
export const setTokenLocalStorage = (token) => {
  localStorage.setItem('authToken', token);
};

// Get the authToken from localStorage
export const getTokenLocalStorage = () => {
  return localStorage.getItem('authToken');
};
