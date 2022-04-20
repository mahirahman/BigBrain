import React from 'react';
import PropTypes from 'prop-types';
import { getTotalScoreUser } from '../util/results';
import { Table } from 'react-bootstrap';

export function ResultsTable (props) {
  ResultsTable.propTypes = {
    results: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
  };

  const [displayData, setDisplayData] = React.useState([]);

  React.useEffect(() => {
    const data = [];
    if (props.questions.length) {
      props.results.map((result) => {
        return (data.push({ user: result.name, score: getTotalScoreUser(result.answers, props.questions) }));
      })
    }
    // Sort data array by key 'score'
    // Remove every element from the array after index 4
    setDisplayData((data.sort((a, b) => (a.score < b.score) ? 1 : -1)).slice(0, 5));
  }, [props.questions, props.results]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.user}</td>
                <td>{data.score}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ResultsTable;
