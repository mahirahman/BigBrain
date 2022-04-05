import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

export function RegisterForm ({ submit }) {
  RegisterForm.propTypes = {
    submit: PropTypes.func.isRequired
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    submit(name, email, password);
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
          <button onClick={onSubmit} className="btn btn-success">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
