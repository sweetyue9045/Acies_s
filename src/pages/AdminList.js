import "../style/Admin.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { disableScroll, enableScroll } from '../components/ScrollUtils';


import Nav from "../components/AdminNav";

const List = () => {
    const IsLogin = JSON.parse(window.localStorage.getItem("UserInfo"));
    const APIs = JSON.parse(window.localStorage.getItem("ArticleAPI"));
    const navigate = useNavigate();

    const [confirm_del, setConfirm_del] = useState(false);
    const [confirm_publish, setConfirm_publish] = useState(false);
    const [ID, setID] = useState();
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        checkoutHandler();
    }, [])

    const checkoutHandler = () => {
        if (IsLogin.username == "") {
            navigate("/admin")
        }
    }

    const Confirm_del = (e, open, id) => {
        e.stopPropagation();
        e.preventDefault();
        setConfirm_del(open)
        setID(id)
        disableScroll()
    }
    const Confirm_publish = (e, open, id) => {
        e.stopPropagation();
        e.preventDefault();
        setConfirm_publish(open)
        setID(id)
        disableScroll()
    }
    const confirm_del_yes = async () => {
        setLoading(true)

        const DEL = APIs.find(
            (x) => x.id == ID
        )
        APIs.splice(APIs.indexOf(DEL), 1)

        setTimeout(() => {
            window.localStorage.setItem("ArticleAPI", JSON.stringify(APIs));
            setConfirm_del(false);
            setLoading(false)
            enableScroll()
        }, 1000)
    }
    const confirm_publish_yes = async () => {
        setLoading(true)

        APIs.find(
            (x) => {
                if (x.id == ID) {
                    x.ispublish = true
                }
            }
        )

        setTimeout(() => {
            window.localStorage.setItem("ArticleAPI", JSON.stringify(APIs));
            setConfirm_publish(false);
            setLoading(false)
            enableScroll()
        }, 1000)
    }

    return (
        <>
            <Nav />
            <div className="adminlist-container">
                <Link to="/admin/add" className="add_link">
                    <div className="add_btn">
                        <span className="imgsvg"></span>
                        <span className="imgtext">新增文章</span>
                    </div>
                </Link>
                <div className="article">
                    {APIs.map((data, index) => (
                        <Link to={`/admin/edit/${data.id}`} key={data.id}>
                            <div className="indi_arti">
                                <div className="indi_left">
                                    <div className="indi_title">{data.title}</div>
                                    <div className="indi_category">#{data.category}</div>
                                    <div className="indi_pin" style={{ backgroundColor: data.ispin ? "#000" : "#9E9E9E" }}></div>
                                    <div className="indi_del" onClick={(e) => { Confirm_del(e, true, data.id) }}></div>
                                </div>
                                {data.ispublish ?
                                    <div className="indi_publish" style={{ backgroundColor: "#9E9E9E" }}>已發佈</div>
                                    :
                                    <div className="indi_publish" onClick={(e) => { Confirm_publish(e, true, data.id) }} style={{ backgroundColor: "#000" }}>發佈</div>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="confirm" id="confirm_del" style={confirm_del ? { diplay: "flex" } : { display: "none" }}>
                <div className="confirm_box">
                    <div className="confirm_title">確定刪除嗎</div>
                    <div className="btn_group">
                        <div className="btn btn_no" onClick={() => {
                            setConfirm_del(false);
                            setLoading(false);
                            enableScroll();
                        }}>取消</div>
                        {Loading ?
                            <div className="btn btn_loading"><div className="loader"></div></div>
                            :
                            <div className="btn btn_yes" onClick={() => { confirm_del_yes() }}>確定</div>
                        }

                    </div>
                </div>
            </div>
            <div className="confirm" id="confirm_publish" style={confirm_publish ? { diplay: "flex" } : { display: "none" }}>
                <div className="confirm_box">
                    <div className="confirm_title">確定發佈嗎</div>
                    <div className="btn_group">
                        <div className="btn btn_no" onClick={() => {
                            setConfirm_publish(false);
                            setLoading(false)
                            enableScroll()
                        }}>取消</div>
                        {Loading ?
                            <div className="btn btn_loading"><div className="loader"></div></div>
                            :
                            <div className="btn btn_yes" onClick={() => { confirm_publish_yes() }}>確定</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;
