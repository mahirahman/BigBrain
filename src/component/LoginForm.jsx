import React from 'react';
import { loginAPI } from '../util/api';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../css/LoginRegisterForm.module.css';
import { setTokenLocalStorage } from '../util/helper';
import Notification from './Notification';

export function LoginForm ({ success }) {
  LoginForm.propTypes = {
    success: PropTypes.func.isRequired
  };

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

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

  // Using the login API to log in the user
  const loginUser = async (email, password) => {
    const data = await loginAPI(email.toLowerCase(), password);
    if (data.error) {
      addNotification('Error', data.error, 'danger', true);
      return;
    }
    // Set the authToken in localStorage
    setTokenLocalStorage(data.token);
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

export default LoginForm;
