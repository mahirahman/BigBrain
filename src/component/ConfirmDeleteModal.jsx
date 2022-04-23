import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap';

export function ConfirmDeleteModal (props) {
  ConfirmDeleteModal.propTypes = {
    name: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you wish to delete this {props.type}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.onSubmit}>
            Delete {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmDeleteModal;
