import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Nav.css';
import { disableScroll, enableScroll } from './ScrollUtils';

import HAM_CLOSE from '../assets/images/ham_close.png';
import HAM_OPEN from '../assets/images/ham_open.png';
import LOGO from '../assets/images/nav_logo.svg';

export default function Nav({ posi }) {
    const phone = document.body.clientWidth > 430 ? 'noPhone' : 'yesPhone';
    useEffect(() => {
        if (phone !=='yesPhone'){
            document.querySelectorAll('#nav a').forEach(a=>{
                a.onClick={click_close};
            });
        };
    }, [phone])

    var click_open = (e) =>{
        var target_open = document.getElementById('ham_close');
        var target_close = document.getElementById('ham_open');
        var hamnav = document.getElementById('nav-container');
        var nav = document.getElementById('nav');

        target_open.classList.remove('none');
        target_close.classList.remove('block');

        target_open.classList.add('block');
        target_close.classList.add('none');

        hamnav.style.display = 'flex';
        nav.style.height = '100vh';
        nav.style.backgroundColor = '#000';

        disableScroll();
    }

    var click_close = (e)=>{
        var target_open = document.getElementById('ham_open');
        var target_close = document.getElementById('ham_close');
        var hamnav = document.getElementById('nav-container');
        var nav = document.getElementById('nav');

        target_open.classList.remove('none');
        target_close.classList.remove('block');


        target_open.classList.add('block');
        target_close.classList.add('none');

        hamnav.style.display = 'none';
        nav.style.height = '10vw';
        nav.style.backgroundColor = 'transparent';

        enableScroll();
    }

    return (
        <nav id="nav" style={{ position: posi }}>
            <div id="nav-container" className="nav-container" style={{ display: phone === "noPhone" ? "flex" : "none" }}>
                <NavLink to="/">
                    <div className="logo">
                        <img src={LOGO} alt="LOGO" />
                    </div>
                </NavLink>
                <ul className="menu">
                    <li><NavLink to="/board" className="menu_link" >
                        <div className="menu_top">佈告欄</div>
                        <div className="menu_bottom">BULLETIN BOARD</div>
                    </NavLink></li>
                    <li><NavLink to="/game" className="menu_link">
                        <div className="menu_top">遊戲設定</div>
                        <div className="menu_bottom">GAME PLANNING</div>
                    </NavLink></li>
                    <li><NavLink to="/team" className="menu_link">
                        <div className="menu_top">開發團隊</div>
                        <div className="menu_bottom">DEVELOPMENT TEAM</div>
                    </NavLink></li>
                </ul>
            </div>
            <div className="hambtn" style={{ display: phone === "yesPhone" ? "block" : "none" }}>
                <img id="ham_open" className="block" src={HAM_OPEN} alt="ham_open.png" onClick={click_open.bind(this)} />
                <img id="ham_close" className="none" src={HAM_CLOSE} alt="ham_close.png" onClick={click_close.bind(this)} />
            </div>
        </nav>
    );
}