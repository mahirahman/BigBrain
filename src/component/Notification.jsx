import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastContainer } from 'react-bootstrap';
import { BiError } from 'react-icons/bi';
import { ImCheckmark } from 'react-icons/im';
import style from '../css/Notification.module.css';

export function Notification (props) {
  Notification.propTypes = {
    setShowNotification: PropTypes.func.isRequired,
    showNotification: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    notificationTitle: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired
  };

  return (
    <ToastContainer className={`p-3 ${style.z_index}`} position='bottom-start'>
      <Toast bg={props.variant} onClose={() => props.setShowNotification(false)} show={props.showNotification} delay={3000} autohide>
        <Toast.Header className={style.header_content_gap}>
          {props.error ? <BiError/> : <ImCheckmark/>}
          <strong className="me-auto">{props.notificationTitle}</strong>
        </Toast.Header>
        <Toast.Body className={`${props.variant === 'warning' ? 'text-black' : 'text-white'} ${style.text_center}`}>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notification;
