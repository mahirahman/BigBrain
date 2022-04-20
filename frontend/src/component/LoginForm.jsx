import React from 'react';
import { loginAPI } from '../util/api';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';

export function LoginForm ({ success }) {
  LoginForm.propTypes = {
    success: PropTypes.func.isRequired
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Using the login API to log in the user
  const loginUser = async (email, password) => {
    const data = await loginAPI(email, password);
    if (data.error) {
      alert(data.error);
      return;
    }
    // Set the authToken in localStorage
    localStorage.setItem('authToken', data.token);
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
          <Button className={style.btn_width} onClick={() => loginUser(email, password)} variant='success'>Sign In</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default LoginForm;
