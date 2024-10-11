import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../style/Article.css';
import BACKNAV from '../assets/images/backnav.svg';
import Title from '../components/Title';

const Article = () => {
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const navigate = useNavigate();
    const { articleTitle } = useParams();
    const Content = APIs.find((x) => x.title === articleTitle);

    const [articleMinHeight, setArticleMinHeight] = useState();
    const articleRef = useRef(null);
    const backNavRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        if (articleRef.current && backNavRef.current && footerRef.current) {
            const containerHeight = Number(getComputedStyle(articleRef.current).marginTop.replace('px', ''));
            const backNavHeight = Number(getComputedStyle(backNavRef.current).marginTop.replace('px', '')) + backNavRef.current.offsetHeight + Number(getComputedStyle(backNavRef.current).marginBottom.replace('px', ''));
            const footerHeight = footerRef.current.offsetHeight;

            setArticleMinHeight(document.body.clientHeight - containerHeight - backNavHeight - footerHeight);
        }
    }, []);

    return (
        <>
            <div className="article-container" id="article" ref={articleRef} style={{ minHeight: articleMinHeight }}>
                <div className="article-category">#{Content.category}</div>
                <Title mainTitle={Content.title} />
                <div className="article-time">{Content.writeTime}</div>
                <div className="article-content" dangerouslySetInnerHTML={{ __html: Content.content }}></div>
            </div>
            <div className="BackNav" id="backnav" ref={backNavRef}>
                <div onClick={() => navigate(-1)} className="backnav">
                    <img src={BACKNAV} alt="BACKNAV" />
                    <p>返回</p>
                </div>
            </div>
        </>
    );
}

export default Article;