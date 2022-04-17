import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditQuestionCard from '../component/EditQuestionCard';
import NavigationMenu from '../component/NavigationMenu';
import { getQuizDataAPI } from '../util/api';

function EditQuestion () {
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const [questionData, setQuestionData] = React.useState({});
  const [questionList, setQuestionList] = React.useState([]);

  const fetchData = async () => {
    const data = await getQuizDataAPI(params.quizId);
    if (data.error) {
      navigate('/quizzes');
      return;
    }
    setQuestionList(data.questions);
    // Check if questionId parameter exists in data (i.e the question exists)
    let found = false;
    data.questions.forEach(question => {
      if (question.questionId === params.questionId) {
        setQuestionData(question);
        found = true;
      }
    });
    if (!found) {
      navigate('/quizzes');
    }
  };

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    fetchData();
  }, []);

  return (
    <>
      <NavigationMenu/>
      <EditQuestionCard
        quizId = {params.quizId}
        questionData = {questionData}
        questionList = {questionList}
      />
    </>
  );
}

export default EditQuestion;
