import React, { useState } from 'react';
import { loginAPI } from './api.js';
import './App.css';

/* eslint-disable */

export let authToken = null;

const loginUser = (email, password) => {
  loginAPI(email, password).then((data) => {
    authToken = data.token;
    console.log(data);
})};

function App () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <input onChange={event => setEmail(event.target.value)} type="text" placeholder='Email'/><br/>
      <input onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'/><br/>
      <button onClick={() => loginUser(email, password)}>Login</button>
    </>
  );
};

export default App;