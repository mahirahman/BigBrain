import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import style from '../css/ResultsAdmin.module.css';
import { getSessionResultsAdminAPI, getSessionStatusAdminAPI } from '../util/api';
import Notification from './Notification';
import ResultsTable from './ResultsTable';

export function ResultsAdmin () {
  const params = useParams();
  const [results, setResults] = React.useState([]);
  const [allQuestions, setAllQuestions] = React.useState([]);

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

  // Get the results for the session
  React.useEffect(async () => {
    const dataResults = await getSessionResultsAdminAPI(params.sessionId);
    if (dataResults.error) {
      addNotification('Error', dataResults.error, 'danger', true);
      return;
    }
    setResults(dataResults.results);

    const dataSession = await getSessionStatusAdminAPI(params.sessionId);
    if (dataSession.error) {
      addNotification('Error', dataSession.error, 'danger', true);
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
            </>
          }
        </Card.Body>
      </Card>
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

export default ResultsAdmin;
