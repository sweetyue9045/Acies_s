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
        if (phone == 'yesPhone') {
            document.querySelectorAll('#nav a').forEach(a => {
                a.onclick = clickClose;
            });
        };
    }, [phone])

    var clickOpen = (e) => {
        var targetOpen = document.getElementById('ham-close');
        var targetClose = document.getElementById('ham-open');
        var hamNav = document.getElementById('nav-container');
        var nav = document.getElementById('nav');

        targetOpen.classList.remove('none');
        targetClose.classList.remove('block');

        targetOpen.classList.add('block');
        targetClose.classList.add('none');

        hamNav.style.display = 'flex';
        nav.style.height = '100vh';
        nav.style.backgroundColor = '#000';

        disableScroll();
    }

    var clickClose = (e) => {
        var targetOpen = document.getElementById('ham-open');
        var targetClose = document.getElementById('ham-close');
        var hamNav = document.getElementById('nav-container');
        var nav = document.getElementById('nav');

        targetOpen.classList.remove('none');
        targetClose.classList.remove('block');


        targetOpen.classList.add('block');
        targetClose.classList.add('none');

        hamNav.style.display = 'none';
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
                    <li><NavLink to="/board" className="menu-link" >
                        <div className="menu-top">佈告欄</div>
                        <div className="menu-bottom">BULLETIN BOARD</div>
                    </NavLink></li>
                    <li><NavLink to="/game" className="menu-link">
                        <div className="menu-top">遊戲設定</div>
                        <div className="menu-bottom">GAME PLANNING</div>
                    </NavLink></li>
                    <li><NavLink to="/team" className="menu-link">
                        <div className="menu-top">開發團隊</div>
                        <div className="menu-bottom">DEVELOPMENT TEAM</div>
                    </NavLink></li>
                </ul>
            </div>
            <div className="hambtn" style={{ display: phone === "yesPhone" ? "block" : "none" }}>
                <img id="ham-open" className="block" src={HAM_OPEN} alt="ham-open.png" onClick={clickOpen} />
                <img id="ham-close" className="none" src={HAM_CLOSE} alt="ham-close.png" onClick={clickClose} />
            </div>
        </nav>
    );
}