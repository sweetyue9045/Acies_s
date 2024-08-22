import { Outlet } from "react-router-dom";
import Nav from "./AdminNav";
import Footer from "./Footer";

const AdminLayout = ({ bg, posi }) => {

    return (
        <>
            <Nav bg={{ bg }} posi={{ posi }} />
            <Outlet />
            <Footer />
        </>
    );
};

export default AdminLayout;