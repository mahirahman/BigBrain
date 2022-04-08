import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logo_brain.png';
import style from '../css/NavigationMenu.module.css';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsPlusCircle } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { Logout } from '../page/Logout';

export function NavigationMenu () {
  const navigate = useNavigate();
  return (
    <>
      <nav className={style.menu}>
      <img src={logo} alt="BigBrain Logo" className={style.logo_icon} onClick={() => { navigate('/quizzes') }}/>
        <div className={style.menu_links}>
          <div onClick={() => { navigate('/quizzes') }}>
            <IoGameControllerOutline/>
            <div>View All Games</div>
          </div>

          <div onClick={() => { console.log('open new game modal') }}>
            <BsPlusCircle/>
            <div>Create New Game</div>
          </div>

          <Logout>
            <div><BiLogOut/></div>
            Logout
          </Logout>
        </div>
      </nav>
    </>
  );
}

export default NavigationMenu;
