import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSessionStatusAPI } from '../util/api';
import style from '../css/LobbyQuiz.module.css';

export function LobbyQuiz () {
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();

  // Get the playerId from the previous play join page
  // and store it in a state variable
  React.useEffect(() => {
    let playerId;
    try {
      ({ playerId } = state)
      setPlayerId(playerId);
    } catch {
      navigate('/error')
    }
  }, []);

  // Poll the endpoint every half second to check if a quiz has started or not
  // Otherwise stay on the lobby page.
  React.useEffect(() => {
    if (playerId) {
      const interval = setInterval(async () => {
        const data = await getSessionStatusAPI(playerId);
        if (data.error) {
          alert(data.error);
          return;
        }
        if (data.started) {
          setQuizStarted(true);
          navigate(`/quiz/play/${playerId}`);
        }
      }, 500);
      return () => clearInterval(interval);
    }
    // Additionally later on I can poll /admin/session/{sessionid}/status every half sec
    // to get the list of names of players and append that to the lobby page
    // like kahoot does.
  }, [playerId]);

  return (
    <>
      {!quizStarted &&
        <h1 className={style.main_text}>
          Waiting for the game to start...
        </h1>
      }
    </>
  );
}

export default LobbyQuiz;
