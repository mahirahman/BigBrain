import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSessionStatusAPI } from '../util/api';

export function PlayQuiz () {
  const navigate = useNavigate();
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

    // If the session has not started then navigate error
  }, []);

  React.useEffect(() => {
    if (playerId) {
      const interval = setInterval(async () => {
        const data = await getSessionStatusAPI(playerId);
        if (data.error) {
          navigate('/error');
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [playerId]);

  return (
    <>
    {console.log(playerId)}
      <h1>Should display Q1 data here with buttons for answers + a timer that counts down based on timeLimit</h1>
      <h1>render of the Q change when admin advances to next Q.</h1>
    </>
  );
}

export default PlayQuiz;
