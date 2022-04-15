import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/EditQuizCard.module.css';
import { updateQuizAPI } from '../util/api';
import { useNavigate } from 'react-router-dom';
import { MdQuiz } from 'react-icons/md';
import AddQuestionModal from '../component/AddQuestionModal';

export function EditQuizQuestionCard (props) {
  EditQuizQuestionCard.propTypes = {
    quizID: PropTypes.string.isRequired,
    questions: PropTypes.array
  };

  const navigate = useNavigate();

  const fetchData = async () => {
    console.log('fetchData');
    const data = await updateQuizAPI(props.quizID, questionList, null, null);
    if (data.error) {
      navigate('/quizzes');
    }
  }

  const [questionList, setQuestionsList] = React.useState(props.questions);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  React.useEffect(() => {
    setQuestionsList(props.questions);
  }, [props]);

  React.useEffect(() => {
    fetchData();
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
          : <div className={style.no_question_text}>{JSON.stringify(questionList)}</div>
        }
      </Card>
      <AddQuestionModal questions={questionList} handleClose={handleClose} show={show} setQuestionsList={setQuestionsList}/>
    </>
  )
}

export default EditQuizQuestionCard;
