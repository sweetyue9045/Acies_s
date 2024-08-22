import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Article.css';

import BACKNAV from '../assets/images/backnav.svg';

import Title from '../components/Title';

const Article = () => {
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const navigate= useNavigate();

    const { articleTitle } = useParams();
    const Content = APIs.find((x) => x.title === articleTitle);

    const [articleMinHeight, setArticleMinHeight] = useState()
    useEffect(() => {
        const containerHeight = Number(getComputedStyle(document.getElementById('article')).marginTop.replace('px', ''));
        const backNavHeight = Number(getComputedStyle(document.getElementById('backnav')).marginTop.replace('px', '')) + document.getElementById('backnav').offsetHeight + Number(getComputedStyle(document.getElementById('backnav')).marginBottom.replace('px', ''));
        const footerHeight = document.getElementById('footer').offsetHeight;

        setArticleMinHeight(document.body.clientHeight - containerHeight - backNavHeight - footerHeight);
    }, []);

    return (
        <>
            <div className="article-container" id="article" style={{ minHeight: articleMinHeight }}>
                <div className="article-category">#{Content.category}</div>
                <Title mainTitle={Content.title} />
                <div className="article-time">{Content.writeTime}</div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: Content.content }}></div>
            </div>
            <div className="BackNav" id="backnav">
                <div onClick={() => navigate(-1)} className="backnav">
                    <img src={BACKNAV} alt="BACKNAV" />
                    <p>返回</p>
                </div>
            </div >
        </>
    );
}


export default Article;

