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
    console.log('Error:', error);
  }
  return await response.json();
};

export const loginAPI = async (email, password) => {
  return await fetchAPI('/admin/auth/login', 'POST', {
    email,
    password
  });
};

export const getAllQuizDataAPI = async () => {
  return await fetchAPI('/admin/quiz', 'GET');
};

export const getQuizDataAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'GET');
};

export const createQuizAPI = async (name) => {
  return await fetchAPI('/admin/quiz/new', 'POST', {
    name,
  });
};

export const deleteQuizAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'DELETE');
};

export const updateQuizAPI = async (quizID, questions, name, thumbnail) => {
  return await fetchAPI(`/admin/quiz/${quizID}`, 'PUT', {
    questions,
    name,
    thumbnail
  });
};

export const startQuizAPI = async (quizID) => {
  return await fetchAPI(`/admin/quiz/${quizID}/start`, 'POST');
};

export const registerAPI = async (name, email, password) => {
  return await fetchAPI('/admin/auth/register', 'POST', {
    name,
    email,
    password
  });
};

export const logoutUserAPI = async () => {
  return await fetchAPI('/admin/auth/logout', 'POST');
};
