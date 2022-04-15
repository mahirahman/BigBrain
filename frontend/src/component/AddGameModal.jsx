import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/AddGameModal.module.css';
import { createQuizAPI } from '../util/api';

export function AddGameModal (props) {
  const [newGameName, setNewGameName] = React.useState('');

  AddGameModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    reRender: PropTypes.func
  };

  const submitNewGame = async (name) => {
    if (!name.length) {
      alert('Please enter a name for your new game');
      return;
    } else if (name.length < 4) {
      alert('Please enter a name with at least 4 characters');
      return;
    } else if (name.length > 36) {
      alert('Quiz name must be less than 36 characters');
      return;
    }
    const data = await createQuizAPI(name);
    if (data.error) {
      alert(data.error);
      return;
    }
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
    </>
  );
}

export default AddGameModal;
