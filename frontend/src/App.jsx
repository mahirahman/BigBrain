import React from 'react';
import './App.css';
import { Login } from './components/Login';
import { loginAPI } from './api.js';

export let authToken = null;

export const loginUser = (email, password) => {
  loginAPI(email, password).then((data) => {
    authToken = data.token;
    console.log(data);
    console.log(authToken);
  })
};

// export const registerUser = (email, name, password) => {
//   registerAPI(email, name, password).then((data) => {
//     authToken = data.token;
//     console.log(data);
//     console.log(authToken);
//   })
// };

function App () {
  return (
    <>
      <Login/>
    </>
  );
}

export default App;
