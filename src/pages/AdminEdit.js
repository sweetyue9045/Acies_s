import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Admin.css';

import IMG_CROSS from '../assets/images/add_cross.svg';

const Edit = () => {
    const navigate = useNavigate();
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const isLogin = JSON.parse(window.localStorage.getItem("UserInfo"));
    const { articleID } = useParams();
    const Content = APIs.find((x) => x.id === Number(articleID));

    const [formData, setFormData] = useState({
        title: '',
        img: '新增封面圖片',
        content: '',
        category: ''
    });
    const [loading, setLoading] = useState(false);

    const imgInputRef = useRef(null);
    const imgLabelRef = useRef(null);
    const titleInputRef = useRef(null);
    const contentTextareaRef = useRef(null);

    useEffect(() => {
        const editMessages = () => {
            titleInputRef.current.value = Content.title;
            contentTextareaRef.current.value = Content.content;
            var radioButtons = document.getElementsByName("category-list");

            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].value === Content.category) {
                    radioButtons[i].checked = true;
                }
            }
            setFormData({
                title: Content.title,
                img: Content.img,
                content: Content.content,
                category: Content.category
            });
        }
        editMessages();
        imgInputRef.current.style.top = imgLabelRef.current.offsetTop - 5 + 'px';

    }, [Content.title, Content.img, Content.content, Content.category]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const validateForm = () => {
        const { title, content, category } = formData;
        return title && content && category;
    };

    const handlePostMessage = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const articleToUpdate = APIs.find(x => x.id === Number(articleID));

        if (articleToUpdate) {
            articleToUpdate.category = formData.category;
            articleToUpdate.img = formData.img === '新增封面圖片' ? articleToUpdate.img : formData.img.name;
            articleToUpdate.title = formData.title;
            articleToUpdate.content = formData.content;
            articleToUpdate.editer = isLogin.username;
            articleToUpdate.editTime = new Date().toLocaleDateString();
        }

        setLoading(true);
        window.localStorage.setItem('ArticleAPI', JSON.stringify(APIs));

        setTimeout(() => {
            setLoading(false);
            navigate('/admin/list');
        }, 1000);
    };

    const imgStyle = {
        WebkitMaskImage: formData.img === '新增封面圖片' ? `url(${IMG_CROSS})` : `url(${IMG_CROSS})`,
        maskImage: formData.img === '新增封面圖片' ? `url(${IMG_CROSS})` : `url(${IMG_CROSS})`
    };

    return (
        <div className="edit-container">
            <div className="title">
                <div className="title-text">編輯文章</div>
            </div>
            <form id="article-list" onSubmit={handlePostMessage}>
                <input
                    ref={titleInputRef}
                    className="article-title"
                    name="title"
                    type="text"
                    placeholder="請輸入標題"
                    value={formData.title}
                    onChange={handleChange}
                    maxLength="10"
                    required
                />
                <input
                    ref={imgInputRef}
                    id="input-file"
                    name="img"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleChange}
                />
                <label ref={imgLabelRef} className="article-img" htmlFor="input-file" style={{ width: "fit-content" }}>
                    <span className="imgsvg" style={imgStyle}></span>
                    <span className="imgtext" id="imgtext">
                        {formData.img instanceof File ? formData.img.name : formData.img}
                    </span>
                </label>
                <textarea
                    ref={contentTextareaRef}
                    className="article-content"
                    name="content"
                    placeholder="開始填寫內容"
                    value={formData.content}
                    onChange={handleChange}
                    required
                />
                <div className="form-bottom">
                    <div className="article-category">
                        {['程式', '美術', '企劃'].map((category) => (
                            <>
                                <input
                                    name="category"
                                    id={`category-${category}`}
                                    className="category-input"
                                    type="radio"
                                    value={category}
                                    checked={formData.category === category}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="category-text" htmlFor={`category-${category}`}>
                                    #{category}
                                </label>
                            </>
                        ))}
                    </div>
                    {loading ? (
                        <div className="sub-btn btn-loading">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        <button type="submit" className="sub-btn">儲存</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Edit;