import React from 'react';
import PlayQuestionBtn from '../component/PlayQuestionBtn';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import style from '../css/PlayQuestionCard.module.css';
import { FaGem, FaClock } from 'react-icons/fa';
import noThumbnail from '../img/question_no_thumbnail.svg';
import { getSessionAnswerAPI, getSessionQuestionAPI } from '../util/api';
import { capitaliseFirstLetterString, checkInputs, disableInputs } from '../util/helper';
import EmbedMedia from './EmbedMedia';
import Notification from './Notification';
import { Howl, Howler } from 'howler';
import questionAudio from '../audio/inQuestion.wav';
import { GoMute, GoUnmute } from 'react-icons/go';

export function PlayQuestionCard (props) {
  PlayQuestionCard.propTypes = {
    currentQuestionObj: PropTypes.object.isRequired,
    setCurrentQuestionObj: PropTypes.func.isRequired,
    setRenderCorrectAnswer: PropTypes.func.isRequired,
    setAnswerIds: PropTypes.func.isRequired,
    setCurrentTime: PropTypes.func.isRequired,
    handleAnswerClick: PropTypes.func.isRequired,
    currTime: PropTypes.number,
    renderCorrectAnswer: PropTypes.bool.isRequired,
    playerId: PropTypes.number.isRequired,
    setQuestionSound: PropTypes.func.isRequired,
  };

  const [answer, setAnswer] = React.useState({});
  const [correctAnswer, setCorrectAnswer] = React.useState([]);
  const [isMuted, setIsMuted] = React.useState(false);

  const [showNotification, setShowNotification] = React.useState(false);
  const [notifcationMsg, setNotifcationMsg] = React.useState('');
  const [notificationTitle, setNotifcationTitle] = React.useState('');
  const [variant, setVariant] = React.useState('primary');
  const [error, setError] = React.useState(true);

  // Adds a custom notification to the page
  const addNotification = (title, msg, variant, error) => {
    setNotifcationTitle(title);
    setNotifcationMsg(msg);
    setVariant(variant);
    setError(error);
    setShowNotification(true);
  };

  // Get the answer of the current question when the render changes to correct answer
  React.useEffect(async () => {
    if (props.renderCorrectAnswer) {
      const data = await getSessionAnswerAPI(props.playerId);
      if (data.error) {
        addNotification('Error', data.error, 'danger', true);
        return;
      }
      setAnswer(data.answerIds);
    }
  }, [props.renderCorrectAnswer]);

  React.useEffect(() => {
    // Poll ever 500 ms to check if question ID has changed.
    // This means admin has advanced to the next question.
    const interval = setInterval(async () => {
      const data = await getSessionQuestionAPI(props.playerId);
      if (data.error) {
        addNotification('Warning', data.error, 'warning', true);
        return;
      }
      if (data.question.questionId !== props.currentQuestionObj.questionId) {
        // Reset the state of the question
        Howler.stop();
        props.setCurrentQuestionObj(data.question);
        props.setRenderCorrectAnswer(false);
        props.setCurrentTime(data.question.timeLimit);
        props.setAnswerIds([]);
        setCorrectAnswer([]);
        // Remove disabled attribute from inputs
        disableInputs(false);
        // Unchecks all checkboxes/radio inputs
        checkInputs(false);
        // Play question sound
        props.setQuestionSound(new Howl({
          src: [questionAudio],
          autoplay: true,
          volume: 0.5
        }));
        return () => clearInterval(interval);
      }
    }
    , 500);
    return () => clearInterval(interval);
  }, [props.currentQuestionObj]);

  // This useEffect is only called when the correct answer changes
  // When the correct answers state changes we want to extract the data and find the correct answer string
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      const newAnswersObj = {};
      for (const answer of props.currentQuestionObj.answers) newAnswersObj[answer.id] = answer;
      const result = answer.map(id => newAnswersObj[id]);
      setCorrectAnswer(result);
    } else {
      isMounted.current = true;
    }
  }, [answer]);

  // Unmute/Mute the current audio stream
  const muteAudio = () => {
    setIsMuted(!isMuted);
    Howler.mute(!isMuted);
  };

  return (
    <>
      <Card className={style.container}>
        <Card.Body>
          <div className={style.volume_btn}>
            {isMuted ? <GoUnmute onClick={muteAudio} title='Unmute Audio'/> : <GoMute onClick={muteAudio} title='Mute Audio'/>}
          </div>
          <h1 className={style.game_question_title}>{props.currentQuestionObj.question}</h1>
          {!props.renderCorrectAnswer && (
            <div className={style.game_meta_data}>
            <div className={style.timer}>{props.currTime}</div>
            {props.currentQuestionObj.embed
              ? <EmbedMedia
              questionEmbed={props.currentQuestionObj.embed}
              mediaContainer={style.media_container}
              imageMedia={style.thumbnail}
              />
              : <img className={style.thumbnail} src={noThumbnail} alt="Question Thumbnail"/>}
            <div className={style.question_type}>
              {capitaliseFirstLetterString(props.currentQuestionObj.type)}
            </div>
          </div>
          )}
          {props.renderCorrectAnswer && (
            <div className={style.center}>
              <h3 className={style.correct_answer_title}>
                {props.currentQuestionObj.type === 'multiple-choice' ? 'The correct answers were' : 'The correct answer was'}
              </h3>
              <div className={style.correct_answers}>
              {correctAnswer.map(answer =>
              <React.Fragment key={answer.id}>
                <p className={style.answer}>{answer.answer}</p>
              </React.Fragment>
              )}
            </div>
          </div>
          )}
        <div className={style.answer_btn_container}>
        {props.currentQuestionObj.answers.map((answer, index) => {
          return (
            <React.Fragment key={index}>
            {props.currentQuestionObj.type === 'multiple-choice'
              ? <PlayQuestionBtn
            handleAnswerClick={props.handleAnswerClick}
            questionType={props.currentQuestionObj.type}
            inputType={'checkbox'}
            index={index}
            answer={answer.answer}
            />
              : <PlayQuestionBtn
            handleAnswerClick={props.handleAnswerClick}
            questionType={props.currentQuestionObj.type}
            inputType={'radio'}
            index={index}
            answer={answer.answer}
            />
            }
            </React.Fragment>
          )
        })}
        </div>
        </Card.Body>
        <Card.Footer>
          <div className={style.footer_container}>
            <div className={style.question_data}>
              <div className={style.footer_data}><FaGem/>{props.currentQuestionObj.points}
              {props.currentQuestionObj.points > 1 ? ' Gems' : ' Gem'}
              </div>
              <div className={style.footer_data}><FaClock/>{props.currentQuestionObj.timeLimit} secs</div>
            </div>
            <div>ID: {props.currentQuestionObj.questionId}</div>
          </div>
        </Card.Footer>
      </Card>
      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        message={notifcationMsg}
        notificationTitle={notificationTitle}
        variant={variant}
        error={error}
      />
    </>
  );
}

export default PlayQuestionCard;
