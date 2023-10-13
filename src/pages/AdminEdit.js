import "../style/Admin.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import IMG_CROSS from "../assets/images/add_cross.svg";

import Nav from "../components/AdminNav";

const Edit = () => {
    const IsLogin = JSON.parse(window.localStorage.getItem("UserInfo"));
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const navigate = useNavigate();

    const { articleID } = useParams()
    const Content = APIs.find(
        (x) => x.id == articleID
    )
    
    const [title, settitle] = useState("");
    const [img, setimg] = useState("新增封面圖片")
    const [content, setcontent] = useState("");
    const [category, setcategory] = useState("");
    const [loading, setloading] = useState(false)
    var Today = new Date();

    useEffect(() => {
        checkoutHandler();
        editMessages()
    }, [])

    const checkoutHandler = () => {
        if (IsLogin.username == "") {
            navigate("/admin")
        }
    }
    const editMessages = () => {
        document.getElementById("title").value = Content.title
        document.getElementById("content").value = Content.content
        var radionum = document.getElementById("articlelist").category_list
        for (var i = 0; i < radionum.length; i++) {
            if (radionum[i].value === Content.category) {
                radionum[i].checked = true;
            }
        }
        settitle(Content.title);
        setimg(Content.img)
        setcontent(Content.content);
        setcategory(Content.category);
    }

    const handlePutMessage = async (id) => {
        if (title === "") {
            window.scrollTo(0, document.getElementById("title").offsetTop + 200);
            setTimeout(function () {
                alert("請填入標題")
            }, 100);
        }
        else if (img === "新增封面圖片") {
            window.scrollTo(0, document.getElementById("img").offsetTop + 200);
            setTimeout(function () {
                alert("請選擇圖片")
            }, 100);
        }
        else if (content === "") {
            window.scrollTo(0, document.getElementById("content").offsetTop + 200);
            setTimeout(function () {
                alert("請填入內文")
            }, 100);
        }
        else if (category === "") {
            window.scrollTo(0, document.getElementById("form_bottom").offsetTop + 200);
            setTimeout(function () {
                alert("請選擇分類")
            }, 100);
        }
        if (title !== "" && img !== "新增封面圖片" && content !== "" && category !== "") {
            setloading(true)

            APIs.find(
                (x) => {
                    if (x.id == id) {
                        x.category = category
                        x.img = img === Content.img ? img : img.name
                        x.title = title
                        x.content = content
                        x.editer = IsLogin.username
                        x.edit_time = Today.getFullYear() + "." + (Today.getMonth() + 1) + "." + Today.getDate()
                    }
                }
            )
            window.localStorage.setItem("ArticleAPI", JSON.stringify(APIs));
            setTimeout(() => {
                navigate("/admin/list")
            }, 1000);
        }
    };

    return (
        <>
            <Nav />
            <div className="edit-container">
                <div className="title">
                    <div className="title_text">編輯文章</div>
                </div>
                <form id="articlelist">
                    <input id="title" type="text" placeholder="請輸入標題" onChange={(e) => settitle(e.target.value)} maxLength="10" />
                    <input className="input-file" id="input-file" type="file" accept="image/jpeg,image/png,image/gif"
                        onChange={(e) => { setimg(e.target.files[0]); }} />
                    <label id="img" htmlFor="input-file" style={{ width: "fit-content" }}>
                        <span className="imgsvg" style={{
                            WebkitMaskImage: `url(${IMG_CROSS})`,
                            maskImage: `url(${IMG_CROSS})`
                        }}></span>
                        {img == Content.img ?
                            <span className="imgtext" id="imgtext">{img}</span>
                            :
                            <span className="imgtext" id="imgtext">{img.name}</span>
                        }
                    </label>
                    <textarea id="content" placeholder="開始填寫內容" onChange={(e) => setcontent(e.target.value)} />
                    <div className="form_bottom">
                        <div id="category">
                            <input name="category_list" id="category_01" type="radio" value="程式" onChange={(e) => setcategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_01">#程式</label>
                            <input name="category_list" id="category_02" type="radio" value="美術" onChange={(e) => setcategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_02">#美術</label>
                            <input name="category_list" id="category_03" type="radio" value="企劃" onChange={(e) => setcategory(e.target.value)} />
                            <label className="categorytext" htmlFor="category_03">#企劃</label>
                        </div>
                        {loading ?
                            <div className="sub_btn sub_btn_loading"><div className="loader"></div></div>
                            :
                            <div className="sub_btn" onClick={() => { handlePutMessage(Content.id) }}>儲存</div>
                        }
                    </div>
                </form>
            </div >
        </>
    )
}

export default Edit;