import "../style/Nav.css";
import { Link } from "react-router-dom";

import LOGO from "../assets/images/nav_logo.svg";
import HAM_OPEN from "../assets/images/ham_open.png";
import HAM_CLOSE from "../assets/images/ham_close.png";


export default function Nav({ posi }) {
    const ClickHandler = (event) => {
        event.preventDefault();
    };
    const phone = document.body.clientWidth > 430 ? "noPhone" : "yesPhone";


    var click_open = function (e) {
        var target_open = document.getElementById("ham_close");
        var target_close = document.getElementById("ham_open");
        var hamnav = document.getElementById("nav-container");
        var nav = document.getElementById("nav");

        target_open.classList.remove("none");
        target_close.classList.remove("block");

        target_open.classList.add("block");
        target_close.classList.add("none");

        hamnav.style.display = "flex";
        nav.style.height = "100vh";
        nav.style.backgroundColor = "#000";

        console.log("open")
    }

    var click_close = function (e) {
        var target_open = document.getElementById("ham_open");
        var target_close = document.getElementById("ham_close");
        var hamnav = document.getElementById("nav-container");
        var nav = document.getElementById("nav");

        target_open.classList.remove("none");
        target_close.classList.remove("block");


        target_open.classList.add("block");
        target_close.classList.add("none");

        hamnav.style.display = "none";
        nav.style.height = "10vw";
        nav.style.backgroundColor = "transparent";

        console.log("close")
    }
    return (
        <nav id="nav" style={{ position: posi }}>
            <div id="nav-container" className="nav-container" style={{ display: phone == "noPhone" ? "flex" : "none" }}>
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
            </div>
            <div className="hambtn" style={{ display: phone == "yesPhone" ? "block" : "none" }}>
                <img id="ham_open" className="block" src={HAM_OPEN} alt="ham_open.png" onClick={click_open.bind(this)} />
                <img id="ham_close" className="none" src={HAM_CLOSE} alt="ham_close.png" onClick={click_close.bind(this)} />
            </div>
        </nav>
    );
}