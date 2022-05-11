import React, { useCallback, useRef } from "react";
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSessionResultsAPI } from '../util/api';
import style from '../css/ResultsQuiz.module.css';
import PieChart from '../component/PieChart';
import { getAverageAnswerTime, getTotalAnswers, numberOfCorrectAnswers, numberOfIncorrectAnswers, timeTakenToAnswer } from '../util/results';
import LineChart from '../component/LineChart';
import ReactCanvasConfetti from "react-canvas-confetti";
import useWindowDimensions from "../component/useWindowDimensions";
import { Howl } from "howler";
import resultsAudio from '../audio/inResult.webm';

export function ResultsQuiz () {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [results, setResults] = React.useState([]);

  React.useEffect(async () => {
    let playerIdFromPreviousPage;
    try {
      ({ playerIdFromPreviousPage } = state)
    } catch {
      // If there is no playerId from the previous page then go to error page
      navigate('/error')
    }

    const data = await getSessionResultsAPI(playerIdFromPreviousPage);
    setResults(data);
    // Play results audio
    new Howl({
      src: [resultsAudio],
      autoplay: true,
      volume: 0.5
    });
    fire();
  }, []);

  const { height, width } = useWindowDimensions();

  // Handle particle fire
  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(300 * particleRatio)
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 200,
      startVelocity: 55
    });

    makeShot(0.2, {
      spread: 100
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    makeShot(0.1, {
      spread: 100,
      startVelocity: 25,
      decay: 0.95,
      scalar: 1.2
    });

    makeShot(0.1, {
      spread: 100,
      startVelocity: 45
    });
  }, [makeShot]);

  return (
    <>
      <Card className={style.container}>
        <ReactCanvasConfetti refConfetti={getInstance} width={width} height={height} className={style.confetti}/>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          <div className={style.charts_container}>
            <PieChart
            labels={['Correct', 'Incorrect']}
            data={[numberOfCorrectAnswers(results), numberOfIncorrectAnswers(results)]}
            />
            <LineChart
            labels={results.map((x, index) => `Question ${index + 1}`)}
            data={results.map((x) => timeTakenToAnswer(x) / 1000)}
            />
          </div>
          <div className={style.stats_text}>
            <p className={style.text_box}>{`You took an average of ${getAverageAnswerTime(results)} seconds to answer a question`}</p>
            <p className={style.text_box}>{`Your Final Results: ${numberOfCorrectAnswers(results)}/${getTotalAnswers(results)}`}</p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ResultsQuiz;
