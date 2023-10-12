import "../style/Team.css";
import { useEffect, useState, useRef } from "react";

import PHOTO_01 from "../assets/images/team_photo_01.png";
import PHOTO_02 from "../assets/images/team_photo_02.png";
import PHOTO_03 from "../assets/images/team_photo_03.png";
import PHOTO_04 from "../assets/images/team_photo_04.png";
import PHOTO_05 from "../assets/images/team_photo_05.png";
import PHOTO_06 from "../assets/images/team_photo_06.svg";

import Nav from "../components/Nav";
import Title from "../components/Title";
import Footer from "../components/Footer";

const Team = () => {
    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Nav posi="fixed" />
            <div className="team-container">
                <div className="group">
                    <Title Title_top="遊戲開發團隊" Title_bottom="GAME DEVELOPER" ls="16" lss="10.5" />
                    <div className="g_member">
                        <div className="photo_img">
                            <img src={PHOTO_01} alt="PHOTO_01" />
                            <p>鄭仴筑</p>
                            <p>程式</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_02} alt="PHOTO_02" />
                            <p>洪欣儀</p>
                            <p>程式、企劃</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_03} alt="PHOTO_03" />
                            <p>林于楨</p>
                            <p>美術、動畫</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_04} alt="PHOTO_04" />
                            <p>王怡文</p>
                            <p>美術、動畫</p>
                        </div>
                    </div>
                </div>
                <div className="group">
                    <Title Title_top="網站開發團隊" Title_bottom="WEB DEVELOPER" ls="18" lss="12" />
                    <div className="g_member">
                        <div className="photo_img">
                            <img src={PHOTO_05} alt="PHOTO_05" />
                            <p>吳孟儒</p>
                            <p>程式</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_02} alt="PHOTO_02" />
                            <p>洪欣儀</p>
                            <p>程式</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_03} alt="PHOTO_03" />
                            <p>林于楨</p>
                            <p>主視覺</p>
                        </div>
                        <div className="photo_img">
                            <img src={PHOTO_06} alt="PHOTO_06" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Team;

