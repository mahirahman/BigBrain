import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';
import QuizCard from '../component/QuizCard';
import style from '../css/Quizzes.module.css';
import { getAllQuizDataAPI, getQuizDataAPI } from '../util/api';
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

  const getQuizQuestionMetaData = async (quizId) => {
    const data = await getQuizDataAPI(quizId);
    return await data;
    // if (!data.length) return [0, 0];

    // const totalQuestion = await data.questions.length;
    // let totalTime = 0;
    // await data.questions.forEach(question => {
    //   totalTime += question.timeLimit;
    // })
    // console.log([totalQuestion, totalTime]);
    // return [totalQuestion, totalTime / 60];
  };

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
          console.log(getQuizQuestionMetaData(quiz.id));
          return <QuizCard
            randColour = {quiz.thumbnail ? 0 : new Date(quiz.createdAt).getTime() }
            key = {quiz.id}
            quizId = {quiz.id}
            title = {quiz.name}
            thumbnail = {quiz.thumbnail ? quiz.thumbnail : noThumb }
            date = {quiz.createdAt}
            questionNum = {0}
            totalTime = {0}
            />
        })}
      </div>
    </>
  );
}

export default Quizzes;
