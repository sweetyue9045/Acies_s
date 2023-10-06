import "../style/Article.css";
import { useParams } from "react-router-dom";

import devs from "../assets/jsons/article.json";

import Title from "../components/Title";

const Article = () => {
    // const Content = article.content.replaceAll("\n", "<br />");
    const { typeId } = useParams()
    const Content = devs.find(
        (x) => x.id == typeId
    );

    return (
        <div className="Article">
            <div className="arti_category">#{Content.category}</div>
            <Title Title_top={Content.title} />
            <div className="arti_time">{Content.write_time}</div>
            <div className="arti_content" dangerouslySetInnerHTML={{ __html: Content.content }}></div>
        </div>
    );
}


export default Article;

