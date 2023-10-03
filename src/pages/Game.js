import "../style/Game.css";
import { useEffect, useState, useRef } from "react";


import Nav from "../components/Nav";
import Footer from "../components/Footer";


const Game = () => {
    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Nav posi="fixed" />
            <div className="game-container">

            </div>
            <Footer />
        </>
    );
}


export default Game;

