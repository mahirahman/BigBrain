import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/ModalMenu.module.css';
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
    }
    if (name.length > 64) {
      alert('Game name must be less than 64 characters');
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
          <InputGroup className={style.add_game_padding}>
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
