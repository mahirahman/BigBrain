import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types'

export function ModalMenu (props) {
  ModalMenu.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    body: PropTypes.element.isRequired,
    modalTitle: PropTypes.string.isRequired,
    btnVariant: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired
  };
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <props.body/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant={props.btnVariant} onClick={props.handleClose}>
            {props.btnText}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalMenu;
