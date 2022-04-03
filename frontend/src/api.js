/* eslint-disable */
import { authToken } from "./App";

const fetchAPI = (path, method, body) => {
    return new Promise((resolve, reject) => {
      const init = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: (path === '/admin/auth/logout') ? undefined : authToken,
        },
        body: method === 'GET' ? undefined : JSON.stringify(body),
      };
  
      fetch(`http://localhost:5005${path}`, init)
        .then((response) => response.json())
        .then((body) => {
          if (body.error) {
            console.log('Error:', body.error);
            return;
          } else {
            resolve(body);
          }
        }).catch(error => console.log('Error:', error));
    });
  };
  
export const loginAPI = (email, password) => {
    return fetchAPI('/admin/auth/login', 'POST', {
      email,
      password,
    });
  };