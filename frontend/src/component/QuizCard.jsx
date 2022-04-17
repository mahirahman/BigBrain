import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import style from '../css/QuizCard.module.css';
import { IoTrashOutline } from 'react-icons/io5';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { formatDateString } from '../util/helper';
import { advanceQuizQuestionAPI, deleteQuizAPI, endQuizAPI, getQuizDataAPI, startQuizAPI } from '../util/api';
import { VscDebugStart } from 'react-icons/vsc';
import { AiOutlineStop } from 'react-icons/ai';
import { GrFormNextLink } from 'react-icons/gr';
import StartQuizModal from './StartQuizModal';
import StopQuizModal from './StopQuizModal';

const CardFilter = styled.div`filter: hue-rotate(${props => props.colour}deg)`;

export function QuizCard (props) {
  QuizCard.propTypes = {
    randColour: PropTypes.number.isRequired,
    quizId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  };

  const [renderQuiz, setRenderQuiz] = React.useState(true);
  const navigate = useNavigate();

  const [sessionId, setSessionId] = React.useState(null);

  const [show, setShow] = React.useState(false);
  const closeDeleteModal = () => setShow(false);
  const showDeleteModal = (e) => {
    e.stopPropagation();
    setShow(true);
  }

  const [endQuizModal, setEndQuizModal] = React.useState(false);
  const closeStopQuizModal = () => setEndQuizModal(false);
  const showStopQuizModal = async (e) => {
    e.stopPropagation();
    const data = await endQuizAPI(props.quizId);
    if (data.error) {
      alert(data.error);
      return;
    }
    setEndQuizModal(true);
  }

  const [startQuizModal, setStartQuizModal] = React.useState(false);
  const closeStartQuizModal = () => setStartQuizModal(false);
  const showStartQuizModal = async (e) => {
    e.stopPropagation();
    // Start a quiz
    const startQuiz = await startQuizAPI(props.quizId);
    if (startQuiz.error) {
      alert(startQuiz.error);
      return;
    }
    // Call the quiz data and set the session id as a state
    const quizData = await getQuizDataAPI(props.quizId);
    if (quizData.error) {
      alert(quizData.error);
      return;
    }
    setSessionId(quizData.active)
    setStartQuizModal(true);
  };

  const advanceNextQuestion = async (e) => {
    e.stopPropagation();
    const data = await advanceQuizQuestionAPI(props.quizId);
    if (data.error) {
      alert(data.error);
    }
  };

  const [data, setData] = React.useState({});

  const deleteQuiz = async () => {
    setRenderQuiz(false);
    const data = await deleteQuizAPI(props.quizId);
    if (data.error) {
      alert(data.error);
      setRenderQuiz(true);
    }
    closeDeleteModal();
  };

  const editQuiz = (quizId) => {
    navigate(`/quiz/edit/${quizId}`);
  };

  React.useEffect(async () => {
    setData(await getQuizDataAPI(props.quizId));
  }, []);

  const getTotalTimeTaken = () => {
    let totalTime = 0;
    data.questions.forEach(question => {
      totalTime += question.timeLimit;
    })
    if (totalTime < 60) {
      return `${totalTime} sec(s)`;
    }
    return `${(totalTime / 60).toFixed(2)} min(s)`;
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
          <Card.Text>{data.questions ? `${data.questions.length} Questions` : 'Loading...'} | {data.questions ? `Time: ${getTotalTimeTaken()}` : 'Loading...'}</Card.Text>
          <Button className={style.start_end_btn} variant='outline-success' onClick={(e) => showStartQuizModal(e)}><VscDebugStart/> Start Quiz</Button>
          <Button className={style.start_end_btn} variant='outline-dark' onClick={(e) => advanceNextQuestion(e)}><GrFormNextLink/> Next Question</Button>
          <Button className={style.start_end_btn} variant='outline-secondary' onClick={(e) => showStopQuizModal(e)}><AiOutlineStop/> End Quiz</Button>
          <Button className={style.delete_btn} variant="outline-danger" onClick={ (e) => showDeleteModal(e) }><IoTrashOutline/> Delete</Button>
        </Card.Body>
      </Card>
      }
      <StartQuizModal handleClose={closeStartQuizModal} show={startQuizModal} sessionId={sessionId}/>
      <StopQuizModal handleClose={closeStopQuizModal} show={endQuizModal} sessionId={sessionId}/>
      <ConfirmDeleteModal name={props.title} handleClose={closeDeleteModal} show={show} onSubmit={deleteQuiz} type={'quiz'}/>
    </>
  );
}

export default QuizCard;
