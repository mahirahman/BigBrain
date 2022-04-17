import React from 'react';
import { useParams } from 'react-router-dom';
import JoinGameForm from '../component/JoinGameForm';
import style from '../css/LoginRegisterForm.module.css';

export function JoinQuiz () {
  const params = useParams();

  return (
    <>
      <div className={`${style.form_container} ${style.center}`}>
        <h1 className={style.form_main_title}>Join Game</h1>
        <JoinGameForm sessionId={params.sessionId}/>
      </div>
    </>
  );
}

export default JoinQuiz;
