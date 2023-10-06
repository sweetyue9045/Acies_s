import "../style/Board.css";
import { useEffect, useState, useRef } from "react";

import NEWS_BOTTOM from "../assets/images/news_bottom.svg";
import news from "../assets/jsons/news.json";

import DATA_PLAN from "../assets/images/data_plan.svg"
import DATA_INTRO from "../assets/images/data_intro.svg"

import Nav from "../components/Nav";
import Footer from "../components/Footer";

var n = 0;
var intervalID = 0;
const Board = () => {
    const [tab, settab] = useState(0);

    useEffect(() => {
        document.body.scrollTo(0, 0);
        intervalID = setInterval(timer, 5000);
    }, []);


    var timer = () => {
        n++;
        if (n >= 3) n = 0;
        settab(n);
    }

    var click = (index) => {
        clearInterval(intervalID);
        intervalID = setInterval(timer, 5000);
        n = index;
    }

    return (
        <>
            <Nav posi="fixed" />
            <div className="board-container">
                <div className="news">
                    <div className="n_left">
                        <Title Title_top="最新消息" Title_bottom="BREAKING NEWS" ls="9.5px" lss="3px" />
                        <div className="logo">
                            <div className="text">ACIES</div>
                            <div className="text">TWIN JOURNEY</div>
                            <img src={NEWS_BOTTOM} alt="NEWS_BOTTOM" />
                        </div>
                    </div>
                    <div className="n_right">
                        {news.map((news, index) => (
                            <div key={news.key} className={tab === index ? "carousel_img showbox" : "carousel_img"} style={{ backgroundImage: "url(" + news.im + ")" }}>
                                <div className="mask"></div>
                                <div className="content">
                                    <div className="content_title">{news.title}</div>
                                    <div className="content_text" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                                </div>
                            </div>
                        ))}
                        <div className="dot_block">
                            {news.map((news, index) => (
                                <div key={news.key} className={tab === index ? "carousel_dot choose" : "carousel_dot"}
                                    onClick={() => {
                                        settab(index); click(index);
                                    }}>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="data">
                <a href="https://drive.google.com/file/d/1NJdzM0ngJoukLee-YZKTkbeaHHzL1kX-/view" target="_blank" rel="noreferrer" className="data_link">
                    <img src={DATA_PLAN} alt="DATA_PLAN" />
                    <div className="data_ch">企劃書</div>
                    <div className="data_en">PLAN DOC</div>
                </a>
                <a href="https://docs.google.com/presentation/d/1Lvh3ahMIZKbyEIfSaK5jPE4o7QqHQVQM/edit#slide=id.p1" target="_blank" rel="noreferrer" className="data_link">
                    <img src={DATA_INTRO} alt="DATA_INTRO" />
                    <div className="data_ch">介紹簡報</div>
                    <div className="data_en">INTRO DECK</div>
                </a>
            </div>
            <Footer />
        </>
    );
}

const Title = ({ Title_top, Title_bottom, Id, ls, lss }) => {
    const style = {};
    if (document.body.clientWidth <= 834) style.letterSpacing = lss;
    else style.letterSpacing = ls;

    return (
        <div className="title" id={Id}>
            <div className="title_top">{Title_top}</div>
            <div className="title_bottom" style={style}>{Title_bottom}</div>
        </div>
    );
}

export default Board;

