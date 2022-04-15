import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationMenu from '../component/NavigationMenu';

function EditQuestion () {
  const params = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // fetchData();
  }, []);

  return (
    <>
      <NavigationMenu/>
      <h1>Question {params.questionId} of Quiz {params.quizId}</h1>
    </>
  );
}

export default EditQuestion;
