import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';
import QuizCard from '../component/QuizCard';
import style from '../css/Quizzes.module.css';
import { getQuizDataAPI } from '../api';

export function Quizzes () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }

    getQuizDataAPI().then(data => {
      console.log(data)
    })
  }, []);

  return (
    <>
      <NavigationMenu/>
      <div className={style.all_quiz_container}>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      <QuizCard/>
      </div>
    </>
  );
}

export default Quizzes;
