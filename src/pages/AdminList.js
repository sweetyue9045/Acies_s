import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { disableScroll, enableScroll } from '../components/ScrollUtils';
import '../style/Admin.css';

const List = () => {
    const isLogin = JSON.parse(window.localStorage.getItem('UserInfo'));
    const APIs = JSON.parse(window.localStorage.getItem('ArticleAPI'));
    const navigate = useNavigate();

    const [showDeleteConfirm, setDeleteConfirm] = useState(false);
    const [showPublishConfirm, setPublishConfirm] = useState(false);
    const [ID, setID] = useState();
    const [Loading, setLoading] = useState(false);

    // 使用 useRef 來獲取對話框的 DOM 元素
    const deleteConfirmRef = useRef(null);
    const publishConfirmRef = useRef(null);

    useEffect(() => {
        const handleCheckout = () => {
            if (!isLogin.userName) {
                navigate('/admin');
            }
        };

        handleCheckout();
    }, [isLogin, navigate]);

    const handleDeleteConfirm = (e, open, id) => {
        e.stopPropagation();
        e.preventDefault();
        setDeleteConfirm(open);
        setID(id);
        disableScroll();
    };

    const handlePublishConfirm = (e, open, id) => {
        e.stopPropagation();
        e.preventDefault();
        setPublishConfirm(open);
        setID(id);
        disableScroll();
    };

    const confirmDelete = async () => {
        setLoading(true);

        const itemToDelete = APIs.find((x) => x.id === ID);
        APIs.splice(APIs.indexOf(itemToDelete), 1);

        setTimeout(() => {
            window.localStorage.setItem('ArticleAPI', JSON.stringify(APIs));
            setDeleteConfirm(false);
            setLoading(false);
            enableScroll();
        }, 1000);
    };

    const confirmPublish = async () => {
        setLoading(true);

        APIs.forEach((x) => {
            if (x.id === ID) {
                x.isPublish = true;
            }
        });

        setTimeout(() => {
            window.localStorage.setItem('ArticleAPI', JSON.stringify(APIs));
            setPublishConfirm(false);
            setLoading(false);
            enableScroll();
        }, 1000);
    };

    return (
        <>
            <div className="adminlist-container">
                <Link to="/admin/add" className="add-link">
                    <div className="add-btn">
                        <span className="imgsvg"></span>
                        <span className="imgtext">新增文章</span>
                    </div>
                </Link>
                <div className="article">
                    {APIs.map((data) => (
                        <Link to={`/admin/edit/${data.id}`} key={data.id}>
                            <div className="indi-arti">
                                <div className="indi-left">
                                    <div className="indi-title">{data.title}</div>
                                    <div className="indi-category">#{data.category}</div>
                                    <div className="indi-pin" style={{ backgroundColor: data.isPin ? "#000" : "#9E9E9E" }}></div>
                                    <div className="indi-del" onClick={(e) => handleDeleteConfirm(e, true, data.id)}></div>
                                </div>
                                {data.isPublish ?
                                    <div className="indi-publish" style={{ backgroundColor: "#9E9E9E" }}>已發佈</div>
                                    :
                                    <div className="indi-publish" onClick={(e) => handlePublishConfirm(e, true, data.id)} style={{ backgroundColor: "#000" }}>發佈</div>
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div
                className="confirm"
                ref={deleteConfirmRef}
                style={{ display: showDeleteConfirm ? 'flex' : 'none' }}
            >
                <div className="confirm-box">
                    <div className="confirm-title">確定刪除嗎</div>
                    <div className="btn-group">
                        <div
                            className="btn btn-no"
                            onClick={() => {
                                setDeleteConfirm(false);
                                setLoading(false);
                                enableScroll();
                            }}
                        >
                            取消
                        </div>
                        {Loading ?
                            <div className="btn btn-loading"><div className="loader"></div></div>
                            :
                            <div className="btn btn-yes" onClick={confirmDelete}>確定</div>
                        }
                    </div>
                </div>
            </div>
            <div
                className="confirm"
                ref={publishConfirmRef}
                style={{ display: showPublishConfirm ? 'flex' : 'none' }}
            >
                <div className="confirm-box">
                    <div className="confirm-title">確定發佈嗎</div>
                    <div className="btn-group">
                        <div
                            className="btn btn-no"
                            onClick={() => {
                                setPublishConfirm(false);
                                setLoading(false);
                                enableScroll();
                            }}
                        >
                            取消
                        </div>
                        {Loading ?
                            <div className="btn btn-loading"><div className="loader"></div></div>
                            :
                            <div className="btn btn-yes" onClick={confirmPublish}>確定</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default List;
