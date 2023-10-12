import "../style/AdminNav.css";
import { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import LOGO from "../assets/images/a_nav_logo.svg";



export default function Nav({ bg, posi }) {
    const IsLogin = JSON.parse(window.localStorage.getItem("UserInfo"));
    const history = useNavigate();

    useEffect(() => {
        document.body.scrollTo(0, 0);
        LogoutButton();
    }, [])
    const LogoutButton = () => {
        if (IsLogin.username == "") {
            document.getElementById("logout").style.display = "none";
        } else {
            document.getElementById("logout").style.display = "flex";
        }
    }

    const Logout = async (e) => {
        e.preventDefault();
        const islogin = {
            email: "",
            username: "",
            id: ""
        }
        window.localStorage.setItem("UserInfo", JSON.stringify(islogin));
        history("/admin");
    };

    return (
        <div className="a_nav" id="nav" style={{ backgroundColor: bg, position: posi }}>
            <div className="nav_left">
                <Link to="/admin/list">
                    <div className="logo">
                        <img src={LOGO} alt="LOGO" />
                    </div>
                </Link>
                <div className="symbol">
                    管理模式
                </div>
            </div>
            <div className="nav_right">
                <div className="user">
                    {IsLogin.username == ""
                        ? ``
                        : IsLogin.username
                    }
                </div>
                <input id="logout" type="button" value="登出" onClick={Logout} className="login_btn" />
            </div>
        </div>
    );
}