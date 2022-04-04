import React, { useState } from 'react';
import { loginAPI } from '../api.js';

export function LoginForm ({ success }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (email, password) => {
    const data = await loginAPI(email, password)
    if (data.error) {
      alert(data.error);
      return;
    }
    localStorage.setItem('authToken', data.token);
    console.log(localStorage.getItem('authToken'));
    success();
  };

  return (
    <>
      <input onChange={event => setEmail(event.target.value)} type="text" placeholder='Email'/><br/>
      <input onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'/><br/>
      <button onClick={() => loginUser(email, password)}>Login</button>
    </>
  );
}

export default LoginForm;
