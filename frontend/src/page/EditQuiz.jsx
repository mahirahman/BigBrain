import React from 'react';
import NavigationMenu from '../component/NavigationMenu';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizDataAPI } from '../api';
import EditQuizCard from '../component/EditQuizCard';
import noThumb from '../img/quiz_no_thumbnail.png';

export function EditQuiz () {
  const params = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = React.useState({});
  const token = localStorage.getItem('authToken');

  const fetchData = async () => {
    const data = await getQuizDataAPI(params.quizID);
    if (data.error) {
      navigate('/quizzes');
      return;
    }
    setQuizData(data);
  }

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    fetchData();
  }, []);

  return (
    <>
      <NavigationMenu/>
      <EditQuizCard
      quizID = {params.quizID}
      name = {quizData.name}
      thumbnail = {quizData.thumbnail ? quizData.thumbnail : noThumb}
      randColour = {quizData.thumbnail ? 0 : new Date(quizData.createdAt).getTime() }
      questions = {quizData.questions}
      />
    </>
  );
}

export default EditQuiz;
