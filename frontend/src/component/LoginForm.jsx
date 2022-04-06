import React, { useState } from 'react';
import { loginAPI } from '../api.js';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';

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
      <Card className={style.card}>
        <Card.Body>
          <Card.Title className={style.card_title}>Email Address</Card.Title>
          <input className={style.form_input} onChange={event => setEmail(event.target.value)} type="text" placeholder='Email'/>
          <Card.Title className={style.card_title}>Password</Card.Title>
          <input className={style.form_input} onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'/>
          <Button className={style.btn_width}onClick={() => loginUser(email, password)} variant='success'>Sign In</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginForm;
