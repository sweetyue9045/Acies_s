import "../style/Article.css";
import { useEffect, useState, useRef } from "react";


import Nav from "../components/Nav";
import Footer from "../components/Footer";


const Article = () => {
    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, []);


    return (
        <>
            <Nav posi="fixed" />
            <div className="article-container">

            </div>
            <Footer />
        </>
    );
}


export default Article;

