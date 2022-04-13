import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUserAPI } from '../util/api';

export function Logout ({ children }) {
  Logout.propTypes = {
    children: PropTypes.array.isRequired
  };

  const navigate = useNavigate();
  const toLogin = async () => {
    await logoutUserAPI();
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
