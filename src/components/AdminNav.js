import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../style/AdminNav.css';

import LOGO from '../assets/images/a_nav_logo.svg';

export default function Nav({ bg, posi, isDisabledLink }) {
    const IsLogin = JSON.parse(window.localStorage.getItem('UserInfo'));
    const navigate = useNavigate();

    useEffect(() => {
        const LogoutButton = () => {
            if (isDisabledLink) {
                document.getElementById('logout').style.display = 'none';
            } else {
                document.getElementById('logout').style.display = 'flex';
            }
        }
        document.body.scrollTo(0, 0);
        LogoutButton();
    }, [IsLogin])


    const Logout = async (e) => {
        e.preventDefault();
        const islogin = {
            email: '',
            userName: '',
            id: ''
        }
        window.localStorage.setItem('UserInfo', JSON.stringify(islogin));
        navigate('/admin');
    };

    return (
        <div className="a-nav" id="nav" style={{ backgroundColor: bg, position: posi }}>
            <div className="nav-left">
                {isDisabledLink ? (
                    <div className="logo">
                        <img src={LOGO} alt="LOGO" />
                    </div>
                ) : (
                    <NavLink to="/admin/list">
                        <div className="logo">
                            <img src={LOGO} alt="LOGO" />
                        </div>
                    </NavLink>
                )}
                <div className="symbol">
                    管理模式
                </div>
            </div>
            <div className="nav-right">
                <div className="user">
                    {IsLogin.userName === ""
                        ? ``
                        : IsLogin.userName
                    }
                </div>
                <input id="logout" type="button" value="登出" onClick={Logout} className="login-btn" />
            </div>
        </div>
    );
}