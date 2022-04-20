import React from 'react';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto';
import style from '../css/charts.module.css';

export function PieChart (props) {
  PieChart.propTypes = {
    labels: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
  };

  const data = {
    labels: props.labels,
    datasets: [{
      data: props.data,
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(255, 99, 132, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    }]
  };

  const options = {
    responsive: true,
  };

  return (
    <div className={style.pie_chart_container}>
      <Doughnut
      data={data}
      options={options}
      />
    </div>
  );
}

export default PieChart;
