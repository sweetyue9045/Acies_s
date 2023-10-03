import "../style/Team.css";
import { useEffect, useState, useRef } from "react";


import Nav from "../components/Nav";
import Footer from "../components/Footer";


const Team = () => {
    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Nav posi="fixed" />
            <div className="team-container">

            </div>
            <Footer />
        </>
    );
}


export default Team;

