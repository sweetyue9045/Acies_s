import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Admin.css';

import IMG_CROSS from '../assets/images/add_cross.svg';
import IMG_PLUS from '../assets/images/add_plus.svg';

const Add = () => {
    const IsLogin = JSON.parse(window.localStorage.getItem('UserInfo'));
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const navigate = useNavigate();

    const [title, settitle] = useState('');
    const [img, setimg] = useState('新增封面圖片');
    const [content, setcontent] = useState('');
    const [category, setcategory] = useState('');
    const [loading, setloading] = useState(false)
    const style = {};
    var Today = new Date();

    useEffect(() => {
        const checkoutHandler = () => {
            if (IsLogin.username === '') {
                navigate('/admin')
            }
        }
        checkoutHandler();
    }, [IsLogin, navigate])



    if (img === '新增封面圖片') style.WebkitMaskImage = style.maskImage = `url(${IMG_PLUS})`;
    else style.WebkitMaskImage = style.maskImage = `url(${IMG_CROSS})`;

    const handlePostMessage = async () => {
        if (title === '') {
            window.scrollTo(0, document.getElementById('title').offsetTop + 200);
            setTimeout(function () {
                alert('請填入標題');
            }, 100);
        }
        else if (img === '新增封面圖片') {
            window.scrollTo(0, document.getElementById('img').offsetTop + 200);
            setTimeout(function () {
                alert('請選擇圖片');
            }, 100);
        }
        else if (content === '') {
            window.scrollTo(0, document.getElementById('content').offsetTop + 200);
            setTimeout(function () {
                alert('請填入內文');
            }, 100);
        }
        else if (category === '') {
            window.scrollTo(0, document.getElementById('form-bottom').offsetTop + 200);
            setTimeout(function () {
                alert('請選擇分類');
            }, 100);
        }

        const articles = {
            category: category,
            img: img.name,
            title: title,
            id: APIs.length + 1,
            content: content,
            writer: IsLogin.username,
            writeTime: Today.getFullYear() + '.' + (Today.getMonth() + 1) + '.' + Today.getDate(),
            editer: '',
            editTime: '',
            isPublish: false,
            isPin: false
        };

        if (title !== '' && img !== '新增封面圖片' && content !== '' && category !== '') {
            setloading(true)

            const newAPI = APIs.reverse()
            newAPI.push(articles)

            window.localStorage.setItem('ArticleAPI', JSON.stringify(newAPI));
            setTimeout(() => {
                navigate('/admin/list')
            }, 1000);
        }
    }
    return (
        <>
            <div className="add-container">
                <div className="title">
                    <div className="title-text">新增文章</div>
                </div>
                <form id="articlelist">
                    <input id="title" placeholder="請輸入標題" onChange={(event) => settitle(event.target.value)} maxLength="10" required />
                    <input className="input-file" id="input-file" type="file" accept="image/jpeg,image/png,image/gif"
                        onChange={(event) => {
                            setimg(event.target.files[0]);
                        }} required />
                    <label id="img" htmlFor="input-file" style={{ width: "fit-content" }}>
                        <span className="imgsvg" style={style}></span>
                        {img === "新增封面圖片" ?
                            <span className="imgtext" id="imgtext">{img}</span>
                            :
                            <span className="imgtext" id="imgtext">{img.name}</span>
                        }
                    </label>
                    <textarea id="content" placeholder="開始填寫內容" onChange={(event) => setcontent(event.target.value)} required />
                    <div className="form-bottom" id="form-bottom">
                        <div id="category">
                            <input name="category-list" id="category-01" type="radio" value="程式" onChange={(event) => setcategory(event.target.value)} required />
                            <label className="categorytext" htmlFor="category-01">#程式</label>
                            <input name="category-list" id="category-02" type="radio" value="美術" onChange={(event) => setcategory(event.target.value)} />
                            <label className="categorytext" htmlFor="category-02">#美術</label>
                            <input name="category-list" id="category-03" type="radio" value="企劃" onChange={(event) => setcategory(event.target.value)} />
                            <label className="categorytext" htmlFor="category-03">#企劃</label>
                        </div>
                        {loading ?
                            <div className="sub-btn btn-loading"><div className="loader"></div></div>
                            :
                            <div className="sub-btn" onClick={() => { handlePostMessage(); }}>儲存</div>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default Add;