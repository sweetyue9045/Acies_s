import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Admin.css';

import IMG_CROSS from '../assets/images/add_cross.svg';
import IMG_PLUS from '../assets/images/add_plus.svg';

const Add = () => {
    const isLogin = JSON.parse(window.localStorage.getItem('UserInfo'));
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const navigate = useNavigate();

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
        if (!isLogin.username) {
            navigate('/admin');
        }
        imgInputRef.current.style.top = imgLabelRef.current.offsetTop - 5 + 'px';
    }, [isLogin, navigate]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const validateForm = () => {
        const { title, img, content, category } = formData;
        return title && img !== '新增封面圖片' && content && category;
    };

    const handlePostMessage = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const articles = {
            category: formData.category,
            img: formData.img.name,
            title: formData.title,
            id: APIs.length + 1,
            content: formData.content,
            writer: isLogin.username,
            writeTime: new Date().toLocaleDateString(),
            editer: '',
            editTime: '',
            isPublish: false,
            isPin: false
        };

        setLoading(true);
        const newAPI = [...APIs, articles];
        window.localStorage.setItem('ArticleAPI', JSON.stringify(newAPI));

        setTimeout(() => {
            setLoading(false);
            navigate('/admin/list');
        }, 1000);
    };

    const imgStyle = {
        WebkitMaskImage: formData.img === '新增封面圖片' ? `url(${IMG_PLUS})` : `url(${IMG_CROSS})`,
        maskImage: formData.img === '新增封面圖片' ? `url(${IMG_PLUS})` : `url(${IMG_CROSS})`
    };

    return (
        <div className="add-container">
            <div className="title">
                <div className="title-text">新增文章</div>
            </div>
            <form id="article-list" onSubmit={handlePostMessage}>
                <input
                    ref={titleInputRef}
                    className="article-title"
                    name="title"
                    placeholder="請輸入標題"
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
                    required
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
                    onChange={handleChange}
                    required
                />
                <div className="form-bottom" id="form-bottom">
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

export default Add;