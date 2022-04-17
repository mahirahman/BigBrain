import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../css/LoginRegisterForm.module.css';
import { playJoinAPI } from '../util/api';
import { useNavigate } from 'react-router-dom';

export function JoinGameForm (props) {
  JoinGameForm.propTypes = {
    sessionId: PropTypes.string.isRequired,
  };

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');

  const joinGame = async () => {
    // Check if user inputted a username
    if (!username) {
      alert('Please enter a username');
      return;
    }
    // Allow the user to join the session
    // Get the data from the API
    const data = await playJoinAPI(props.sessionId, username);
    if (data.error) {
      alert(data.error);
      return;
    }
    // Navigate to the play page and send the playerId data as a location object
    navigate(`/quiz/lobby/${props.sessionId}`, { state: { playerId: data.playerId } });
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
