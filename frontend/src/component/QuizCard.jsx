import React from 'react';
import { Button, Card } from 'react-bootstrap';
import style from '../css/QuizCard.module.css';
import { IoTrashOutline } from 'react-icons/io5';

export function QuizCard () {
  return (
    <>
      <Card className={`${style.quiz_card} ${style.grow}`}>
        <Card.Img className={style.quiz_thumbnail} variant="top" src="https://simg.nicepng.com/png/small/304-3041036_geography-icon-png-download-geographic-icon-png.png" />
        <Card.Body>
          <Card.Title>Quiz Title</Card.Title>
          <Card.Text>Created at 01/01/01</Card.Text>
          <Card.Text>45 Questions | Time: 90 mins</Card.Text>
          <Button className={style.delete_btn} variant="outline-danger"><IoTrashOutline/> Delete</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default QuizCard;
