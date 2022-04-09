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
    path === '/admin/auth/logout'
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

export const getQuizDataAPI = async () => {
  return await fetchAPI('/admin/quiz', 'GET');
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
