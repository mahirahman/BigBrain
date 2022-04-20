import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSessionQuestionAPI, getSessionStatusAPI, submitQuestionAnswerAPI } from '../util/api';
import LoadingWheel from '../component/LoadingWheel';
import PlayQuestionCard from '../component/PlayQuestionCard';
import { disableInputs } from '../util/helper';

export function PlayQuiz () {
  const navigate = useNavigate();
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();
  const [currentQuestionObj, setCurrentQuestionObj] = React.useState(null);
  const [answerIds, setAnswerIds] = React.useState([]);
  const [currentTime, setCurrentTime] = React.useState(null);
  const [renderCorrectAnswer, setRenderCorrectAnswer] = React.useState(false);

  // Get the playerId from the previous play join page
  // and store it in a state variable
  React.useEffect(() => {
    let playerIdFromPreviousPage;
    let sessionIdFromPreviousPage;
    try {
      ({ playerIdFromPreviousPage, sessionIdFromPreviousPage } = state)
      setPlayerId(playerIdFromPreviousPage);
    } catch {
      // If there is no playerId from the previous page then go to error page
      navigate('/error')
    }
    // Poll every 500 ms to check if the session has ended, if it has then
    // go to the results page
    const interval = setInterval(async () => {
      const data = await getSessionStatusAPI(playerIdFromPreviousPage);
      if (data.error) {
        clearInterval(interval);
        navigate(`/quiz/results/${sessionIdFromPreviousPage}`, { state: { playerIdFromPreviousPage: playerIdFromPreviousPage } });
      }
    }
    , 500);
    return () => clearInterval(interval);
  }, []);

  // If there is a playerId, get the current question.
  React.useEffect(async () => {
    if (playerId) {
      const sessionQuestion = await getSessionQuestionAPI(playerId);
      if (sessionQuestion.error) {
        navigate('/error');
        return;
      }
      // If the current question has passed the time limit, then go to the results page
      // instead of rendering the question
      const dt = new Date(sessionQuestion.question.isoTimeLastQuestionStarted)
      const expectedFinishTime = dt.setSeconds(dt.getSeconds() + sessionQuestion.question.timeLimit);
      if (Date.now() > expectedFinishTime) {
        setRenderCorrectAnswer(true);
      }
      setCurrentQuestionObj(sessionQuestion.question);
      setCurrentTime(sessionQuestion.question.timeLimit);
    }
  }, [playerId]);

  // Handle the answer selection
  const handleAnswerClick = async (answerId, questionType) => {
    if (questionType === 'multiple-choice') {
      // Check if answerId is in answerIds,
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

  const isMountedAnswerIds = React.useRef(false);
  // Submits the data to the API when answerIds array is changed
  React.useEffect(async () => {
    if (isMountedAnswerIds.current && answerIds.length > 0) {
      const data = await submitQuestionAnswerAPI(playerId, answerIds);
      if (data.error) {
        disableInputs(true);
        console.warn(data.error);
      }
    } else {
      isMountedAnswerIds.current = true;
    }
  }, [answerIds]);

  React.useEffect(() => {
    // Stopping the counter when reaching 0.
    if (currentTime === 0) {
      // setAnswerIds([]);
      setRenderCorrectAnswer(true);
      // Set all inputs as disabled attribute
      disableInputs(true);
      return;
    }
    // Decrement currentTime by 1 every second
    const intervalId = setInterval(() => {
      setCurrentTime(currentTime - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [currentTime]);

  // Using the return data from the above GET request we want to (GET /play/{playerid}/question)
  // and find the answer string from the id and display it on a card with other data such as points and time.

  // After last question is answered, redirect to result page (How can I detect last Question?)

  return (
    <>
      {currentQuestionObj
        ? <PlayQuestionCard
        currentQuestionObj={currentQuestionObj}
        setCurrentQuestionObj={setCurrentQuestionObj}
        setRenderCorrectAnswer={setRenderCorrectAnswer}
        setAnswerIds={setAnswerIds}
        setCurrentTime={setCurrentTime}
        handleAnswerClick={handleAnswerClick}
        currTime={currentTime}
        renderCorrectAnswer={renderCorrectAnswer}
        playerId={playerId}
        />
        : <LoadingWheel/>
      }
    </>
  );
}

export default PlayQuiz;
