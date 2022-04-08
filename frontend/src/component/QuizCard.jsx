import React from 'react';
import { Button, Card } from 'react-bootstrap';
import style from '../css/QuizCard.module.css';
import { IoTrashOutline } from 'react-icons/io5';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { formatDateString } from '../helper';

export function QuizCard (props) {
  QuizCard.propTypes = {
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    questionNum: PropTypes.string.isRequired,
    totalTime: PropTypes.string.isRequired,
  };

  const CardFilter = styled.div`filter: hue-rotate(${Math.floor(Math.random() * 360) + 1}deg)`;

  return (
    <>
      <Card className={style.quiz_card}>
        <CardFilter>
          <Card.Img className={style.quiz_thumbnail} variant="top" src={props.thumbnail} alt=""/>
        </CardFilter>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text>Created {formatDateString(props.date)}</Card.Text>
          <Card.Text>{props.questionNum} Questions | Time: {props.totalTime} mins</Card.Text>
          <Button className={style.delete_btn} variant="outline-danger"><IoTrashOutline/> Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default QuizCard;
