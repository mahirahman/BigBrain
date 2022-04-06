import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { registerAPI } from '../api.js';

export function RegisterForm ({ success }) {
  RegisterForm.propTypes = {
    success: PropTypes.func.isRequired
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (name, email, password) => {
    const data = await registerAPI(name, email, password);
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
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Name</h5>
          <input
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Name"
          />
          <h5 className="card-title">Email</h5>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="text"
            placeholder="Email"
          />
          <h5 className="card-title">Password</h5>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <h5 className="card-title">Confirm Password</h5>
          <input
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
          />
          <button
            onClick={() => registerUser(name, email, password)}
            className="btn btn-success"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
