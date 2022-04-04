import React, { useState } from 'react';
import { loginAPI } from '../api.js';
import PropTypes from 'prop-types';

export function LoginForm ({ success }) {
  LoginForm.propTypes = {
    success: PropTypes.func.isRequired
  };

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
      <div className='card'>
        <div className="card-body">
          <h5 className="card-title">Email Address</h5>
          <input onChange={event => setEmail(event.target.value)} type="text" placeholder='Email'/>
          <h5 className="card-title">Password</h5>
          <input onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'/>
          <button onClick={() => loginUser(email, password)} className='btn btn-success'>Login</button>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
