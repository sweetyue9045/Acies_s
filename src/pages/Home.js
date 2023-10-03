import "../style/Home.css";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";

import GIF from "../assets/images/start_gif.gif";
import PARALLAX from "../assets/images/start_parallax.png";
import LOGO from "../assets/images/start_logo.svg";
import LOGO_BG from "../assets/images/start_logo_bg.png";
import arrow from "../assets/lotties/arrow.json";
import FEATURE_LOGO from "../assets/images/feature_logo.svg";
import STORY_STAFF from "../assets/images/story_staff.png";
import TOBII_EYE from "../assets/images/tobii_eye.svg";
import MAGIC_SIS from "../assets/images/magic_sis.png";
import MAGIC_X from "../assets/images/magic_X_btn.mp4";
import MAGIC_Y from "../assets/images/magic_Y_btn.mp4";
import MAGIC_PREV from "../assets/images/magic_prev.svg";
import MAGIC_NEXT from "../assets/images/magic_next.svg";
import ORDEAL_STONE_L from "../assets/images/ordeal_stone_l.png";
import ORDEAL_STONE_R from "../assets/images/ordeal_stone_r.png";
import ORDEAL_GAME from "../assets/images/ordeal_game.mp4";
import CRISIS_BEAR from "../assets/images/crisis_bear.png";
import CRISIS_BOSS from "../assets/images/crisis_BOSS.mp4";
import SALE_STEAM from "../assets/images/sale_steam.svg";
import SALE_SWITCH from "../assets/images/sale_switch.svg";
import SALE_PS4 from "../assets/images/sale_PS4.svg";
import SALE_BOTTOM from "../assets/images/sale_bottom.png";

import Nav from "../components/Nav";
import Footer from "../components/Footer";


var h_top = [];
const Home = () => {
    const [gifstyleTop, setGifstyleTop] = useState("")
    const [arrowstyleTop, setAarrowstyleTop] = useState("80vh")
    const [arrowstyleDisplay, setArrowstyleDisplay] = useState("")
    const [num, setnum] = useState(0);
    const [skill, setskill] = useState("凝聚之光");
    const scrolltop = () => {
        h_top = [
            document.getElementById("feature").offsetTop + 1305,
            document.getElementById("story").offsetTop + 1305,
            document.getElementById("tobii").offsetTop + 1305,
            document.getElementById("magic").offsetTop + 1305,
            document.getElementById("ordeal").offsetTop + 1305,
            document.getElementById("crisis").offsetTop + 1305,
            document.getElementById("awards").offsetTop + 1305,
            document.getElementById("sale").offsetTop + 1305,
        ];
    }
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: arrow,

        renderSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    // 抓取加動畫位置
    useEffect(() => {
        document.body.scrollTo(0, 0);
        if (document.body.clientWidth > 834) {
            scrolltop();
        }
    }, []);
    // 加動畫
    const handleScroll = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;

        //enter
        setGifstyleTop(document.body.clientWidth <= 834 ? 0 : offsetY * 0.3 + "px");
        setAarrowstyleTop(document.body.clientWidth <= 834 ? "80vh" : "calc(80vh + " + offsetY * 1.5 + "px)")
        setArrowstyleDisplay(offsetY > 600 ? "none" : "block")



        if (document.body.clientWidth > 834) {
            if (offsetY >= h_top[7] - 300 && offsetY <= h_top[7] + 10) {
                for (let i = 0; i < 4; i++) {
                    setTimeout(function () {
                        document.getElementById("sale").children[1].children[i].classList.add("fadein");
                    }, 100 + i * 500);
                }
            }
            else if (offsetY >= h_top[6] - 300 && offsetY <= h_top[6] + 10) {
                for (let i = 0; i < 2; i++) {
                    setTimeout(function () {
                        document.getElementById("awards").children[0].children[i].classList.add("fadein");
                    }, 100 + i * 500);
                }
            }
            else if (offsetY >= h_top[5] - 300 && offsetY <= h_top[5] + 10) {
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        document.getElementById("crisis").children[0].children[0].children[i].classList.add("fadein");
                    }
                }, 100);
                setTimeout(function () {
                    document.getElementById("crisis").children[0].children[1].classList.add("fadein");
                }, 600);
            }
            else if (offsetY >= h_top[4] - 300 && offsetY <= h_top[4] + 10) {
                setTimeout(function () {
                    document.getElementById("ordeal").children[0].children[0].classList.add("fadein");
                }, 100);
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        document.getElementById("ordeal").children[0].children[1].children[i].classList.add("fadein");
                    }
                }, 600);
            }
            else if (offsetY >= h_top[3] - 300 && offsetY <= h_top[3] + 10) {
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        document.getElementById("magic").children[0].children[0].children[i].classList.add("fadein");
                    }
                }, 100);
                setTimeout(function () {
                    document.getElementById("magic").children[0].children[1].classList.add("fadein");
                }, 600);
            }
            else if (offsetY >= h_top[2] - 300 && offsetY <= h_top[2] + 10) {
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        document.getElementById("tobii").children[i].classList.add("fadein");
                    }
                }, 100);
                for (let i = 2; i < 4; i++) {
                    setTimeout(function () {
                        document.getElementById("tobii").children[i].classList.add("fadein");
                    }, 100 + (i - 1) * 500);
                }
            }
            else if (offsetY >= h_top[1] - 300 && offsetY <= h_top[1] + 10) {
                setTimeout(function () {
                    for (let i = 0; i < 2; i++) {
                        document.getElementById("story").children[0].children[0].children[i].classList.add("fadein");
                    }
                }, 100);
                setTimeout(function () {
                    document.getElementById("story").children[0].children[0].children[3].classList.add("fadein");
                }, 500);
                setTimeout(function () {
                    document.getElementById("story").children[0].children[1].classList.add("fadein");
                }, 1100);
            }
            else if (offsetY >= h_top[0] - 300 && offsetY <= h_top[0] + 10) {
                for (let i = 0; i < 4; i++) {
                    setTimeout(function () {
                        document.getElementById("feature").children[i].classList.add("fadein");
                    }, 100 + i * 500);
                }
            }
        }
    }

    useEffect(() => {
        document.body.addEventListener('scroll', handleScroll);
        return () => {
            document.body.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return (
        <>
            <Nav posi="fixed" />
            <div className="home-container">
                <div className="enter" id="enter">
                    <img src={GIF} className="img_gif" alt="GIF"
                        style={{ top: gifstyleTop }}
                    />
                    <div className="home_arrow" style={{ top: arrowstyleTop, display: arrowstyleDisplay }}>
                        <Lottie
                            options={defaultOptions}
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className="enter_top" id="enter">
                        <div className="logo" >
                            <img src={LOGO_BG} alt="LOGO_BG" />
                            <img src={LOGO} alt="LOGO" />
                        </div>
                        <img src={PARALLAX} className="parallax" alt="PARALLAX" />
                    </div>
                </div>
                <div className="feature" id="feature">
                    <img src={FEATURE_LOGO} alt="FEATURE_LOGO" />
                    <div className="content feature_content">眼動儀與手把結合</div>
                    <div className="content feature_content">2D橫向卷軸動作解謎遊戲</div>
                    <div className="content feature_content">
                        突如其然的一場意外造成妹妹薇妲失去身體，為了尋回妹妹的身體，玩家將扮演一對雙胞胎姊妹，前往三個神秘部落，展開一場冒險旅程。
                    </div>
                </div>
                <div className="story" id="story">
                    <div className="content">
                        <div className="text">
                            <Title Title="隨著法鈴封印解除" />
                            <Title Title="古老的魔法再次出現" />
                            <img src={STORY_STAFF} alt="STORY_STAFF" className="story_img1" />
                            <div className="t_content">
                                在家中意外獲得的法鈴，與變成靈體的妹妹突然能使用古老的魔法！使用<p>眼動儀</p>來驅動的法鈴，利用自身的專注力，探索部落與解決難題的旅程就此展開！
                            </div>
                        </div>
                        <img src={STORY_STAFF} alt="STORY_STAFF" className="story_img2" />
                    </div>
                </div>
                <div className="tobii" id="tobii">
                    <div className="content">
                        遊戲開始前，需要完成眼動儀的校正
                    </div>
                    <div className="content">
                        利用Tobii眼動儀，一起探索部落的秘密
                    </div>
                    <img src={TOBII_EYE} alt="STORY_STAFF" />
                    <div className="tobii_link">
                        <a href="https://gaming.tobii.com/zh/home/" target="_blank" rel="noreferrer">Tobii 官網</a>
                    </div>
                </div>
                <div className="magic" id="magic">
                    <div className="content">
                        <div className="introduce">
                            <Title Title="姐妹一起，透過專注力" />
                            <Title Title="來施展魔法" />
                            <div className="block">
                                <video controls style={{ width: `100%`, display: num ? "none" : "block" }}>
                                    <source src={MAGIC_X} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                                <video controls style={{ width: `100%`, display: num ? "block" : "none" }}>
                                    <source src={MAGIC_Y} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>

                            <div className="block_title">
                                <div className="left">
                                    <div className="num">0{num + 1}</div>
                                    <div className="text">{skill}</div>
                                </div>
                                <div className="right">
                                    <div className="r_prev" onClick={() => { setnum(0); setskill("凝聚之光"); }} style={{ cursor: num ? "pointer" : "" }}>
                                        <img src={MAGIC_PREV} alt="MAGIC_PREV" style={{ filter: num ? "" : "drop-shadow(rgba(255, 255, 255, 0.35) 0 100px)", animation: num ? "clickme 2s linear infinite" : "" }} />
                                    </div>
                                    <div className="r_next" onClick={() => { setnum(1); setskill("物體移動"); }} style={{ cursor: num ? "" : "pointer" }}>
                                        <img src={MAGIC_NEXT} alt="MAGIC_NEXT" style={{ filter: num ? "drop-shadow(rgba(255, 255, 255, 0.35) 0 100px)" : "", animation: num ? "" : "clickme 2s linear infinite" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={MAGIC_SIS} alt="MAGIC_SIS" className="magic_sis" />
                    </div>
                </div>
                <div className="ordeal" id="ordeal">
                    <div className="content">
                        <div className="left_img">
                            <img src={ORDEAL_STONE_L} alt="ORDEAL_STONE_L" />
                            <img src={ORDEAL_STONE_R} alt="ORDEAL_STONE_R" />
                        </div>
                        <div className="introduce">
                            <Title Title="部落的考驗來提升專注力" />
                            <div className="i_content">旅途中有許多能夠輔助專注力的解謎，透過解謎讓姊妹更強大吧！</div>
                            <div className="block">
                                <video controls style={{ width: `100%` }}>
                                    <source src={ORDEAL_GAME} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="crisis" id="crisis">
                    <div className="content">
                        <div className="introduce">
                            <Title Title="利用專注力解決危機吧！" />
                            <div className="i_content">遇上各式各樣的神奇生物時，冷靜下來觀察周遭，利用技能解決難題吧！</div>
                            <div className="block">
                                <video controls style={{ width: `100%` }}>
                                    <source src={CRISIS_BOSS} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>
                        </div>
                        <img src={CRISIS_BEAR} alt="ORDEAL_STONE_L" className="crisis_bear" />
                    </div>
                </div>
                <div className="awards" id="awards">
                    <div className="content">
                        <div className="award">
                            <p>2021金點新秀</p>
                            <p>數位互動設計類組</p>
                            <p>入圍</p>
                        </div>
                        <div className="award">
                            <p>2021</p>
                            <p>李國鼎 KT 科藝獎</p>
                            <p>特別獎</p>
                        </div>
                    </div>
                </div>
                <div className="sale" id="sale">
                    <img src={SALE_BOTTOM} className="s_bottom" alt="SALE_BOTTOM" />
                    <div className="content">
                        <div className="year">2021</div>
                        <div className="date">11.12</div>
                        <div className="saleform">
                            <div className="s_ch">正式發售</div>
                            <div className="s_en">RELEASE</div>
                        </div>
                        <div className="platform">
                            <img src={SALE_STEAM} alt="SALE_STEAM" />
                            <img src={SALE_SWITCH} alt="SALE_SWITCH" />
                            <img src={SALE_PS4} alt="SALE_PS4" />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

const Title = ({ Title, Id }) => {
    return (
        <div className="title" id={Id}>
            <div className="title_text">{Title}</div>
        </div>
    );
}

export default Home;

