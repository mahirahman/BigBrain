import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { getSessionStatusAPI } from '../util/api';
import style from '../css/LobbyQuiz.module.css';
import Notification from '../component/Notification';
import { Howl, Howler } from 'howler';
import lobbyAudio from '../audio/lobby.wav';

export function LobbyQuiz () {
  const navigate = useNavigate();
  const params = useParams();
  const [playerId, setPlayerId] = React.useState(null);
  const { state } = useLocation();

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
          addNotification('Error', data.error, 'danger', true);
          return;
        }
        if (data.started) {
          // Remove the audio
          Howler.stop();
          navigate(`/quiz/play/${params.sessionId}`, { state: { playerIdFromPreviousPage: playerId, sessionIdFromPreviousPage: params.sessionId } });
        }
      }, 500);
      return () => clearInterval(interval);
    }
    // Play lobby audio
    new Howl({
      src: [lobbyAudio],
      autoplay: true,
      loop: true,
      volume: 0.5
    });
  }, [playerId]);

  return (
    <>
      <h1 className={style.main_text}>Waiting for game to start...</h1>
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

export default LobbyQuiz;
