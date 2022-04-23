import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import style from '../css/ResultsAdmin.module.css';
import { getSessionResultsAdminAPI, getSessionStatusAdminAPI } from '../util/api';
// import { getavg } from '../util/results';
// import BarChart from './BarChart';
import ResultsTable from './ResultsTable';

export function ResultsAdmin () {
  const params = useParams();
  const [results, setResults] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);

  // Get the results for the session
  React.useEffect(async () => {
    const dataResults = await getSessionResultsAdminAPI(params.sessionId);
    if (dataResults.error) {
      alert(dataResults.error);
      return;
    }
    setResults(dataResults.results);

    const dataSession = await getSessionStatusAdminAPI(params.sessionId);
    if (dataSession.error) {
      alert(dataSession.error);
      return;
    }
    setAllQuestions(dataSession.results.questions);
  }, []);

  return (
    <>
      <Card className={style.container}>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          {!results.length
            ? 'No results found'
            : <>
            <ResultsTable
            results={results}
            questions={allQuestions}
            />
            {/* BarChart for more stats */}
            {/* <BarChart
            labels={allQuestions.map((x, index) => `Question ${index + 1}`)}
            data={results.map((x) => getavg(x.answers, allQuestions.length))}
            /> */}
            </>
          }
        </Card.Body>
      </Card>
    </>
  );
}

export default ResultsAdmin;
