import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../css/LoginRegisterForm.module.css';
import { playJoinAPI } from '../util/api';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

export function JoinGameForm (props) {
  JoinGameForm.propTypes = {
    sessionId: PropTypes.string.isRequired,
  };

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');

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

  // Join a game
  const joinGame = async () => {
    // Check if user inputted a username
    if (!username) {
      addNotification('Error', 'Please enter a username', 'danger', true);
      return;
    }
    else if (username.length > 20) {
      addNotification('Error', 'Username must be less than 20 characters', 'danger', true);
      return;
    }
    // Allow the user to join the session using the API
    const data = await playJoinAPI(props.sessionId, username);
    if (data.error) {
      addNotification('Error', data.error, 'danger', true);
      return;
    }
    // Navigate to the lobby page and send the playerId data as a location state object
    navigate(`/quiz/lobby/${props.sessionId}`, { state: { playerIdFromPreviousPage: data.playerId } });
  };

  return (
    <>
      <Card>
        <Card.Body>
        <Card.Title className={style.card_title}>Session ID</Card.Title>
        <input disabled className={style.form_input} type="text" placeholder='Please enter a quiz session number' defaultValue={props.sessionId}/>
        <Card.Title className={style.card_title}>Username</Card.Title>
        <input className={style.form_input} onChange={event => setUsername(event.target.value)} type="text" placeholder='Pick a username for this quiz'/>
        <Button className={style.join_game_btn} onClick={() => joinGame()} variant='success'>Join Game</Button>
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

export default JoinGameForm;
