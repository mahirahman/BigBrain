// Base function for fetching the API, processes the method, header, auth and body
const fetchAPI = async (path, method, body) => {
  const init = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        path === '/admin/auth/logout' ||
        path.includes('/admin/quiz') ||
        path.includes('/admin/session')
          ? `Bearer ${localStorage.getItem('authToken')}`
          : undefined
    },
    body: method === 'GET' ||
    path === '/admin/quiz' ||
    path.includes('/start')
      ? undefined
      : JSON.stringify(body)
  };

  let response;
  try {
    response = await fetch(`http://localhost:5005${path}`, init);
  } catch (error) {
    alert(`Error: ${error}`);
    console.log('Error:', error);
  }
  return await response.json();
};

// Given correct admin credentials, return an authorised access token to make subsequent admin calls
export const loginAPI = async (email, password) => {
  return await fetchAPI('/admin/auth/login', 'POST', {
    email,
    password
  });
};

// Send registration request for someone to join BigBrain as an admin
export const registerAPI = async (name, email, password) => {
  return await fetchAPI('/admin/auth/register', 'POST', {
    name,
    email,
    password
  });
};

// Invalid a particular authorised token
export const logoutUserAPI = async () => {
  return await fetchAPI('/admin/auth/logout', 'POST');
};

// Get a list of the meta-data for all BigBrain quizzes
export const getAllQuizDataAPI = async () => {
  return await fetchAPI('/admin/quiz', 'GET');
};

// Collect all of the data pertaining to a particular quiz of BigBrain
export const getQuizDataAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'GET');
};

// Create a new empty BigBrain quiz
export const createQuizAPI = async (name) => {
  return await fetchAPI('/admin/quiz/new', 'POST', {
    name,
  });
};

// Delete a particular game of Big Brain
export const deleteQuizAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'DELETE');
};

// Update all of the details of a particular quiz of BigBrain
export const updateQuizAPI = async (quizID, questions, name, thumbnail) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'PUT', {
    questions,
    name,
    thumbnail
  });
};

// Start a new session/game for a BigBrain quiz
export const startQuizAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}/start`, 'POST');
};

// End the active session/game for a BigBrain quiz
export const endQuizAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}/end`, 'POST');
};

// Advance the game on to the next question
export const advanceQuizQuestionAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}/advance`, 'POST');
};

// Get the current status for a quiz session
export const getSessionStatusAdminAPI = async (sessionID) => {
  return await fetchAPI(`/admin/session/${sessionID}/status`, 'GET');
}

// Join an active session as a new player
export const playJoinAPI = async (sessionID, name) => {
  return await fetchAPI(`/play/join/${sessionID}`, 'POST', {
    name,
  });
};

// For the current session, the player can determine if it's started or not
export const getSessionStatusAPI = async (playerID) => {
  return await fetchAPI(`/play/${playerID}/status`, 'GET');
};

// For the current question that session is up to, this gets the details of the question
export const getSessionQuestionAPI = async (playerID) => {
  return await fetchAPI(`/play/${playerID}/question`, 'GET');
};
