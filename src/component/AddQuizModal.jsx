import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/AddQuizModal.module.css';
import { createQuizAPI } from '../util/api';
import Notification from './Notification';

export function AddQuizModal (props) {
  AddQuizModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    reRender: PropTypes.func
  };

  // New game name state
  const [newGameName, setNewGameName] = React.useState('');

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

  // Submits new game name to API
  const submitNewGame = async (name) => {
    // Validates the game name.
    if (name.length < 4) {
      addNotification('Error', 'Please enter a name with at least 4 characters', 'danger', true);
      return;
    } else if (name.length > 36) {
      addNotification('Error', 'Quiz name must be less than 36 characters', 'danger', true);
      return;
    }
    // Submit the name to the create quiz API
    const data = await createQuizAPI(name);
    if (data.error) {
      addNotification('Error', data.error, 'danger', true);
      return;
    }
    // Rerender the quizzes page
    if (props.reRender) props.reRender((r) => !r);
    props.handleClose();
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className={style.add_game_spacing}>
            <InputGroup.Text>Game Name</InputGroup.Text>
            <FormControl aria-label="Game name" onChange={event => setNewGameName(event.target.value)}/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={ () => submitNewGame(newGameName)}>
            Add Game
          </Button>
        </Modal.Footer>
      </Modal>
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

export default AddQuizModal;
