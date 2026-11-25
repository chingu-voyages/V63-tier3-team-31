import { Outlet } from "react-router";
import Footer from "./footer/Footer";

export default function RootLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}