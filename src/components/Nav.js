import "../style/Nav.css";

import LOGO from "../assets/images/nav_logo.svg";

import { Link } from "react-router-dom";

export default function Nav({ posi }) {
    return (
        <nav style={{ position: posi }}>
            <Link to="/">
                <div className="logo">
                    <img src={LOGO} alt="LOGO" />
                </div>
            </Link>
            <ul className="menu">
                <li><Link to="/board" className="menu_link">
                    <div className="menu_top">佈告欄</div>
                    <div className="menu_bottom">BULLETIN BOARD</div>
                </Link></li>
                <li><Link to="/game" className="menu_link">
                    <div className="menu_top">遊戲設定</div>
                    <div className="menu_bottom">GAME PLANNING</div>
                </Link></li>
                <li><Link to="/team" className="menu_link">
                    <div className="menu_top">開發團隊</div>
                    <div className="menu_bottom">DEVELOPMENT TEAM</div>
                </Link></li>
            </ul>
        </nav>
    );
}