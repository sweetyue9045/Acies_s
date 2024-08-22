import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Admin.css';

import IMG_CROSS from '../assets/images/add_cross.svg';

const Edit = () => {
    const navigate = useNavigate();
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const IsLogin = JSON.parse(window.localStorage.getItem("UserInfo"));

    const { articleID } = useParams();
    const Content = APIs.find(
        (x) => x.id === Number(articleID)
    );

    const [title, setTitle] = useState('');
    const [img, setImg] = useState('新增封面圖片');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(false);
    const Today = new Date();


    const editMessages = () => {
        document.getElementById("title").value = Content.title
        document.getElementById("content").value = Content.content
        var radionum = document.getElementById("articlelist").category_list
        for (var i = 0; i < radionum.length; i++) {
            if (radionum[i].value === Content.category) {
                radionum[i].checked = true;
            }
        }
        setImg(Content.img)
        setTitle(Content.title)
        setContent(Content.content)
        setCategory(Content.category)
    }

    useEffect(() => {
        editMessages()
    }, []);

    const handlePutMessage = async (id) => {
        if (!title) {
            window.scrollTo(0, document.getElementById('title').offsetTop + 200);
            alert('請填入標題');
            return;
        }
        if (img === '新增封面圖片') {
            window.scrollTo(0, document.getElementById('img').offsetTop + 200);
            alert('請選擇圖片');
            return;
        }
        if (!content) {
            window.scrollTo(0, document.getElementById('content').offsetTop + 200);
            alert('請填入內文');
            return;
        }
        if (!category) {
            window.scrollTo(0, document.getElementById('form_bottom').offsetTop + 200);
            alert('請選擇分類');
            return;
        }

        setLoading(true);

        const articleToUpdate = APIs.find((x) => x.id === id);

        if (articleToUpdate) {
            articleToUpdate.category = category;
            articleToUpdate.img = img === Content.img ? img : img.name;
            articleToUpdate.title = title;
            articleToUpdate.content = content;
            articleToUpdate.editer = IsLogin.username;
            articleToUpdate.edit_time = `${Today.getFullYear()}.${Today.getMonth() + 1}.${Today.getDate()}`;
        }

        window.localStorage.setItem('ArticleAPI', JSON.stringify(APIs));

        setTimeout(() => {
            navigate('/admin/list');
        }, 1000);
    };

    return (
        <>
            <div className="edit-container">
                <div className="title">
                    <div className="title_text">編輯文章</div>
                </div>
                <form id="articlelist">
                    <input id="title" type="text" placeholder="請輸入標題" onChange={(e) => setTitle(e.target.value)} maxLength="10" />
                    <input className="input-file" id="input-file" type="file" accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => { setImg(e.target.files[0]); }} />
                    <label id="img" htmlFor="input-file" style={{ width: "fit-content" }}>
                        <span className="imgsvg" style={{
                            WebkitMaskImage: `url(${IMG_CROSS})`,
                            maskImage: `url(${IMG_CROSS})`
                        }}></span>
                        {img === Content.img ?
                            <span className="imgtext" id="imgtext">{img}</span>
                            :
                            <span className="imgtext" id="imgtext">{img.name}</span>
                        }
                    </label>
                    <textarea id="content" placeholder="開始填寫內容" onChange={(e) => setContent(e.target.value)} />
                    <div className="form_bottom">
                        <div id="category">
                            <input name="category_list" id="category_01" type="radio" value="程式" onChange={(e) => setCategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_01">#程式</label>
                            <input name="category_list" id="category_02" type="radio" value="美術" onChange={(e) => setCategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_02">#美術</label>
                            <input name="category_list" id="category_03" type="radio" value="企劃" onChange={(e) => setCategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_03">#企劃</label>
                        </div>
                        {loading ?
                            <div className="sub_btn btn_loading"><div className="loader"></div></div>
                            :
                            <div className="sub_btn" onClick={() => { handlePutMessage(Content.id) }}>儲存</div>
                        }
                    </div>
                </form>
            </div >
        </>
    )
}

export default Edit;