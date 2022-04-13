import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap';

export function ConfirmDeleteModal (props) {
  ConfirmDeleteModal.propTypes = {
    name: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    deleteQuiz: PropTypes.func.isRequired
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you wish to delete this game?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.deleteQuiz}>
            Delete Quiz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDeleteModal;
