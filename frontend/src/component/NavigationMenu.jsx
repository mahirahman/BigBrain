import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../img/logo_brain.png';
import style from '../css/NavigationMenu.module.css';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsPlusCircle } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import ModalMenu from './ModalMenu';
import AddGameInput from './AddGameInput';

export function NavigationMenu () {
  const navigate = useNavigate();
  const location = useLocation();

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addNewGame = () => {
    handleShow();
  };

  return (
    <>
      <nav className={style.menu}>
        <img src={logo} alt="BigBrain Logo" className={style.logo_icon} onClick={() => { return location.pathname === '/quizzes' ? null : navigate('/quizzes') }}/>
        <div className={style.menu_links}>
          <div onClick={() => { return location.pathname === '/quizzes' ? null : navigate('/quizzes') }}>
            <IoGameControllerOutline/>
            <div>View My Games</div>
          </div>
          <div onClick= { addNewGame }>
            <BsPlusCircle/>
            <div>Create New Game</div>
          </div>
          <div onClick={() => { navigate('/logout') }}>
            <BiLogOut/>
            <div>Logout</div>
          </div>
        </div>
      </nav>
      <ModalMenu handleClose={handleClose} show={show} body={AddGameInput} modalTitle='Create New Game' btnVariant='primary' btnText='Add Game'/>
    </>
  );
}

export default NavigationMenu;
