import React from 'react';
import { Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSessionResultsAPI } from '../util/api';
import style from '../css/ResultsQuiz.module.css';
import PieChart from '../component/PieChart';
import { getAverageAnswerTime, getTotalAnswers, numberOfCorrectAnswers, numberOfIncorrectAnswers, timeTakenToAnswer } from '../util/results';
import LineChart from '../component/LineChart';

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
  }, []);

  return (
    <>
      <Card className={style.container}>
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
