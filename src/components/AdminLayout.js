import { Outlet, useLocation } from 'react-router-dom';
import Nav from "./AdminNav";
import Footer from './Footer';
import { useEffect, useState } from 'react';

const AdminLayout = () => {
    const location = useLocation();
    const [navBgColor, setNavBgColor] = useState('white');
    const [navPosition, setNavPosition] = useState('relative');


    useEffect(() => {
        // 根據當前路由設定背景顏色
        switch (location.pathname) {
            case '/admin':
                setNavBgColor('transparent');
                setNavPosition('fixed')
                break;
            default:
                setNavBgColor('white');
                setNavPosition('relative')
        }
    }, [location]);

    return (
        <>
            <Nav bg={navBgColor} posi={navPosition} />
            <Outlet />
            <Footer />
        </>
    );
};

export default AdminLayout;
