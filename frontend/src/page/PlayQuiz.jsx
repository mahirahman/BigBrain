/* eslint-disable */
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getSessionQuestionAPI, submitQuestionAnswerAPI } from '../util/api';
// Move these imports later
import style from '../css/PlayQuestionCard.module.css';
import noThumbnail from '../img/quiz_no_thumbnail.png';
import { FaGem, FaClock } from 'react-icons/fa';
import PlayQuestionBtn from '../component/PlayQuestionBtn';

export function PlayQuiz () {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();
  const [currentQuestionObj, setCurrentQuestionObj] = React.useState(null);
  const [answerIds, setAnswerIds] = React.useState([]);

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

  // If there is a playerId, get the current question.
  React.useEffect(async () => {
    if (playerId) {
      const sessionQuestion = await getSessionQuestionAPI(playerId);
      if (sessionQuestion.error) {
        navigate('/error');
      }
      setCurrentQuestionObj(sessionQuestion.question);
    }
  }, [playerId]);

  // Handle the answer selection
  const handleAnswerClick = async (answerId, questionType) => {
    if (questionType === 'multiple-choice') {
      // Check if answerId is in answerIds,
      // if it is then remove it from answerIds
      // if its not in answerIds, add it
      if (answerIds.includes(answerId)) {
        if (answerIds.length < 2) {
          setAnswerIds([]);
          return;
        }
        setAnswerIds(answerIds.filter(id => id !== answerId));
      } else {
        setAnswerIds([...answerIds, answerId]);
      }
    } else {
      setAnswerIds([answerId]);
    }
  };

  const isMounted = React.useRef(false);
  // Submits the data to the API when answerIds array is changed
  React.useEffect(async () => {
    if (isMounted.current) {
      const data = await submitQuestionAnswerAPI(playerId, answerIds);
      if (data.error) {
        alert(data.error);
        return;
      }
    } else {
      isMounted.current = true;
    }
  }, [answerIds]);

  // If question is manually advanced before timer hits 0, OR When the timer hits 0,
  // then the answer/results of that particular question are displayed
  // and setAnswerIds is reset

  return (
    <>
      <div>
        {currentQuestionObj
          ? <Card className={style.container}>
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
                <React.Fragment key={index}>
                {currentQuestionObj.type === 'multiple-choice'
                ? <PlayQuestionBtn
                handleAnswerClick={handleAnswerClick}
                questionType={currentQuestionObj.type}
                inputType={"checkbox"}
                index={index}
                answer={answer.answer}
                />
                : <PlayQuestionBtn
                handleAnswerClick={handleAnswerClick}
                questionType={currentQuestionObj.type}
                inputType={"radio"}
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
