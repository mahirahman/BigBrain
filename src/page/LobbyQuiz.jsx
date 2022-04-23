import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getSessionStatusAPI } from '../util/api';
import style from '../css/LobbyQuiz.module.css';

export function LobbyQuiz () {
  const navigate = useNavigate();
  const params = useParams();
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();

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

  // Poll the endpoint every 500ms to check if a quiz has started or not
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
          navigate(`/quiz/play/${params.sessionId}`, { state: { playerIdFromPreviousPage: playerId, sessionIdFromPreviousPage: params.sessionId } });
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [playerId]);

  return (
    <>
      <h1 className={style.main_text}>Waiting for game to start...</h1>
    </>
  );
}

export default LobbyQuiz;
