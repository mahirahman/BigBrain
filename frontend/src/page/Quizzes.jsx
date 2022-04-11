import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';
import QuizCard from '../component/QuizCard';
import style from '../css/Quizzes.module.css';
import { getQuizDataAPI } from '../api';
import noThumb from '../img/quiz_no_thumbnail.png';

export function Quizzes () {
  const [quizCards, addQuizCard] = React.useState([]);
  const [render, reRender] = React.useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const data = await getQuizDataAPI();
      addQuizCard([...data.quizzes]);
    }
    fetchData();
  }, [render]);

  return (
    <>
      <NavigationMenu reRender={reRender}/>
      <div className={style.all_quiz_container}>
        {quizCards.map((quiz) => {
          console.log(quiz);
          return <QuizCard
            randColour = {new Date(quiz.createdAt).getTime()}
            key = {quiz.id}
            quizId = {quiz.id}
            title = {quiz.name}
            thumbnail = {quiz.thumbnail ? quiz.thumbnail : noThumb }
            date = {quiz.createdAt}
            questionNum = {'0'}
            totalTime = {'0'}/>
        })}
      </div>
    </>
  );
}

export default Quizzes;
