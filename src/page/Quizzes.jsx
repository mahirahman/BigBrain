import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';
import QuizCard from '../component/QuizCard';
import style from '../css/Quizzes.module.css';
import { getAllQuizDataAPI } from '../util/api';
import noThumb from '../img/quiz_no_thumbnail.png';

export function Quizzes () {
  const [quizCards, addQuizCard] = React.useState([]);
  const [render, reRender] = React.useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const fetchData = async () => {
    const data = await getAllQuizDataAPI();
    addQuizCard([...data.quizzes]);
  }

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [render]);

  return (
    <>
      <NavigationMenu reRender={reRender}/>
      <div className={style.all_quiz_container}>
        {quizCards.map((quiz) => {
          return <QuizCard
            randColour = {quiz.thumbnail ? 0 : new Date(quiz.createdAt).getTime() }
            key = {quiz.id}
            quizId = {quiz.id}
            title = {quiz.name}
            thumbnail = {quiz.thumbnail ? quiz.thumbnail : noThumb }
            date = {quiz.createdAt}
            />
        })}
      </div>
    </>
  );
}

export default Quizzes;
