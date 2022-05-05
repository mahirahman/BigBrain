import React from 'react';
import { registerAPI } from '../util/api';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';
import { setTokenLocalStorage } from '../util/helper';
import Notification from './Notification';

export function RegisterForm ({ success }) {
  RegisterForm.propTypes = {
    success: PropTypes.func.isRequired
  };

  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerName, setRegisterName] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = React.useState('');

  const [showNotification, setShowNotification] = React.useState(false);
  const [notifcationMsg, setNotifcationMsg] = React.useState('');
  const [notificationTitle, setNotifcationTitle] = React.useState('');
  const [variant, setVariant] = React.useState('primary');
  const [error, setError] = React.useState(true);

  // Adds a custom notification to the page
  const addNotification = (title, msg, variant, error) => {
    setNotifcationTitle(title);
    setNotifcationMsg(msg);
    setVariant(variant);
    setError(error);
    setShowNotification(true);
  };

  const registerUser = async (registerEmail, registerName, registerPassword, registerConfirmPassword) => {
    // Check if user had enetered all required fields
    if (!registerEmail || !registerName || !registerPassword) {
      addNotification('Error', 'Please fill in all fields', 'danger', true);
      return;
    }
    // Check if email is valid regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerEmail)) {
      addNotification('Error', 'Please enter a valid email address', 'danger', true);
      return;
    }
    // Check registerPassword length is => 8
    if (registerPassword.length < 8) {
      addNotification('Error', 'Password must be at least 8 characters long', 'danger', true);
      return;
    }
    // Check if passwords match
    if (registerPassword !== registerConfirmPassword) {
      addNotification('Error', 'The passwords do not match', 'danger', true);
      return;
    }

    // If all the inputs are succesfull then register the user
    const data = await registerAPI(registerName, registerEmail.toLowerCase(), registerPassword);
    if (data.error) {
      addNotification('Error', data.error, 'danger', true);
      return;
    }
    setTokenLocalStorage(data.token);
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
      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        message={notifcationMsg}
        notificationTitle={notificationTitle}
        variant={variant}
        error={error}
      />
    </>
  );
}

export default RegisterForm;
