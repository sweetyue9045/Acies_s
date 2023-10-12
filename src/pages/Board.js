import "../style/Board.css";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import NEWS_BOTTOM from "../assets/images/news_bottom.svg";
import news from "../assets/jsons/news.json";
import DEV_RIGHT from "../assets/images/dev_right.svg";
import DEV_NEXT from "../assets/images/dev_next.svg";
import DEV_PREV from "../assets/images/dev_prev.svg";
import DATA_PLAN from "../assets/images/data_plan.svg"
import DATA_INTRO from "../assets/images/data_intro.svg"

import Nav from "../components/Nav";
import Title from "../components/Title";
import Footer from "../components/Footer";


var n = 0;
var intervalID = 0;
let PAGE_NEXT;
const Board = () => {
    const [tabBoard, setTabDevBoard] = useState(0);

    useEffect(() => {
        document.body.scrollTo(0, 0);
        intervalID = setInterval(timer, 5000);
    }, []);


    var timer = () => {
        n++;
        if (n >= 3) n = 0;
        setTabDevBoard(n);
    }

    var click = (index) => {
        clearInterval(intervalID);
        intervalID = setInterval(timer, 5000);
        n = index;
    }

    const mytab = ["ALL", "程式", "美術", "企劃"];
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const [tabDev, setTabDev] = useState(0);
    const [page, setpage] = useState(1);
    const Devs = [];
    const Devtop = [];
    const Devs_page = [];
    var nowpage = "";
    var scrollnum = 800;
    if (document.body.clientWidth <= 834) scrollnum = 600;
    else scrollnum = 800;
    useEffect(() => {
        console.log("成功加載")
        PAGE_NEXT = document.getElementById("page_next");
    }, []);

    const Dev = [{ contents: [], top: [] }, { contents: [], top: [] }, { contents: [], top: [] }, { contents: [], top: [] }];
    APIs.forEach((dev) => {
        for (let i = 0; i < mytab.length; i++) {
            if (dev.category === mytab[i] && dev.ispublish === true)
                if (dev.ispin === false) Dev[i].contents.push(dev);
                else Dev[i].top.push(dev);
        }

    }
    )
    APIs.forEach((dev) => {
        if (dev.ispublish === true)
            if (dev.ispin === false) Dev[0].contents.push(dev);
            else Dev[0].top.push(dev);
    }
    )
    for (let i = 0; i < Dev.length; i++) {
        for (let a = 0; a < Dev[i].contents.length; a++) {
            var len = 40;
            var mytext = Dev[i].contents[a].content;
            if (mytext.length > len) {
                var text = mytext.substring(0, len - 1) + "...";
                Dev[i].contents[a].content = text;
            }
        }
    }

    if (tabDev === 0) {
        //Top
        Devtop.push(Dev[tabDev].top[0]);
        //content
        for (let indexs = 0; indexs < Dev.length; indexs++) {
            Dev[indexs].contents.map(
                (devs) => Devs.push(devs)
            )
        }
        pagination(Dev[0].contents, page);
    } else {
        Dev[tabDev].top.map(
            (devs) => Devtop.push(devs)
        )
        Dev[tabDev].contents.map(
            (devs) => Devs.push(devs)
        )
        pagination(Dev[tabDev].contents, page);
    }

    function pagination(jsonData, nowPage) {
        // 資料長度
        const dataTotal = jsonData.length;
        // 數量
        const perpage = 4;
        // page 按鈕總數量公式 總資料數量 / 每一頁要顯示的資料
        const pageTotal = Math.ceil(dataTotal / perpage);
        // 當前頁數，對應現在當前頁數
        let currentPage = nowPage;
        if (PAGE_NEXT != null) {
            if (currentPage === pageTotal) {
                PAGE_NEXT.classList.remove("showbox");
            }
            else if (currentPage > pageTotal) {
                setpage(currentPage - 1);
                currentPage = pageTotal;
            }
            else if (currentPage < pageTotal) {
                PAGE_NEXT.classList.add("showbox");
            }
        }
        //顯示數量
        var minData = (currentPage * perpage) - perpage;
        var maxData = (currentPage * perpage) - 1;
        if (maxData >= dataTotal) maxData = dataTotal - 1;
        for (let indexs = minData; indexs <= maxData; indexs++) {
            Devs_page.push(Devs[indexs]);
        }
    }
    const next = () => {
        nowpage = page;
        nowpage++;
        setpage(nowpage);
        window.scrollTo(0, document.getElementById("dev").offsetTop + scrollnum);
    }

    const pre = () => {
        nowpage = page;
        nowpage--;
        setpage(nowpage);
        window.scrollTo(0, document.getElementById("dev").offsetTop + scrollnum);
    }

    return (
        <>
            <Nav posi="fixed" />
            <div className="board-container">
                <div className="news">
                    <div className="n_left">
                        <Title Title_top="最新消息" Title_bottom="BREAKING NEWS" ls="9.5" lss="3" />
                        <div className="logo">
                            <div className="text">ACIES</div>
                            <div className="text">TWIN JOURNEY</div>
                            <img src={NEWS_BOTTOM} alt="NEWS_BOTTOM" />
                        </div>
                    </div>
                    <div className="n_right">
                        {news.map((news, index) => (
                            <div key={news.key} className={tabBoard === index ? "carousel_img showbox" : "carousel_img"} style={{ backgroundImage: "url(" + news.im + ")" }}>
                                <div className="mask"></div>
                                <div className="content">
                                    <div className="content_title">{news.title}</div>
                                    <div className="content_text" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                                </div>
                            </div>
                        ))}
                        <div className="dot_block">
                            {news.map((news, index) => (
                                <div key={news.key} className={tabBoard === index ? "carousel_dot choose" : "carousel_dot"}
                                    onClick={() => {
                                        setTabDevBoard(index); click(index);
                                    }}>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dev" id="dev">
                    <Title Title_top="開發日誌" Title_bottom="DEV JOURNAL" ls="13" lss="5" />
                    <div className="dev_tab">
                        {mytab.map((dev, index) => (
                            <li key={index}>
                                <div className={tabDev === index ? "tab_title choose" : "tab_title"} onClick={() => { setTabDev(index) }}>
                                    {dev}
                                </div>
                            </li>
                        ))}
                    </div>
                    {Devtop.map((dev) => (
                        <div key={dev.id} className="top_box">
                            <img src={"/images/" + dev.img} alt={dev.img} />
                            <div className="top_content">
                                <div className="content_title">{dev.title}</div>
                                <div className="content_text">{dev.content}</div>
                                <Link to={`/article/${dev.title}`} className="top_link">READ MORE</Link>
                            </div>
                            <img src={DEV_RIGHT} alt="DEV_RIGHT" />
                        </div>
                    ))}
                    {Dev.map((dev, index) => (
                        <div key={index} className={tabDev === index ? "dev_box showbox" : "dev_box"}>
                            {Devs_page.map(devs => (
                                <Link to={`/article/${devs.title}`} key={devs.id} className="content_box" style={{ background: "url(/images/" + devs.img + ") no-repeat center top", borderRadius: "10px" ,backgroundSize:"contain" }}>
                                    <div className="mask"></div>
                                    <div className="content">
                                        <div className="content_title">{devs.title}</div>
                                        <div className="content_text">{devs.content}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                    <div className="page_btn">
                        <div id="page_prev" className={page > 1 ? "page_prev showbox" : "page_prev"} onClick={pre}>
                            <img src={DEV_PREV} alt="DEV_PREV" />
                            <p>PREV</p>
                        </div>
                        <div id="page_next" className="page_next showbox" onClick={next}>
                            <p>NEXT</p>
                            <img src={DEV_NEXT} alt="DEV_NEXT" />
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
            </div>

            <Footer />
        </>
    );
}

export default Board;

