import React from 'react';
import style from '../css/Error.module.css';
import confusedFace from '../icons/confused_face.svg';

export function Error () {
  return (
    <>
    <div className={style.error_container}>
      <img className={style.sad_emote} src={confusedFace} alt="" />
      <div className={style.error_text_body}>
        <h1 className={style.error_code_title}>404</h1>
        <h2>Page not found</h2>
        <p>The page you are looking for doesn&#39;t exist.</p>
        <p>Go back and choose a new direction.</p>
      </div>
    </div>
    </>
  );
}

export default Error;
