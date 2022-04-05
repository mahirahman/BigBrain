import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Quizzes () {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  React.useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  return (
    <>
      <h1>WELCOME!!!!!!!</h1>
    </>
  );
}

export default Quizzes;
