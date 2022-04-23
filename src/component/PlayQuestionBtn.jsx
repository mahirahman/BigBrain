import React from 'react';
import PropTypes from 'prop-types'
import style from '../css/PlayQuestionBtn.module.css';

export function PlayQuestionBtn (props) {
  PlayQuestionBtn.propTypes = {
    handleAnswerClick: PropTypes.func.isRequired,
    questionType: PropTypes.string.isRequired,
    inputType: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    answer: PropTypes.string.isRequired,
  };

  return (
    <>
      <input onClick={(e) => props.handleAnswerClick(parseInt(e.currentTarget.id) + 1, props.questionType)}
      type={props.inputType}
      id={props.index}
      name={`${props.inputType}-btn`}
      className={style.answer_btn_check}/>
      <label className={`${style.answer_btn_label} ${style.noselect}`} htmlFor={props.index}>{props.answer}</label>
    </>
  );
}

export default PlayQuestionBtn;
