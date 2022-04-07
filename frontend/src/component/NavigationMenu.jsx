import React from 'react';
import logo from '../icons/logo_brain.png';
import style from '../css/NavigationMenu.module.css';

export function NavigationMenu () {
  return (
    <>
      <div className={style.menu}>
        <div className={style.logo}>
          <img src={logo} alt="BigBrain Logo" className={style.logo_icon} />
          <h1 className={style.logo_text}>BigBrain</h1>
        </div>
      </div>
    </>
  );
}

export default NavigationMenu;
