import "../style/Article.css";
import { Link, useParams,useNavigate  } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";

import BACKNAV from "../assets/images/backnav.svg";

import Nav from "../components/Nav";
import Title from "../components/Title";

// let arti_minHeight
const Article = () => {
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const navigate= useNavigate();

    const { articleTitle } = useParams()
    const Content = APIs.find(
        (x) => x.title == articleTitle
    )

    const [arti_minHeight, setArti_minHeight] = useState()
    useEffect(() => {
        // document.body.scrollTo(0, 0);
        const containerHeight = Number(getComputedStyle(document.getElementById("article")).marginTop.replace('px', ''))
        const backnavHeight = Number(getComputedStyle(document.getElementById("backnav")).marginTop.replace('px', '')) + document.getElementById("backnav").offsetHeight + Number(getComputedStyle(document.getElementById("backnav")).marginBottom.replace('px', ''))
        const footerHeight = document.getElementById("footer").offsetHeight

        setArti_minHeight(document.body.clientHeight - containerHeight - backnavHeight - footerHeight)
    }, []);

    return (
        <>
            <Nav/>
            <div className="article-container" id="article" style={{ minHeight: arti_minHeight }}>
                <div className="arti_category">#{Content.category}</div>
                <Title Title_top={Content.title} />
                <div className="arti_time">{Content.write_time}</div>
                <div className="arti_content" dangerouslySetInnerHTML={{ __html: Content.content }}></div>
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

