import { useEffect } from 'react';
import '../style/Game.css';

import ARROW_L from '../assets/images/sister_arrow_l.svg';
import ARROW_R from '../assets/images/sister_arrow_r.svg';
import SISTER_CANCEL from '../assets/images/sister_cancel_btn.svg';
import SISTER_ELDER from '../assets/images/sister_elder.png';
import SISTER_ELDER2 from '../assets/images/sister_elder2.png';
import SISTER_ELDER_TEXT_BG from '../assets/images/sister_elder_text_bg.png';
import SISTER_YOUNGER from '../assets/images/sister_younger.png';
import SISTER_YOUNGER2 from '../assets/images/sister_younger2.png';
import SISTER_YOUNGER_TEXT_BG from '../assets/images/sister_younger_text_bg.png';
import VILLAGE_AFEITE from '../assets/images/village_afeite.svg';
import VILLAGE_AFEITE_BG from '../assets/images/village_afeite_bg.png';
import VILLAGE_MOSSINA from '../assets/images/village_mossina.svg';
import VILLAGE_MOSSINA_BG from '../assets/images/village_mossina_bg.png';
import VILLAGE_SCALE from '../assets/images/village_scale.svg';
import VILLAGE_SCALE_BG from '../assets/images/village_scale_bg.png';
import VILLAGE_TAMA from '../assets/images/village_tama.svg';
import VILLAGE_TAMA_BG from '../assets/images/village_tama_bg.png';

import Title from '../components/Title';

var g_top = [];
const Game = () => {
    const scrolltop = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;
        g_top = [
            document.getElementById('world').offsetTop,
            document.getElementById('village').offsetTop,
            document.getElementById('sister').offsetTop
        ];
        if (offsetY >= 0 && offsetY <= g_top[0] + 10) {
            const [firstChild, secondChild] = document.getElementById('world').children;
            firstChild.classList.add('fadein');
            setTimeout(() => secondChild.classList.add('fadein'), 500);
        }
    }

    const handleScroll = () => {
        const offsetY = document.documentElement.scrollTop + document.body.scrollTop;
        if (document.body.clientWidth <= 834) return;

        const [worldTop, villageTop, sisterTop] = g_top;
        if (offsetY >= sisterTop - 100 && offsetY <= sisterTop + 10) {
            const sisterChildren = document.getElementById('sister').children[1].children;
            setTimeout(() => sisterChildren[0].classList.add('fadein'), 100);
            setTimeout(() => sisterChildren[1].classList.add('fadein'), 600);
        }
        else if (offsetY >= villageTop - 300 && offsetY <= villageTop + 10) {
            const villageHrIds = ['village-hr0', 'village-hr1', 'village-hr2'];
            villageHrIds.forEach((id) => {
                document.getElementById(id).classList.add('fadein');
            });

            const villageIds = ['village-mossina', 'village-scale', 'village-afeite', 'village-tama'];
            villageIds.forEach((id, index) => {
                setTimeout(() => document.getElementById(id).classList.add('fadein'), (index + 1) * 500);
            });
        }
    }

    useEffect(() => {
        if (document.body.clientWidth > 834) {
            scrolltop();
        }
        if (window.matchMedia('(orientation: portrait)').matches) {
            document.getElementById('text-younger').lastChild.classList.add('hidden');
            document.getElementById('text-elder').lastChild.classList.add('hidden');

        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const ANIMATION_DURATION = 400;

    const getElementById = (id) => document.getElementById(id);

    function handleSisterClick(e) {
        const action = e.target.dataset.action; // 'open' 或 'close'
        const spstr = e.target.dataset.sister; // 'elder' 或 'younger'

        const isOpenAction = action === 'open';
        const open = isOpenAction ? spstr : (spstr === 'elder' ? 'younger' : 'elder');
        const close = isOpenAction ? (spstr === 'elder' ? 'younger' : 'elder') : spstr;
        const mySrc = isOpenAction ? (spstr === 'elder' ? SISTER_ELDER2 : SISTER_YOUNGER2) : (spstr === 'elder' ? SISTER_ELDER : SISTER_YOUNGER);

        const targetOpen = getElementById(`sister-${open}`);
        const targetTextBgOpen = getElementById(`text-bg-${open}`);
        const targetTextOpen = getElementById(`text-${open}`);
        const targetClose = getElementById(`sister-${close}`);
        const targetTextBgClose = getElementById(`text-bg-${close}`);
        const targetTextClose = getElementById(`text-${close}`);
        const targetNameClose = getElementById(`name-${close}`);
        const targetNameOpen = getElementById(`name-${open}`);

        if (isOpenAction) {
            handleOpen(targetOpen, targetTextBgOpen, targetTextOpen, targetClose, targetNameClose, mySrc);
        } else {
            handleClose(targetClose, targetTextBgClose, targetTextClose, targetOpen, targetNameOpen, mySrc);
        }
    }

    function handleOpen(targetOpen, targetTextBgOpen, targetTextOpen, targetClose, targetNameClose, mySrc) {
        targetOpen.classList.add('flip');
        targetOpen.classList.remove('click-point');
        targetClose.classList.add(`${targetClose.id.split('-')[1]}-fadeout`);
        targetNameClose.classList.add('sister-name-hidden');

        setTimeout(() => {
            targetOpen.src = mySrc;
            targetOpen.classList.add('flip2');

            targetClose.classList.add('hidden');
            targetTextBgOpen.classList.remove('hidden');
            targetTextBgOpen.classList.add(`${targetClose.id.split('-')[1]}-fadein`);
            targetTextOpen.classList.remove('hidden');
            targetTextOpen.classList.add(`${targetClose.id.split('-')[1]}-fadein`);

            setTimeout(() => resetClasses(targetClose, targetOpen), ANIMATION_DURATION);
        }, ANIMATION_DURATION);
    }

    function handleClose(targetClose, targetTextBgClose, targetTextClose, targetOpen, targetNameOpen, mySrc) {
        targetClose.classList.add('flip-reverse');
        targetTextBgClose.classList.remove(`${targetOpen.id.split('-')[1]}-fadein`);
        targetTextClose.classList.remove(`${targetOpen.id.split('-')[1]}-fadein`);
        targetTextBgClose.classList.add(`${targetOpen.id.split('-')[1]}-fadeout`);
        targetTextClose.classList.add(`${targetOpen.id.split('-')[1]}-fadeout`);

        setTimeout(() => {
            targetClose.src = mySrc;
            targetClose.classList.add('flip2-reverse');

            targetTextBgClose.classList.add('hidden');
            targetTextClose.classList.add('hidden');

            targetNameOpen.classList.remove('sister-name-hidden');
            targetOpen.classList.add(`${targetOpen.id.split('-')[1]}-fadein`);
            targetOpen.classList.remove('hidden');
            targetClose.classList.add('click-point');

            setTimeout(() => resetClasses(targetClose, targetOpen), ANIMATION_DURATION);
        }, ANIMATION_DURATION);
    }

    function resetClasses(targetClose, targetOpen) {
        targetClose.classList.remove('flip', 'flip2', 'flip-reverse', 'flip2-reverse', `${targetClose.id.split('-')[1]}-fadeout`);
        targetOpen.classList.remove(`${targetOpen.id.split('-')[1]}-fadein`);
    }

    return (
        <>
            <div className="game-container">
                <div className="world" id="world">
                    <Title mainTitle="神與信仰的起源" subTitle="WORLDVIEW" ls="39" lss="20" />
                    <div className="content">三個帶有信仰能力的神祕部落居住在大陸的不同地方，根據傳說記載，他們獲得神的祝福，分別是斯克爾都、亞斐特城、塔瑪部落。</div>
                </div>
                <div className="village" id="village">
                    <Title mainTitle="部落與信仰介紹" subTitle="INTRODUCTION" ls="26" lss="13" />
                    <div className="content">
                        <div className="logo" id="village-mossina">
                            <img src={VILLAGE_MOSSINA_BG} className="village-bg" alt="VILLAGE_MOSSINA_BG" />
                            <img src={VILLAGE_MOSSINA} className="village-logo village-mossina" alt="VILLAGE_MOSSINA" />
                            <div className="village-en village-mossina">MOSSINA</div>
                            <div className="village-in village-mossina">
                                被封印在神殿的神，陷入漫長的沉睡中，是所有信仰的起源。
                            </div>
                            <div className="village-ch village-mossina">魔森納</div>
                        </div>
                        <hr className="village-hr" id="village-hr0" />
                        <div className="logo" id="village-scale">
                            <img src={VILLAGE_SCALE_BG} className="village-bg" alt="VILLAGE_SCALE" />
                            <img src={VILLAGE_SCALE} className="village-logo village-scale" alt="VILLAGE_SCALE" />
                            <div className="village-en village-scale">SCALE</div>
                            <div className="village-in village-scale">
                                傳說中受到神龍眷顧的民族，藍白色圓頂神殿為其主要特色。
                            </div>
                            <div className="village-ch village-scale">斯克爾</div>
                        </div>
                        <hr className="village-hr" id="village-hr1" />
                        <div className="logo" id="village-afeite">
                            <img src={VILLAGE_AFEITE_BG} className="village-bg" alt="VILLAGE_AFEITE" />
                            <img src={VILLAGE_AFEITE} className="village-logo village-afeite" alt="VILLAGE_AFEITE" />
                            <div className="village-en village-afeite">AFEITE</div>
                            <div className="village-in village-afeite">
                                居住在丘陵的特殊民族，體型高大魁武。大多為石製建築。
                            </div>
                            <div className="village-ch village-afeite">亞斐特</div>
                        </div>
                        <hr className="village-hr" id="village-hr2" />
                        <div className="logo" id="village-tama">
                            <img src={VILLAGE_TAMA_BG} className="village-bg" alt="VILLAGE_TAMA" />
                            <img src={VILLAGE_TAMA} className="village-logo village-tama" alt="VILLAGE_TAMA" />
                            <div className="village-en village-tama">TAMA</div>
                            <div className="village-in village-tama">
                                藏身叢林的傳統民族，有特殊的靈紋裝飾。建築以草房為主。
                            </div>
                            <div className="village-ch village-tama">塔瑪</div>
                        </div>
                    </div>
                </div>
                <div className="sister" id="sister">
                    <Title mainTitle="姐妹倆的旅程故事" subTitle="JOURNEY STORY" ls="28" lss="15" />
                    <div className="sisters">
                        <div className="sister-card">
                            <div className="sister-title" id="name-younger">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sister-title-text">薇妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sister-img">
                                <img id="sister-younger" className="state click-point" data-action="open" data-sister="younger" onClick={handleSisterClick} src={SISTER_YOUNGER} alt="SISTER_YOUNGER" />
                                <img id="text-bg-elder" className="sister-text-bg hidden" src={SISTER_ELDER_TEXT_BG} alt="SISTER_TEXT_BG" />
                                <div id="text-elder" className="sister-text hidden">
                                    <img id="cancel-elder" className="click-point" data-action="close" data-sister="elder" onClick={handleSisterClick} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的姊姊<br />個性驕傲嚴謹，內心是個溫柔的人。因為總會管教妹妹，兩人之間發生不少爭執。<br /><br />
                                    <p>冒險旅途中會披上祖傳披風，也會增加許多民俗感的小元素。</p>
                                </div>
                            </div>
                        </div>
                        <div className="sister-card">
                            <div className="sister-title" id="name-elder">
                                <img src={ARROW_L} alt="ARROW_L" />
                                <div className="sister-title-text">莉妲</div>
                                <img src={ARROW_R} alt="ARROW_R" />
                            </div>
                            <div className="sister-img">
                                <img id="sister-elder" className="state click-point" data-action="open" data-sister="elder" onClick={handleSisterClick} src={SISTER_ELDER} alt="SISTER_ELDER" />
                                <img id="text-bg-younger" className="sister-text-bg hidden" src={SISTER_YOUNGER_TEXT_BG} alt="SISTER_YOUNGER_TEXT_BG" />
                                <div id="text-younger" className="sister-text hidden">
                                    <img id="cancel-younger" className="click-point" data-action="close" data-sister="younger" onClick={handleSisterClick} src={SISTER_CANCEL} alt="SISTER_CANCEL" />
                                    雙胞胎中的妹妹<br />個性活潑開朗、樂於助人，容易衝動犯錯，內心渴望於他人的認可。<br /><br />
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

