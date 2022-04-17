import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getSessionQuestionAPI, getSessionStatusAPI } from '../util/api';
// Move these imports later
import style from '../css/PlayQuestionCard.module.css';
import noThumbnail from '../img/quiz_no_thumbnail.png';
import { FaGem, FaClock } from 'react-icons/fa';

export function PlayQuiz () {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();

  const [currentQuestionObj, setCurrentQuestionObj] = React.useState(null);
  // eslint-disable-next-line
  const [questionNumber, setQuestionNumber] = React.useState(0);

  // Get the playerId from the previous play join page
  // and store it in a state variable
  React.useEffect(() => {
    let playerIdFromPreviousPage;
    try {
      ({ playerIdFromPreviousPage } = state)
      setPlayerId(playerIdFromPreviousPage);
    } catch {
      navigate('/error')
    }
  }, []);

  // If the session has not started then navigate error
  React.useEffect(async () => {
    if (playerId) {
      const interval = setInterval(async () => {
        const data = await getSessionStatusAPI(playerId);
        if (data.error) {
          navigate('/error');
        }
      }, 500);

      const data = await getSessionQuestionAPI(playerId);
      if (data.error) {
        navigate('/error');
      }
      setCurrentQuestionObj(data.question);
      return () => clearInterval(interval);
    }
  }, [playerId]);

  // display Q1 data here with buttons for answers + a timer that counts down based on timeLimit
  // render of the Q change when admin advances to next Q.
  return (
    <>
      <div>
        {currentQuestionObj
          ? <Card className={style.container}>
            <Card.Header>Question {questionNumber}</Card.Header>
            <Card.Body>
              <h1 className={style.game_question_title}>{currentQuestionObj.question}</h1>
              <div className={style.game_meta_data}>
                <div className={style.timer}>{currentQuestionObj.timeLimit}</div>
                {currentQuestionObj.embed ? 'yt or img' : <img className={style.thumbnail} src={noThumbnail} alt=""/>}
                <div className={style.question_type}>
                  {currentQuestionObj.type.replace(/-/g, ' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}
                </div>
              </div>
            <div className={style.answer_btn_container}>
            {currentQuestionObj.answers.map((answer, index) => {
              return (
                <Button key={index} id={`answer_${index}`} className={style.answer_btn}>{answer.answer}</Button>
              )
            })}
            </div>
            </Card.Body>
            <Card.Footer>
              <div className={style.footer_container}>
                <div className={style.footer_data}><FaGem/>{currentQuestionObj.points} Gems</div>
                <div className={style.footer_data}><FaClock/>{currentQuestionObj.timeLimit} secs</div>
              </div>
            </Card.Footer>
          </Card>
          : 'Loading...'
        }
      </div>
    </>
  );
}

export default PlayQuiz;
