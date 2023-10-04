import "../style/Board.css";
import { useEffect, useState, useRef } from "react";


import Nav from "../components/Nav";
import Footer from "../components/Footer";


const Board = () => {
    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Nav posi="fixed" />
            <div className="board-container">

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

