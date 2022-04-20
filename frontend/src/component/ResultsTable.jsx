import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { getTotalScoreUser } from '../util/results';

export function ResultsTable (props) {
  ResultsTable.propTypes = {
    results: PropTypes.array.isRequired,
    questions: PropTypes.array.isRequired
  };

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
          {props.results.map((result, index) => {
            return (
              <tr key={index}>
                <td>{result.name}</td>
                <td>{!props.questions.length ? 'Loading...' : getTotalScoreUser(result.answers, props.questions)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  );
}

export default ResultsTable;
