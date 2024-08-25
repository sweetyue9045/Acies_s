import lottie from 'lottie-web';
import { useEffect, useRef, useState } from 'react';
import '../style/Home.css';

// intro
import INTRO_GIF from '../assets/images/intro_gif.gif';
import INTRO_LOGO from '../assets/images/intro_logo.svg';
import INTRO_LOGO_BG from '../assets/images/intro_logo_bg.png';
import INTRO_PARALLAX from '../assets/images/intro_parallax.png';
import arrowData from '../assets/lotties/arrow.json';
// feature
import FEATURE_LOGO from '../assets/images/feature_logo.svg';
// story
import STORY_STAFF from '../assets/images/story_staff.png';
// tobii
import TOBII_EYE from '../assets/images/tobii_eye.svg';
// magic
import MAGIC_VIDEO1 from '../assets/images/magic_X_btn_video.mp4';
import MAGIC_VIDEO2 from '../assets/images/magic_Y_btn_video.mp4';
import MAGIC_IMG from '../assets/images/magic_img.png';
// ordeal
import ORDEAL_IMG_BACK from '../assets/images/ordeal_img_back.png';
import ORDEAL_IMG_FRONT from '../assets/images/ordeal_img_front.png';
import ORDEAL_VIDEO from '../assets/images/ordeal_video.mp4';
// crisis
import CRISIS_IMG from '../assets/images/crisis_img.png';
import CRISIS_VIDEO from '../assets/images/crisis_video.mp4';
// sale
import SALE_PS4 from '../assets/images/sale_PS4.svg';
import SALE_BOTTOM from '../assets/images/sale_bottom.png';
import SALE_STEAM from '../assets/images/sale_steam.svg';
import SALE_SWITCH from '../assets/images/sale_switch.svg';
// other
import VIDEO_NEXT from '../assets/images/video_next.svg';
import VIDEO_PREV from '../assets/images/video_prev.svg';



const Home = () => {
    const phone = document.body.clientWidth > 430 ? 'noPhone' : 'yesPhone';
    const [gifPosition, setGifPosition] = useState('')
    const [arrowPosition, setArrowPosition] = useState('')
    const [arrowVisibility, setArrowVisibility] = useState('')
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [currentVideoSkill, setCurrentVideoSkill] = useState('凝聚之光');

    //Lottie
    const animationContainer = useRef(null);
    useEffect(() => {
        // 在組件載入時初始化Lottie動畫
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            animationData: arrowData,
            loop: true,
            autoplay: true
        });

        return () => {
            // 在組件卸載時停止Lottie動畫
            anim.destroy();
        };
    }, []);

    let sectionOffsets = useRef({});

    const addFadeIn = (selector, delay) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('fadein');
            }, delay + index * 500);
        });
    };

    useEffect(() => {
        const isComputerView = document.body.clientWidth > 834;

        if (isComputerView) {
            sectionOffsets.current = {
                '.feature-section': document.getElementById('feature-section').offsetTop + 105,
                '.story-section': document.getElementById('story-section').offsetTop + 105,
                '.tobii-section': document.getElementById('tobii-section').offsetTop + 105,
                '.magic-section': document.getElementById('magic-section').offsetTop + 105,
                '.ordeal-section': document.getElementById('ordeal-section').offsetTop + 105,
                '.crisis-section': document.getElementById('crisis-section').offsetTop + 105,
                '.awards-section': document.getElementById('awards-section').offsetTop + 105,
                '.sale-section': document.getElementById('sale-section').offsetTop + 105,
            };
        }

        document.getElementById('story-img-pad').hidden = isComputerView;
        document.getElementById('story-img-computer').hidden = !isComputerView;

        const handleScroll = () => {
            const scrollY = document.documentElement.scrollTop + document.body.scrollTop;

            //intro
            setGifPosition(document.body.clientWidth <= 834 ? 0 : scrollY * 0.3 + 'px');
            setArrowPosition(document.body.clientWidth <= 834 ? '40vw' : 'calc(40vw + ' + scrollY * 1.5 + 'px)')
            setArrowVisibility(scrollY > 600 ? 'none' : 'flex')

            //視差滾動

            if (document.body.clientWidth <= 834) return;

            Object.keys(sectionOffsets.current).forEach(selector => {
                const offset = sectionOffsets.current[selector];
                if (scrollY >= offset - 200 && scrollY <= offset + 50) {
                    addFadeIn(`${selector} .fadein-element`, 100);
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div className="home-container">
                <div className="intro-section">
                    <img src={INTRO_GIF} className="intro-gif" alt="INTRO_GIF"
                        style={{ top: gifPosition }}
                    />
                    <div className="intro-arrow" style={{ top: arrowPosition, display: arrowVisibility }}>
                        <div ref={animationContainer} style={{ width: "13vw" }}></div>
                    </div>
                    <div className="intro-overlay">
                        <div className="intro-logo" >
                            <img src={INTRO_LOGO_BG} alt="INTRO_LOGO_BG" />
                            <img src={INTRO_LOGO} alt="INTRO_LOGO" />
                        </div>
                        <img src={INTRO_PARALLAX} className="intro-parallax" alt="INTRO_PARALLAX" />
                    </div>
                </div>
                <div className="feature-section" id="feature-section">
                    <img src={FEATURE_LOGO} className="fadein-element" alt="FEATURE_LOGO" />
                    <div className="feature-description fadein-element">眼動儀與手把結合</div>
                    <div className="feature-description fadein-element">2D橫向卷軸動作解謎遊戲</div>
                    <div className="feature-description fadein-element">
                        突如其然的一場意外造成妹妹薇妲失去身體，為了尋回妹妹的身體，玩家將扮演一對雙胞胎姊妹，前往三個神秘部落，展開一場冒險旅程。
                    </div>
                </div>
                <div className="story-section" id="story-section">
                    <div className="story-content">
                        <div className="story-text">
                            <Title Title="隨著法鈴封印解除" />
                            <Title Title="古老的魔法再次出現" />
                            <img src={STORY_STAFF} className="story-img-pad" alt="STORY_STAFF" id="story-img-pad" />
                            <div className="story-description fadein-element">
                                在家中意外獲得的法鈴，與變成靈體的妹妹突然能使用古老的魔法！使用<p>眼動儀</p>來驅動的法鈴，利用自身的專注力，探索部落與解決難題的旅程就此展開！
                            </div>
                        </div>
                        <img src={STORY_STAFF} alt="STORY_STAFF" className="fadein-element" id="story-img-computer" />
                    </div>
                </div>
                <div className="tobii-section" id="tobii-section">
                    <div className="tobii-description fadein-element">
                        遊戲開始前，需要完成眼動儀的校正
                    </div>
                    <div className="tobii-description fadein-element">
                        利用Tobii眼動儀，一起探索部落的秘密
                    </div>
                    <img src={TOBII_EYE} className="fadein-element" alt="STORY_STAFF" />
                    <div className="tobii-link fadein-element">
                        <a href="https://gaming.tobii.com/zh/home/" target="_blank" rel="noreferrer">Tobii 官網</a>
                    </div>
                </div>
                <div className="magic-section" id="magic-section">
                    <div className="magic-content">
                        <div className="introduce">
                            <Title Title="姐妹一起，透過專注力" />
                            <Title Title="來施展魔法" />
                            <div className="video-block">
                                <video controls style={{ width: `100%`, display: currentVideoIndex ? "none" : "block" }}>
                                    <source src={MAGIC_VIDEO1} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                                <video controls style={{ width: `100%`, display: currentVideoIndex ? "block" : "none" }}>
                                    <source src={MAGIC_VIDEO2} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>

                            <div className="video-controls">
                                <div className="video-control-left">
                                    <div className="video-number">0{currentVideoIndex + 1}</div>
                                    <div className="video-text">{currentVideoSkill}</div>
                                </div>
                                <div className="video-control-right">
                                    <div className="video-prev" onClick={() => { setCurrentVideoIndex(0); setCurrentVideoSkill("凝聚之光"); }} style={{ cursor: currentVideoIndex ? "pointer" : "" }}>
                                        <img src={VIDEO_PREV} alt="VIDEO_PREV" style={{ filter: currentVideoIndex ? "" : "drop-shadow(rgba(255, 255, 255, 0.35) 0 100px)", animation: currentVideoIndex ? "clickme 2s linear infinite" : "" }} />
                                    </div>
                                    <div className="video-next" onClick={() => { setCurrentVideoIndex(1); setCurrentVideoSkill("物體移動"); }} style={{ cursor: currentVideoIndex ? "" : "pointer" }}>
                                        <img src={VIDEO_NEXT} alt="VIDEO_NEXT" style={{ filter: currentVideoIndex ? "drop-shadow(rgba(255, 255, 255, 0.35) 0 100px)" : "", animation: currentVideoIndex ? "" : "clickme 2s linear infinite" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <img src={MAGIC_IMG} className="magic-img fadein-element" alt="MAGIC_IMG" style={{ display: phone === "yesPhone" ? "none" : "block" }} />
                    </div>
                </div>
                <div className="ordeal-section" id="ordeal-section">
                    <div className="ordeal-content">
                        <div className="ordeal-img fadein-element" style={{ display: phone === "yesPhone" ? "none" : "block" }}>
                            <img src={ORDEAL_IMG_FRONT} alt="ORDEAL_IMG_FRONT" />
                            <img src={ORDEAL_IMG_BACK} alt="ORDEAL_IMG_BACK" />
                        </div>
                        <div className="introduce">
                            <Title Title="部落的考驗來提升專注力" />
                            <div className="introduce-content fadein-element">旅途中有許多能夠輔助專注力的解謎，透過解謎讓姊妹更強大吧！</div>
                            <div className="video-block">
                                <video controls style={{ width: `100%` }}>
                                    <source src={ORDEAL_VIDEO} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="crisis-section" id="crisis-section">
                    <div className="crisis-content">
                        <div className="introduce">
                            <Title Title="利用專注力解決危機吧！" />
                            <div className="introduce-content fadein-element">遇上各式各樣的神奇生物時，冷靜下來觀察周遭，利用技能解決難題吧！</div>
                            <div className="video-block">
                                <video controls style={{ width: `100%` }}>
                                    <source src={CRISIS_VIDEO} type="video/mp4" />
                                    您的瀏覽器不支援此 HTML5 影片標籤
                                </video>
                            </div>
                        </div>
                        <img src={CRISIS_IMG} className="crisis-img fadein-element" alt="ORDEAL_IMG_FRONT" style={{ display: phone === "yesPhone" ? "none" : "block" }} />
                    </div>
                </div>
                <div className="awards-section" id="awards-section">
                    <div className="awards-content">
                        <div className="award fadein-element">
                            <p>2021金點新秀</p>
                            <p>數位互動設計類組</p>
                            <p>入圍</p>
                        </div>
                        <div className="award fadein-element">
                            <p>2021</p>
                            <p>李國鼎 KT 科藝獎</p>
                            <p>特別獎</p>
                        </div>
                    </div>
                </div>
                <div className="sale-section" id="sale-section">
                    <img src={SALE_BOTTOM} className="sale-bottom" alt="SALE_BOTTOM" />
                    <div className="sale-content">
                        <div className="sale-year fadein-element">2021</div>
                        <div className="sale-date fadein-element">11.12</div>
                        <div className="sale-release fadein-element">
                            <div className="sale-release-chinese">正式發售</div>
                            <div className="sale-release-english">RELEASE</div>
                        </div>
                        <div className="sale-platforms fadein-element">
                            <img src={SALE_STEAM} alt="SALE_STEAM" />
                            <img src={SALE_SWITCH} alt="SALE_SWITCH" />
                            <img src={SALE_PS4} alt="SALE_PS4" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const Title = ({ Title, Id }) => {
    return (
        <div className="title fadein-element" id={Id}>
            <div className="title_text">{Title}</div>
        </div>
    );
}

export default Home;

