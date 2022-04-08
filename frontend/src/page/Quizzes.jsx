import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';
import QuizCard from '../component/QuizCard';
import style from '../css/Quizzes.module.css';
import { getQuizDataAPI } from '../api';
import noThumb from '../img/quiz_no_thumbnail.png';

export function Quizzes () {
  const [quizCards, addQuizCard] = React.useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    getQuizDataAPI().then(data => {
      addQuizCard([...quizCards, ...data.quizzes]);
    })
  }, []);

  return (
    <>
      <NavigationMenu/>
      <div className={style.all_quiz_container}>
        {quizCards.map((quiz) => {
          return <QuizCard key={quiz.id} title={quiz.name} thumbnail={quiz.thumbnail ? quiz.thumbnail : noThumb } date={quiz.createdAt} questionNum={'0'} totalTime={'0'}/>
        })}
      </div>
    </>
  );
}

export default Quizzes;
