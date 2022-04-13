import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import style from '../css/QuizCard.module.css';
import { IoTrashOutline } from 'react-icons/io5';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { formatDateString } from '../helper';
import { deleteQuizAPI } from '../api';

const CardFilter = styled.div`filter: hue-rotate(${props => props.colour}deg)`;

export function QuizCard (props) {
  const [renderQuiz, setRenderQuiz] = React.useState(true);
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    e.stopPropagation();
    setShow(true);
  }

  QuizCard.propTypes = {
    randColour: PropTypes.number.isRequired,
    quizId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    questionNum: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
  };

  const deleteQuiz = async () => {
    setRenderQuiz(false);
    const data = await deleteQuizAPI(props.quizId);
    if (data.error) {
      alert(data.error);
      setRenderQuiz(true);
    }
    handleClose();
  };

  const editQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <>
      {renderQuiz &&
      <Card className={style.quiz_card} onClick = { () => editQuiz(props.quizId) }>
        <CardFilter colour = {props.randColour}>
          <Card.Img className={style.quiz_thumbnail} variant="top" src={props.thumbnail} alt=""/>
        </CardFilter>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Created {formatDateString(props.date)}</Card.Text>
          <Card.Text>{props.questionNum} Questions | Time: {props.totalTime} mins</Card.Text>
          <Button className={style.delete_btn} variant="outline-danger" onClick={ (e) => handleShow(e) }><IoTrashOutline/> Delete</Button>
        </Card.Body>
      </Card>
      }
      <ConfirmDeleteModal name={props.title} handleClose={handleClose} show={show} deleteQuiz={deleteQuiz}/>
    </>
  );
}

export default QuizCard;
