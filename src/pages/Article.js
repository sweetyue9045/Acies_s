import "../style/Article.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import devs from "../assets/jsons/article.json";
import BACKNAV from "../assets/images/backnav.svg";

import Nav from "../components/Nav";
import Title from "../components/Title";
import Footer from "../components/Footer";

const Article = () => {
    const { typeId } = useParams()
    const Content = devs.find(
        (x) => x.id == typeId
    );

    return (
        <>
            <Nav />
            <div className="article-container">
                <div className="arti_category">#{Content.category}</div>
                <Title Title_top={Content.title} />
                <div className="arti_time">{Content.write_time}</div>
                <div className="arti_content" dangerouslySetInnerHTML={{ __html: Content.content }}></div>
            </div>
            <div className="BackNav">
            <Link to={`/board`} className="backnav">
                <img src={BACKNAV} alt="BACKNAV" />
                <p>返回</p>
            </Link>
        </div>
            <Footer />
        </>
    );
}


export default Article;

