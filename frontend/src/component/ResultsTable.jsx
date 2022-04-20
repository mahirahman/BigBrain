import React from 'react';
import PropTypes from 'prop-types';
import { getTotalScoreUser } from '../util/results';
import { Table } from 'react-bootstrap';
import style from '../css/Charts.module.css';

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
      <caption className={style.caption}>Top 5 users</caption>
      <div className={style.center}>
        <Table className={style.table_width} striped bordered hover>
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
      </div>
    </>
  );
}

export default ResultsTable;
