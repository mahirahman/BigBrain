import React from 'react';
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/LoadingWheel.module.css';

export function LoadingWheel (props) {
  LoadingWheel.propTypes = {
    variant: PropTypes.string.isRequired,
  };

  return (
    <>
      <div className={style.spinner_flex}>
        <Spinner animation="border" role="status" variant={props.variant}>
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}

export default LoadingWheel;
