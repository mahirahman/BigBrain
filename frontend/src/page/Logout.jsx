import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Logout ({ children }) {
  Logout.propTypes = {
    children: PropTypes.func.isRequired
  };

  const navigate = useNavigate();
  const toLogin = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  return (
    <>
      <div onClick={toLogin}>{children}</div>
    </>
  );
}

export default Logout;
