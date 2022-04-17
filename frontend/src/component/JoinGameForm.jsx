import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../css/LoginRegisterForm.module.css';

export function JoinGameForm (props, { success }) {
  JoinGameForm.propTypes = {
    sessionId: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired
  };

  const [username, setUsername] = React.useState('');

  const joinGame = () => {
    // Check if user inputted a username
    if (!username) {
      alert('Please enter a username');
      return;
    }
    // Check if sessionId is valid
    console.log(props.sessionId);
    props.success();
  };

  return (
    <>
      <Card>
        <Card.Body>
        <Card.Title className={style.card_title}>Session ID</Card.Title>
        <input className={style.form_input} onChange={event => console.log(event.target.value)} type="text" placeholder='Please enter a quiz session number' value={props.sessionId}/>
        <Card.Title className={style.card_title}>Username</Card.Title>
        <input className={style.form_input} onChange={event => setUsername(event.target.value)} type="text" placeholder='Pick a username for this quiz'/>
        <Button className={style.join_game_btn} onClick={() => joinGame()} variant='success'>Join Game</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default JoinGameForm;
