import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export function StopQuizModal (props) {
  StopQuizModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    sessionId: PropTypes.number,
  };

  const navigate = useNavigate();

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Ended</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Would you like to view the results?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={() => navigate(`/quiz/admin/results/${props.sessionId}`)}>
            View Results
          </Button>
          <Button variant='danger' onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StopQuizModal;
