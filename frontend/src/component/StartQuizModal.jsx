import React from 'react';
import PropTypes from 'prop-types'
import { Modal, Button, InputGroup, FormControl, Tooltip, Overlay } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';
import style from '../css/StartStopQuizModal.module.css';

export function StartQuizModal (props) {
  StartQuizModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    sessionId: PropTypes.number,
  };

  const [show, setShow] = React.useState(false);
  const target = React.useRef(null);

  // On click it will copy the play quiz url to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/quiz/${props.sessionId}`);
    setShow(!show);
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Quiz Started</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
          <FormControl
            value={props.sessionId}
            disabled
            aria-label="Session ID"
            aria-describedby="Disabled Input Box for Session ID"
          />
          <InputGroup.Text ref={target} onClick={() => copyToClipboard()} className={style.copy_to_clipboard}>
            <FaCopy/>
          </InputGroup.Text>
          <Overlay target={target.current} show={show} placement="bottom">
            <Tooltip>
              Copied!
            </Tooltip>
          </Overlay>
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StartQuizModal;
