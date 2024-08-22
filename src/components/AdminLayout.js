import { Outlet } from 'react-router-dom';
import Nav from "./AdminNav";
import Footer from './Footer';

const AdminLayout = () => {

    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
};

export default AdminLayout;