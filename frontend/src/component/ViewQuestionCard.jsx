import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import { updateQuizAPI } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { MdQuiz } from 'react-icons/md';
import AddQuestionModal from './AddQuestionModal';
import { QuizQuestionCard } from './QuizQuestionCard';
import noThumb from '../img/quiz_no_thumbnail.png';

export function ViewQuestionCard (props) {
  ViewQuestionCard.propTypes = {
    quizID: PropTypes.string.isRequired,
    questions: PropTypes.array
  };

  const navigate = useNavigate();

  const [questionList, setQuestionsList] = React.useState(props.questions);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // When props load set the questions
  React.useEffect(() => {
    setQuestionsList(props.questions);
  }, [props]);

  // When the question list changes update backend with the new question data
  React.useEffect(async () => {
    const data = await updateQuizAPI(props.quizID, questionList, null, null);
    if (data.error) {
      navigate('/quizzes');
    }
  }, [questionList]);

  return (
    <>
      <Card className={style.card_container}>
        <Card.Header>Edit Questions</Card.Header>
        <Card.Body>
          <div className={style.add_question}>
            <Button variant="primary" onClick={ handleShow }><MdQuiz className={style.quiz_icon}/>Add New Question</Button>
          </div>
        </Card.Body>
        {/* Render when there is no questions otherwise render question cards */}
        {JSON.stringify(questionList) === '[]'
          ? <div className={style.no_question_text}>No Questions here 😴</div>
          : questionList?.map((question, index) => {
            return <QuizQuestionCard
            key = {(Math.random() + 1).toString(36).substring(7)}
            questionNum = {index + 1}
            quizId = {props.quizID}
            questionId = {question.questionId}
            question = {question.question}
            questionType = {question.type}
            questionTime = {question.timeLimit}
            questionPoints = {question.points}
            questionEmbed = {question.embed ? question.embed : noThumb}
            questionsList = {questionList}
            setQuestionsList = {setQuestionsList}
            />
          })}
      </Card>
      <AddQuestionModal questions={questionList} handleClose={handleClose} show={show} setQuestionsList={setQuestionsList}/>
    </>
  )
}

export default ViewQuestionCard;
