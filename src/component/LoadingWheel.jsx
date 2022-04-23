import React from 'react';
import { Spinner } from 'react-bootstrap';
import style from '../css/LoadingWheel.module.css';

export function LoadingWheel () {
  return (
    <>
      <div className={style.spinner_flex}>
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  );
}

export default LoadingWheel;
