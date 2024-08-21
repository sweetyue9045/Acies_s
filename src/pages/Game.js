import { useEffect } from "react";
import "../style/Game.css";

import ARROW_L from "../assets/images/sister_arrow_l.svg";
import ARROW_R from "../assets/images/sister_arrow_r.svg";
import SISTER_CANCEL from "../assets/images/sister_cancel_btn.svg";
import SISTER_ELDER from "../assets/images/sister_elder.png";
import SISTER_ELDER2 from "../assets/images/sister_elder2.png";
import SISTER_ELDER_TEXT_BG from "../assets/images/sister_elder_text_bg.png";
import SISTER_YOUNGER from "../assets/images/sister_younger.png";
import SISTER_YOUNGER2 from "../assets/images/sister_younger2.png";
import SISTER_YOUNGER_TEXT_BG from "../assets/images/sister_younger_text_bg.png";
import VILLAGE_AFEITE from "../assets/images/village_afeite.svg";
import VILLAGE_AFEITE_BG from "../assets/images/village_afeite_bg.png";
import VILLAGE_MOSSINA from "../assets/images/village_mossina.svg";
import VILLAGE_MOSSINA_BG from "../assets/images/village_mossina_bg.png";
import VILLAGE_SCALE from "../assets/images/village_scale.svg";
import VILLAGE_SCALE_BG from "../assets/images/village_scale_bg.png";
import VILLAGE_TAMA from "../assets/images/village_tama.svg";
import VILLAGE_TAMA_BG from "../assets/images/village_tama_bg.png";

import Nav from "../components/Nav";
import Title from "../components/Title";

var g_top = [];
const Game = () => {
    const scrolltop = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;
        g_top = [
            document.getElementById("world").offsetTop,
            document.getElementById("village").offsetTop,
            document.getElementById("sister").offsetTop
        ];
        if (offsetY >= 0 && offsetY <= g_top[0] + 10) {
            document.getElementById("world").children[0].classList.add("fadein");
            setTimeout(function () {
                document.getElementById("world").children[1].classList.add("fadein");
            }, 500);
        }
    }

    // 抓取加動畫位置
    useEffect(() => {
        if (document.body.clientWidth > 834) {
            scrolltop();
        }
        if (window.matchMedia("(orientation: portrait)").matches) {
            document.getElementById('text_Younger').lastChild.classList.add('displaynone');
            document.getElementById('text_Elder').lastChild.classList.add('displaynone');

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
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // 姊妹打開介紹
    var click_open = function (e) {
        var spstr = e.target.id.replace("sister_","");
        var open, close, my_src = "";

        if (spstr === "Elder") { open = "Elder"; close = "Younger"; my_src = SISTER_ELDER2; }
        else if (spstr === "Younger") { open = "Younger"; close = "Elder"; my_src = SISTER_YOUNGER2; }

        var target_open = document.getElementById("sister_" + open);  //點擊的圖翻面
        var targettextbg_open = document.getElementById("text_bg_" + open);  //文字背景移入
        var targettext_open = document.getElementById("text_" + open);  //文字移入
        var target_close = document.getElementById("sister_" + close);  //另一張圖移出
        var targetname_close = document.getElementById("name_" + close);  //另一張圖的名字移出


        target_open.classList.add("flip");
        target_open.classList.remove("click_point");
        target_close.classList.add(close + "_fadeout");
        targetname_close.classList.add("displaynone2");

        var animEnd = function () {
            target_open.src = my_src;
            target_open.classList.add("flip2");

            target_close.classList.add("displaynone");

            targettextbg_open.classList.remove("displaynone");
            targettextbg_open.classList.add(close + "_fadein");

            targettext_open.classList.remove("displaynone");
            targettext_open.classList.add(close + "_fadein");
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
        var spstr = e.target.id.replace("cancel_","");
        var open, close, my_src = "";

        if (spstr === "Elder") { open = "Younger"; close = "Elder"; my_src = SISTER_ELDER; }
        else if (spstr === "Younger") { open = "Elder"; close = "Younger"; my_src = SISTER_YOUNGER; }

        var target_close = document.getElementById("sister_" + close);  //被點擊的圖翻回去
        var targettextbg_close = document.getElementById("text_bg_" + close);  //背景移出
        var targettext_close = document.getElementById("text_" + close);  //文字移出
        var target_open = document.getElementById("sister_" + open);  //另一張圖挪回
        var targetname_open = document.getElementById("name_" + open);  //另一張圖名字挪回


        target_close.classList.add("flip-reverse");

        targettextbg_close.classList.remove(open + "_fadein");
        targettext_close.classList.remove(open + "_fadein");
        targettextbg_close.classList.add(open + "_fadeout");
        targettext_close.classList.add(open + "_fadeout");

        var animEnd = function () {
            target_close.src = my_src;
            target_close.classList.add("flip2-reverse");

            targettextbg_close.classList.add("displaynone");
            targettext_close.classList.add("displaynone");

            targetname_open.classList.remove("displaynone2");
            target_open.classList.add(open + "_fadein");
            target_open.classList.remove("displaynone");
            target_close.classList.add("click_point");
            setTimeout(reset, 400);
        }
        setTimeout(animEnd, 400);

        var reset = function () {
            target_close.classList.remove("flip");
            target_close.classList.remove("flip2");
            target_close.classList.remove("flip-reverse");
            target_close.classList.remove("flip2-reverse");
            target_close.classList.remove(open + "_fadeout");
            target_open.classList.remove(open + "_fadein");
        }
    }
    return (
        <>
            <Nav/>
            <div className="game-container">
                <div className="world" id="world">
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
                        <div className="siscard">
                            <div className="sis_title" id="name_Younger">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sis_title_text">薇妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sisimg">
                                <img id="sister_Younger" className="state click_point" onClick={click_open.bind(this)} src={SISTER_YOUNGER} alt="SISTER_YOUNGER" />
                                <img id="text_bg_Elder" className="text_bg displaynone" src={SISTER_ELDER_TEXT_BG} alt="SISTER_TEXT_BG" />
                                <div id="text_Elder" className="text displaynone">
                                    <img id="cancel_Elder" className="click_point" onClick={click_close.bind(this)} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的姊姊<br />個性驕傲嚴謹，內心是個溫柔的人。因為總會管教妹妹，兩人之間發生不少爭執。<br /><br />
                                    <p>冒險旅途中會披上祖傳披風，也會增加許多民俗感的小元素。</p>
                                </div>
                            </div>
                        </div>
                        <div className="siscard">
                            <div className="sis_title" id="name_Elder">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sis_title_text">莉妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sisimg" >
                                <img id="sister_Elder" className="state click_point" onClick={click_open.bind(this)} src={SISTER_ELDER} alt="SISTER_ELDER" />
                                <img id="text_bg_Younger" className="text_bg displaynone" src={SISTER_YOUNGER_TEXT_BG} alt="SISTER_YOUNGER_TEXT_BG" />
                                <div id="text_Younger" className="text displaynone">
                                    <img id="cancel_Younger" className="click_point" onClick={click_close.bind(this)} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的妹妹<br />個性活潑開朗、樂於助人，容易衝動 犯錯，內心渴望於他人的認可。<br /><br />
                                    <p>冒險旅途中會變成靈魂型態，保有原本特色並且跟隨在姊姊身旁。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Game;

