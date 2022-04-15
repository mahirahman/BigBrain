import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types'
import style from '../css/QuizQuestionCard.module.css';
import { FaGem, FaClock } from 'react-icons/fa';
import { validateYoutubeMedia } from '../util/validate';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import { BiEdit, BiTrash } from 'react-icons/bi';

export function QuizQuestionCard (props) {
  QuizQuestionCard.propTypes = {
    questionNum: PropTypes.number.isRequired,
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
                <p className={style.edit_btn}><BiEdit/>Edit</p>
                <p className={style.delete_btn} onClick={handleShow}><BiTrash/>Delete</p>
              </div>
            </div>
            {validateYoutubeMedia(props.questionEmbed)
              ? <iframe className={`${style.embed_video} ${style.media_container}`} src={`https://www.youtube.com/embed/${validateYoutubeMedia(props.questionEmbed)}?controls=0`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              : <img className={`${style.image_media} ${style.media_container}`} src={props.questionEmbed} alt="Question Youtube Video"/>}
          </div>
        </Card.Body>
      </Card>
      }
      <ConfirmDeleteModal name={`Question ${props.questionNum}`} handleClose={handleClose} show={show} deleteFunc={deleteQuestion} type={'question'}/>
    </>
  )
}

export default QuizQuestionCard;
