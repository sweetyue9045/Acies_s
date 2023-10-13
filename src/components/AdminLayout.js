import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const AdminLayout = () => {

    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};

export default AdminLayout;