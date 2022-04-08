import React from 'react';
import { Button, Modal, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/ModalMenu.module.css';

export function AddGameModal (props) {
  const [newGameName, setNewGameName] = React.useState('');

  AddGameModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
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
            <FormControl aria-label="Game name" onClick={event => setNewGameName(event.target.value)}/>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={console.log(newGameName)}>
            Add Game
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGameModal;
