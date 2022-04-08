import React from 'react';
import { useNavigate } from 'react-router-dom';
// import NavigationMenu from '../component/NavigationMenu';

export function Logout () {
  const navigate = useNavigate();
  const toLogin = () => {
    localStorage.setItem('authToken', '');
    navigate('/login');
  };
  return (
    <>
      <button onClick={toLogin} className="btn btn-success">
        Sign out
      </button>
    </>
  );
}
export default Logout;
