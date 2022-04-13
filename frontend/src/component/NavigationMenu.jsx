import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../img/logo_brain.png';
import style from '../css/NavigationMenu.module.css';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsPlusCircle } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import AddGameModal from './AddGameModal';
import Logout from '../page/Logout';
import PropTypes from 'prop-types';

export function NavigationMenu (props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  NavigationMenu.propTypes = {
    reRender: PropTypes.func,
  };

  const currPath = location.pathname;

  return (
    <>
      <nav className={style.menu}>
        <img src={logo} alt="BigBrain Logo" className={style.logo_icon} onClick={() => { return currPath === '/quizzes' ? null : navigate('/quizzes') }}/>
        <div className={style.menu_links}>
          <div onClick={() => { return currPath === '/quizzes' ? null : navigate('/quizzes') }}>
            <IoGameControllerOutline/>
            <div>View My Games</div>
          </div>

          <div onClick= { handleShow }>
            <BsPlusCircle/>
            <div>Create New Game</div>
          </div>

          <Logout>
            <div><BiLogOut/></div>
            Logout
          </Logout>
        </div>
      </nav>
      <AddGameModal handleClose={handleClose} show={show} reRender={props.reRender}/>
    </>
  );
}

export default NavigationMenu;
