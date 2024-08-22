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
    const [password, setpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [eyes, seteyes] = useState(EYES_CLOSE)
    const [arti_minHeight, setArti_minHeight] = useState()

    useEffect(() => {
        const checkoutHandler = () => {
            if (IsLogin.username === '') {
            }
            else {
                navigate('/admin/list')
            }
        }

        checkoutHandler();
        const containerHeight = Number(getComputedStyle(document.getElementById('login')).marginTop.replace('px', ''))
        const footerHeight = document.getElementById('footer').offsetHeight
        setArti_minHeight(document.body.clientHeight - containerHeight - footerHeight)
    }, [IsLogin, navigate])


    const userLogin = {
        email: email,
        password: password
    };
    const onFinish = async (e) => {
        e.preventDefault();
        setloading(true)

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
            setpassword('');
            setloading(false);
        }

    };

    const ShowHidePassWord = () => {
        var txtPasw = document.getElementById('password');
        if (txtPasw.type === 'text') {
            txtPasw.type = 'password';
            seteyes(EYES_CLOSE)
        }
        else {
            txtPasw.type = 'text';
            seteyes(EYES_OPEN)
        }
    }
    return (
        <>
            <div className="login-container" id="login" style={{ minHeight: arti_minHeight }}>
                <div className="login_card">
                    <div className="title">管理員登入</div>
                    <form action="" className="login_input">
                        <input type="email" className="input" id="email" placeholder="帳號" onChange={(event) => setemail(event.target.value)} autoComplete="off" required />
                        <div style={{ width: "100%" }}>
                            <input type="password" className="input" id="password" placeholder="密碼" onChange={(event) => setpassword(event.target.value)} autoComplete="off" required />
                            <div className="pass_eyes" onClick={ShowHidePassWord} style={{ backgroundImage: `url(${eyes})` }}></div>
                        </div>
                        {/* {loading ?
                            <input type="submit" value="load..." className="login_btn" disabled />
                            :
                            <input type="submit" value="登入" onClick={onFinish} className="login_btn" />
                        } */}
                        {loading ?
                            <div className="login_btn btn_loading"><div className="loader"></div></div>
                            :
                            <div className="login_btn" onClick={onFinish}>登入</div>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;
