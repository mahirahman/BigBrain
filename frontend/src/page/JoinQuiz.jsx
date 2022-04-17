import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoinGameForm from '../component/JoinGameForm';
import style from '../css/LoginRegisterForm.module.css';

export function JoinQuiz () {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className={`${style.form_container} ${style.center}`}>
        <h1 className={style.form_main_title}>Join Game</h1>
        <JoinGameForm sessionId={params.sessionId} success={() => {
          navigate(`/quiz/play/${params.sessionId}`);
        }}/>
      </div>
    </>
  );
}

export default JoinQuiz;
