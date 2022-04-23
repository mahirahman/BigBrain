import React from 'react';
import { registerAPI } from '../util/api';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';

export function RegisterForm ({ success }) {
  RegisterForm.propTypes = {
    success: PropTypes.func.isRequired
  };

  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerName, setRegisterName] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState('');

  const registerUser = async (registerEmail, registerName, registerPassword, registerConfirmPassword) => {
    // Check if user had enetered all required fields
    if (!registerEmail || !registerName || !registerPassword) {
      alert('Please fill in all fields.');
      return;
    }
    // Check if email is valid regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      alert('Please enter a valid email address.');
      return;
    }
    // Check registerPassword length is => 8
    if (registerPassword.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
    // Check if passwords match
    if (registerPassword !== registerConfirmPassword) {
      alert('The two passwords do not match.');
      return;
    }

    // If all the inputs are succesfull then register the user
    const data = await registerAPI(registerName, registerEmail, registerPassword);
    if (data.error) {
      alert(data.error);
      return;
    }
    localStorage.setItem('authToken', data.token);
    success();
  };

  return (
    <>
      <Card className={style.card}>
        <Card.Body>
          <Card.Title className={style.card_title}>Name</Card.Title>
          <input className={style.form_input} onChange={event => setRegisterName(event.target.value)} type="text" placeholder='Name'/>
          <Card.Title className={style.card_title}>Email</Card.Title>
          <input className={style.form_input} onChange={event => setRegisterEmail(event.target.value)} type="text" placeholder='Email'/>
          <Card.Title className={style.card_title}>Password</Card.Title>
          <input className={style.form_input} onChange={event => setRegisterPassword(event.target.value)} type="password" placeholder='Password'/>
          <Card.Title className={style.card_title}>Confirm Password</Card.Title>
          <input className={style.form_input} onChange={event => setRegisterConfirmPassword(event.target.value)} type="password" placeholder='Confirm Password'/>
          <Button className={style.btn_width} onClick={() => registerUser(registerEmail, registerName, registerPassword, registerConfirmPassword)} variant='success'>Sign Up</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default RegisterForm;
