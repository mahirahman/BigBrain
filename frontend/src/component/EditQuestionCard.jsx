import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import { MdQuiz } from 'react-icons/md';

export function EditQuizQuestionCard (props) {
  EditQuizQuestionCard.propTypes = {
    questions: PropTypes.array,
  };

  return (
    <>
      <Card className={style.card_container}>
        <Card.Header>Edit Questions</Card.Header>
        <Card.Body>
          <div className={style.add_question}>
            <Button variant="primary"><MdQuiz className={style.quiz_icon}/>Add New Question</Button>
          </div>
        </Card.Body>
        {/* Render when there is no questions otherwise render question cards */}
        {JSON.stringify(props.questions) === '[]'
          ? <div className={style.no_question_text}>No Questions here 😴</div>
          : <div className={style.no_question_text}>{JSON.stringify(props.questions)}</div>
        }
      </Card>
    </>
  )
}

export default EditQuizQuestionCard;
