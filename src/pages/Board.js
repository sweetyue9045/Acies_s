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


export default Board;

