import React, { useState } from 'react';
import { loginUser } from '../App';

export function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <input onChange={event => setEmail(event.target.value)} type="text" placeholder='Email'/><br/>
      <input onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'/><br/>
      <button onClick={() => loginUser(email, password)}>Login</button>
    </>
  );
}

export default Login;
