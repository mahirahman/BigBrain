import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import style from '../css/QuizQuestionCard.module.css';
import { FaGem, FaClock } from 'react-icons/fa';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { BiEdit, BiTrash } from 'react-icons/bi';
import EmbedMedia from './EmbedMedia';

export function QuizQuestionCard (props) {
  QuizQuestionCard.propTypes = {
    questionNum: PropTypes.number.isRequired,
    quizId: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    questionTime: PropTypes.number.isRequired,
    questionPoints: PropTypes.number.isRequired,
    questionEmbed: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    questionsList: PropTypes.array.isRequired,
    setQuestionsList: PropTypes.func.isRequired,
  };

  const [renderQuestion, setRenderQuestion] = React.useState(true);
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const deleteQuestion = async () => {
    setRenderQuestion(false);
    // Index of the element to be deleted
    const deleteIdx = props.questionNum - 1;
    // Using the questions list we want to remove the deleteIdx element
    props.setQuestionsList(props.questionsList.filter((question, index) => index !== deleteIdx));
    handleClose();
  };

  return (
    <>
      {renderQuestion &&
        <Card className={style.question_card}>
        <Card.Header>Question {props.questionNum}</Card.Header>
        <Card.Body>
          <div className={style.container_flex}>
            <div className={style.test}>
              <h4>{props.question}</h4>
              <p>{props.questionType.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
              <p><FaClock className={style.icon_spacing}/>{props.questionTime} secs <FaGem className={style.icon_spacing}/>{props.questionPoints} Gems</p>
              <div className={style.question_controls}>
                <p className={style.edit_btn} onClick={() => navigate(`/quiz/edit/${props.quizId}/${props.questionId}`)}><BiEdit/>Edit</p>
                <p className={style.delete_btn} onClick={handleShow}><BiTrash/>Delete</p>
              </div>
            </div>
              <EmbedMedia
              questionEmbed={props.questionEmbed}
              mediaContainer={style.media_container}
              imageMedia={style.image_media}
              />
          </div>
        </Card.Body>
      </Card>
      }
      <ConfirmDeleteModal name={`Question ${props.questionNum}`} handleClose={handleClose} show={show} onSubmit={deleteQuestion} type={'question'}/>
    </>
  )
}

export default QuizQuestionCard;
