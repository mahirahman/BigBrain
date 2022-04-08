import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import style from '../css/ModalMenu.module.css';

export function AddGameInput () {
  return (
    <>
      <InputGroup className={style.add_game_padding}>
        <InputGroup.Text>Game Name</InputGroup.Text>
        <FormControl aria-label="Game name"/>
      </InputGroup>
    </>
  );
}

export default AddGameInput;
