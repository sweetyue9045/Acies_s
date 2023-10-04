import "../style/Game.css";
import { useEffect, useState, useRef } from "react";

import BG from "../assets/images/world_bg.png";
import VILLAGE_MOSSINA from "../assets/images/village_mossina.svg"
import VILLAGE_AFEITE from "../assets/images/village_afeite.svg"
import VILLAGE_SCALE from "../assets/images/village_scale.svg"
import VILLAGE_TAMA from "../assets/images/village_tama.svg"
import VILLAGE_MOSSINA_BG from "../assets/images/village_mossina_bg.png"
import VILLAGE_AFEITE_BG from "../assets/images/village_afeite_bg.png"
import VILLAGE_SCALE_BG from "../assets/images/village_scale_bg.png"
import VILLAGE_TAMA_BG from "../assets/images/village_tama_bg.png"
import ARROW_L from "../assets/images/sister_arrow_l.svg";
import ARROW_R from "../assets/images/sister_arrow_r.svg";
import SISTER_L from "../assets/images/sister_L.png";
import SISTER_R from "../assets/images/sister_R.png";
import SISTER_L2 from "../assets/images/sister_L2.png";
import SISTER_R2 from "../assets/images/sister_R2.png";
import SISTER_TEXT_BG from "../assets/images/sister_text_bg.png";
import SISTER_TEXT2_BG from "../assets/images/sister_text2_bg.png";
import SISTER_CANCEL from "../assets/images/sister_cancel_btn.svg";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

var g_top = [];
const Game = () => {
    const phone = document.body.clientWidth > 430 ? "noPhone" : "yesPhone";

    const scrolltop = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;

        g_top = [
            document.getElementById("world").offsetTop,
            document.getElementById("village").offsetTop,
            document.getElementById("sister").offsetTop
        ];
        if (offsetY >= 0 && offsetY <= g_top[0] + 10) {
            document.getElementById("world").children[1].classList.add("fadein");
            setTimeout(function () {
                document.getElementById("world").children[2].classList.add("fadein");
            }, 500);
        }
    }
    // 抓取加動畫位置
    useEffect(() => {
        document.body.scrollTo(0, 0);
        if (document.body.clientWidth > 834) {
            scrolltop();
        }
    }, []);
    const handleScroll = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;

        if (document.body.clientWidth > 834) {
            if (offsetY >= g_top[2] - 100 && offsetY <= g_top[2] + 10) {
                setTimeout(function () {
                    document.getElementById("sister").children[1].children[0].classList.add("fadein");
                }, 100);
                setTimeout(function () {
                    document.getElementById("sister").children[1].children[1].classList.add("fadein");
                }, 600);
            }
            else if (offsetY >= g_top[1] - 300 && offsetY <= g_top[1] + 10) {
                for (let i = 0; i < 3; i++) {
                    document.getElementById("v_hr" + i).classList.add("fadein");
                }
                setTimeout(function () {
                    document.getElementById("v_mossina").classList.add("fadein");
                }, 500);
                setTimeout(function () {
                    document.getElementById("v_scale").classList.add("fadein");
                }, 1000);
                setTimeout(function () {
                    document.getElementById("v_afeite").classList.add("fadein");
                }, 1500);
                setTimeout(function () {
                    document.getElementById("v_tama").classList.add("fadein");
                }, 2000);
            }
        }
    }

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
        return () => {
            document.body.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // 姊妹打開介紹
    var click_open = function (e) {
        var spstr = e.target.id.split("");
        var open, close, my_src = "";

        if (spstr[spstr.length - 1] === "R") { open = "R"; close = "L"; my_src = SISTER_R2; }
        else if (spstr[spstr.length - 1] === "L") { open = "L"; close = "R"; my_src = SISTER_L2; }

        var target_open = document.getElementById("sister_" + open);
        var target_close = document.getElementById("sister_" + close);
        var targetpage_close = document.getElementById("page2" + close);
        var targettext_close = document.getElementById("text" + close);
        var targetname_close = document.getElementById("name" + close);

        target_open.classList.add("flip");
        target_open.classList.remove("click_point");
        target_close.classList.add(close + "_fadeout");
        targetname_close.classList.add("displaynone2");

        var animEnd = function () {
            target_open.src = my_src;
            target_open.classList.add("flip2");

            target_close.classList.add("displaynone");

            targetpage_close.classList.remove("displaynone");
            targetpage_close.classList.add(close + "_fadein");

            targettext_close.classList.remove("displaynone");
            targettext_close.classList.add(close + "_fadein");
            setTimeout(reset, 400)
        }
        setTimeout(animEnd, 400);

        var reset = function () {
            target_close.classList.remove(close + "_fadeout");
            target_close.classList.remove(close + "_fadein");
        }
    }

    // 姊妹關閉介紹
    var click_close = function (e) {
        var spstr = e.target.id.split("");
        var open, close, my_src = "";

        if (spstr[spstr.length - 1] === "R") { open = "L"; close = "R"; my_src = SISTER_L; }
        else if (spstr[spstr.length - 1] === "L") { open = "R"; close = "L"; my_src = SISTER_R; }

        var target_open = document.getElementById("sister_" + open);
        var target_close = document.getElementById("sister_" + close);
        var targetpage_close = document.getElementById("page2" + close);
        var targettext_close = document.getElementById("text" + close);
        var targetname_close = document.getElementById("name" + close);

        target_open.classList.add("flip-reverse");

        targetpage_close.classList.remove(close + "_fadein");
        targettext_close.classList.remove(close + "_fadein");

        targetpage_close.classList.add(close + "_fadeout");
        targettext_close.classList.add(close + "_fadeout");

        var animEnd = function () {
            target_open.src = my_src;
            target_open.classList.add("flip2-reverse");

            targetpage_close.classList.add("displaynone");
            targettext_close.classList.add("displaynone");

            targetname_close.classList.remove("displaynone2");
            target_close.classList.add(close + "_fadein");
            target_close.classList.remove("displaynone");
            target_open.classList.add("click_point");
            setTimeout(reset, 400);
        }
        setTimeout(animEnd, 400);

        var reset = function () {
            target_open.classList.remove("flip");
            target_open.classList.remove("flip2");
            target_open.classList.remove("flip-reverse");
            target_open.classList.remove("flip2-reverse");
            target_open.classList.remove(close + "_fadeout");
            target_close.classList.remove(close + "_fadein");
        }
    }
    return (
        <>
            <Nav posi="fixed" />
            <div className="game-container">
                <div className="world" id="world">
                    <img src={BG} alt="ARROW_L" />
                    <Title Title_top="神與信仰的起源" Title_bottom="WORLDVIEW" ls="39" lss="20" />
                    <div className="content">三個帶有信仰能力的神祕部落居住在大陸的不同地方，根據傳說記載，他們獲得神的祝福，分別是斯克爾都、亞斐特城、塔瑪部落。</div>
                </div>
                <div className="village" id="village">
                    <Title Title_top="部落與信仰介紹" Title_bottom="INTRODUCTION" ls="26" lss="13" />
                    <div className="content">
                        <div className="logo" id="v_mossina">
                            <img src={VILLAGE_MOSSINA_BG} className="v_bg" alt="VILLAGE_MOSSINA_BG" />
                            <img src={VILLAGE_MOSSINA} className="v_logo v_mossina" alt="VILLAGE_MOSSINA" />
                            <div className="v_en v_mossina">MOSSINA</div>
                            <div className="v_in v_mossina">
                                被封印在神殿的神，陷入漫長的沉睡中，是所有信仰的起源。
                            </div>
                            <div className="v_ch v_mossina">魔森納</div>
                        </div>
                        <hr className="hr_column" id="v_hr0" />
                        <div className="logo" id="v_scale">
                            <img src={VILLAGE_SCALE_BG} className="v_bg" alt="VILLAGE_SCALE" />
                            <img src={VILLAGE_SCALE} className="v_logo v_scale" alt="VILLAGE_SCALE" />
                            <div className="v_en v_scale">SCALE</div>
                            <div className="v_in v_scale">
                                傳說中受到神龍眷顧的民族，藍白色圓頂神殿為其主要特色。
                            </div>
                            <div className="v_ch VILLAGE_SCALE">斯克爾</div>
                        </div>
                        <hr className="hr_column" id="v_hr1" />
                        <div className="logo" id="v_afeite">
                            <img src={VILLAGE_AFEITE_BG} className="v_bg" alt="VILLAGE_AFEITE" />
                            <img src={VILLAGE_AFEITE} className="v_logo v_afeite" alt="VILLAGE_AFEITE" />
                            <div className="v_en v_afeite">AFEITE</div>
                            <div className="v_in v_afeite">
                                居住在丘陵的特殊民族，體型高大魁武。大多為石製建築。
                            </div>
                            <div className="v_ch v_afeite">亞斐特</div>
                        </div>
                        <hr className="hr_column" id="v_hr2" />
                        <div className="logo" id="v_tama">
                            <img src={VILLAGE_TAMA_BG} className="v_bg" alt="VILLAGE_TAMA" />
                            <img src={VILLAGE_TAMA} className="v_logo v_tama" alt="VILLAGE_TAMA" />
                            <div className="v_en v_tama">TAMA</div>
                            <div className="v_in v_tama">
                                藏身叢林的傳統民族，有特殊的靈紋裝飾。建築以草房為主。
                            </div>
                            <div className="v_ch v_tama">塔瑪</div>
                        </div>
                    </div>
                </div>
                <div className="sister" id="sister">
                    <Title Title_top="姐妹倆的旅程故事" Title_bottom="JOURNEY STORY" ls="28" lss="15" />
                    <div className="sisters">
                        <div className="page">
                            <div className="sis_title" id="nameL">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sis_title_text">薇妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sisimg">
                                <img id="sister_L" className="state click_point" onClick={click_open.bind(this)} src={SISTER_L} alt="SISTER_L" />
                                <img id="page2L" className="page2 displaynone" src={SISTER_TEXT_BG} alt="SISTER_TEXT_BG" />
                                <div id="textL" className="text displaynone">
                                    <img id="cancelL" className="click_point" onClick={click_close.bind(this)} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的姊姊<br />個性驕傲嚴謹，內心是個溫柔的人。因為總會管教妹妹，兩人之間發生不少爭執。<br /><br />
                                    冒險旅途中會披上祖傳披風，也會增加許多民俗感的小元素。
                                </div>
                            </div>
                        </div>
                        <div className="page">
                            <div className="sis_title" id="nameR">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sis_title_text">莉妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sisimg" >
                                <img id="sister_R" className="state click_point" onClick={click_open.bind(this)} src={SISTER_R} alt="SISTER_R" />
                                <img id="page2R" className="page2 displaynone" src={SISTER_TEXT2_BG} alt="SISTER_TEXT2_BG" />
                                <div id="textR" className="text displaynone">
                                    <img id="cancelR" className="click_point" onClick={click_close.bind(this)} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的妹妹<br />個性活潑開朗、樂於助人，容易衝動 犯錯，內心渴望於他人的認可。<br /><br />
                                    冒險旅途中會變成靈魂型態，保有原本特色並且跟隨在姊姊身旁。
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

const Title = ({ Title_top, Title_bottom, Id, ls, lss }) => {
    const style = {}
    if (document.body.clientWidth <= 834) {
        style.letterSpacing = `${lss}px`
        style.marginRight = `-${(lss - 2)}px`
    }
    else {
        style.letterSpacing = `${ls}px`
        style.marginRight = `-${(ls - 2)}px`
    }
    return (
        <div className="title" id={Id}>
            <div className="title_top">{Title_top}</div>
            <div className="title_bottom" style={style}>{Title_bottom}</div>
        </div>
    );
}
export default Game;

