import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Admin.css';

import EYES_CLOSE from '../assets/images/login_eyes_close.svg';
import EYES_OPEN from '../assets/images/login_eyes_open.svg';
import adminInfo from '../assets/jsons/admin.json';


const Login = () => {
    const IsLogin = JSON.parse(window.localStorage.getItem('UserInfo'));
    const navigate = useNavigate();

    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [eyes, setEyes] = useState(EYES_CLOSE)
    const [loginMinHeight, setLoginMinHeight] = useState()

    useEffect(() => {
        const handleCheckout = () => {
            if (IsLogin.username) {
                navigate('/admin/list');
            }
        }

        handleCheckout();
        const containerHeight = Number(getComputedStyle(document.getElementById('login')).marginTop.replace('px', ''))
        const footerHeight = document.getElementById('footer').offsetHeight
        setLoginMinHeight(document.body.clientHeight - containerHeight - footerHeight)
    }, [IsLogin, navigate])


    const userLogin = {
        email: email,
        password: password
    };
    const onFinish = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const foundUser = adminInfo.find((x) => {
                return x.email === userLogin.email && x.password === userLogin.password;
            });

            if (foundUser) {
                const islogin = {
                    email: foundUser.email,
                    username: foundUser.username,
                    id: foundUser.id
                };
                window.localStorage.setItem('UserInfo', JSON.stringify(islogin));
                navigate('/admin/list');
            } else {
                alert('登入失敗');
            }
        } catch (error) {
            console.error('登入失敗:', error);
        } finally {
            document.getElementById('password').value = '';
            setPassword('');
            setLoading(false);
        }

    };

    const showPassword = () => {
        var txtPasw = document.getElementById('password');
        if (txtPasw.type === 'text') {
            txtPasw.type = 'password';
            setEyes(EYES_CLOSE)
        }
        else {
            txtPasw.type = 'text';
            setEyes(EYES_OPEN)
        }
    }
    return (
        <>
            <div className="login-container" id="login" style={{ minHeight: loginMinHeight }}>
                <div className="login-card">
                    <div className="title">管理員登入</div>
                    <form action="" className="login-input">
                        <input type="email" className="input" id="email" placeholder="帳號" onChange={(event) => setemail(event.target.value)} autoComplete="off" required />
                        <div style={{ width: "100%" }}>
                            <input type="password" className="input" id="password" placeholder="密碼" onChange={(event) => setPassword(event.target.value)} autoComplete="off" required />
                            <div className="pass-eyes" onClick={showPassword} style={{ backgroundImage: `url(${eyes})` }}></div>
                        </div>
                        {loading ?
                            <div className="login-btn btn-loading"><div className="loader"></div></div>
                            :
                            <div className="login-btn" onClick={onFinish}>登入</div>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
