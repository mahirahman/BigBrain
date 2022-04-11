import React from 'react';
import style from '../css/Error.module.css';
import confusedFace from '../img/confused_face.svg';
import { useNavigate } from 'react-router-dom';

export function Error () {
  const navigate = useNavigate();
  return (
    <>
      <div className={style.error_container}>
        <img className={style.sad_emote} src={confusedFace} alt="Sad Face"/>
        <div className={style.error_text_body}>
          <h1 className={style.error_code_title}>404</h1>
          <h2>Page not found</h2>
          <p>The page you are looking for doesn&#39;t exist.</p>
          <p>Go <a className={style.back_text} onClick={() => navigate(-1)}>back</a> and choose a new direction.</p>
        </div>
      </div>
    </>
  );
}

export default Error;
