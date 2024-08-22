import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Board.css';

import DATA_INTRO from '../assets/images/data_intro.svg';
import DATA_PLAN from '../assets/images/data_plan.svg';
import DEV_NEXT from '../assets/images/dev_next.svg';
import DEV_PREV from '../assets/images/dev_prev.svg';
import DEV_RIGHT from '../assets/images/dev_right.svg';
import NEWS_BOTTOM from '../assets/images/news_bottom.svg';
import news from '../assets/jsons/news.json';

import Title from '../components/Title';

let autoSlideIntervalId = 0;
let nextTabIndex = 0;
let pageNext;
const Board = () => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    useEffect(() => {
        autoSlideIntervalId = setInterval(autoSlide, 5000);
        return () => clearInterval(autoSlideIntervalId);
    }, [currentTabIndex]);

    const autoSlide = () => {
        nextTabIndex++;
        if (nextTabIndex >= 3) nextTabIndex = 0;
        setCurrentTabIndex(nextTabIndex);
    };

    const handleTabClick = (index) => {
        nextTabIndex = index;
        setCurrentTabIndex(nextTabIndex);
    };

    const mytab = ['ALL', '程式', '美術', '企劃'];
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const [tabDev, setTabDev] = useState(0);
    const [page, setpage] = useState(1);
    const Devs = [];
    const Devtop = [];
    const Devs_page = [];
    var nowpage = '';
    const scrollnum = document.body.clientWidth <= 834 ? 600 : 800;


    useEffect(() => {
        pageNext = document.getElementById('page-next');
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
                var text = mytext.substring(0, len - 1) + '...';
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
        if (pageNext != null) {
            if (currentPage === pageTotal) {
                pageNext.classList.remove('showbox');
            }
            else if (currentPage > pageTotal) {
                setpage(currentPage - 1);
                currentPage = pageTotal;
            }
            else if (currentPage < pageTotal) {
                pageNext.classList.add('showbox');
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
        if (document.body.clientWidth >= 430) {
            window.scrollTo(0, document.getElementById('dev').offsetTop + scrollnum);
        }

    }

    const pre = () => {
        nowpage = page;
        nowpage--;
        setpage(nowpage);
        if (document.body.clientWidth >= 430) {
            window.scrollTo(0, document.getElementById('dev').offsetTop + scrollnum);
        }
    }

    return (
        <>
            <div className="board-container">
                <div className="news">
                    <div className="n-left">
                        <Title mainTitle="最新消息" subTitle="BREAKING NEWS" ls="9.5" lss="3" />
                        <div className="logo">
                            <div className="text">ACIES</div>
                            <div className="text">TWIN JOURNEY</div>
                            <img src={NEWS_BOTTOM} alt="NEWS_BOTTOM" />
                        </div>
                    </div>
                    <div className="n-right">
                        {news.map((news, index) => (
                            <div key={news.key} className={currentTabIndex === index ? "carousel-img showbox" : "carousel-img"} style={{ backgroundImage: "url(" + news.im + ")" }}>
                                <div className="mask"></div>
                                <div className="content">
                                    <div className="content-title">{news.title}</div>
                                    <div className="content-text" dangerouslySetInnerHTML={{ __html: news.content }}></div>
                                </div>
                            </div>
                        ))}
                        <div className="dot-block">
                            {news.map((news, index) => (
                                <div key={news.key} className={currentTabIndex === index ? "carousel-dot choose" : "carousel-dot"}
                                    onClick={() => {
                                        setCurrentTabIndex(index); handleTabClick(index);
                                    }}>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="dev" id="dev">
                    <Title mainTitle="開發日誌" subTitle="DEV JOURNAL" ls="13" lss="5" />
                    <div className="dev-tab">
                        {mytab.map((dev, index) => (
                            <li key={index}>
                                <div className={tabDev === index ? "tab-title choose" : "tab-title"} onClick={() => { setTabDev(index) }}>
                                    {dev}
                                </div>
                            </li>
                        ))}
                    </div>
                    {Devtop.map((dev) => (
                        <div key={dev.id} className="top-box">
                            <img src={"/images/" + dev.img} alt={dev.img} />
                            <div className="top-content">
                                <div className="content-title">{dev.title}</div>
                                <div className="content-text">{dev.content}</div>
                                <Link to={`/article/${dev.title}`} className="top-link">READ MORE</Link>
                            </div>
                            <img src={DEV_RIGHT} alt="DEV_RIGHT" />
                        </div>
                    ))}
                    {Dev.map((dev, index) => (
                        <div key={index} className={tabDev === index ? "dev-box showbox" : "dev-box"}>
                            {Devs_page.map(devs => (
                                <Link to={`/article/${devs.title}`} key={devs.id} className="content-box" style={{ background: "url(/images/" + devs.img + ") no-repeat center top", borderRadius: "10px", backgroundSize: "contain" }}>
                                    <div className="mask"></div>
                                    <div className="content">
                                        <div className="content-title">{devs.title}</div>
                                        <div className="content-text">{devs.content}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                    <div className="page-btn">
                        <div id="page-prev" className={page > 1 ? "page-prev showbox" : "page-prev"} onClick={pre}>
                            <img src={DEV_PREV} alt="DEV_PREV" />
                            <p>PREV</p>
                        </div>
                        <div id="page-next" className="page-next showbox" onClick={next}>
                            <p>NEXT</p>
                            <img src={DEV_NEXT} alt="DEV_NEXT" />
                        </div>
                    </div>
                </div>
                <div className="data">
                    <a href="https://drive.google.com/file/d/1NJdzM0ngJoukLee-YZKTkbeaHHzL1kX-/view" target="_blank" rel="noreferrer" className="data-link">
                        <img src={DATA_PLAN} alt="DATA_PLAN" />
                        <div className="data-ch">企劃書</div>
                        <div className="data-en">PLAN DOC</div>
                    </a>
                    <a href="https://docs.google.com/presentation/d/1Lvh3ahMIZKbyEIfSaK5jPE4o7QqHQVQM/edit#slide=id.p1" target="_blank" rel="noreferrer" className="data-link">
                        <img src={DATA_INTRO} alt="DATA_INTRO" />
                        <div className="data-ch">介紹簡報</div>
                        <div className="data-en">INTRO DECK</div>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Board;

