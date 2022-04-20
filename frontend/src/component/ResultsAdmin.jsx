import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import style from '../css/ResultsAdmin.module.css';
import { getSessionResultsAdminAPI, getSessionStatusAdminAPI } from '../util/api';
import ResultsTable from './ResultsTable';

export function ResultsAdmin () {
  const params = useParams();
  const [results, setResults] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);

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
    console.log(dataSession.results.questions);
    setAllQuestions(dataSession.results.questions);
    sortTable();
  }, []);

  // Source: https://www.w3schools.com/howto/howto_js_sort_table.asp
  const sortTable = () => {
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
      switching = false;
      rows = document.getElementById('results-table').rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('td')[1];
        y = rows[i + 1].getElementsByTagName('td')[1];
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  };

  return (
    <>
      <Card className={style.container}>
        <Card.Header>Results</Card.Header>
        <Card.Body>
          {!results.length
            ? 'No results found'
            : <>
            <p>Table of up to top 5 users and their score</p>
            <ResultsTable
            results={results}
            questions={allQuestions}
            />
            <p>Bar chart showing a breakdown of what percentage of people got certain questions correct</p>
            <p>Line chart showing the average response time for each question</p>
            </>
          }
        </Card.Body>
      </Card>
    </>
  );
}

export default ResultsAdmin;
