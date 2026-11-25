import { Outlet } from "react-router";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./navigation/SideBar";
import BottomNavigation from "./navigation/BottomNavigation";

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <div className="fixed inset-y-0 left-0 hidden md:block">
                <Sidebar />
            </div>

            <div className="w-full md:w-auto md:ml-24 lg:ml-72.5">
                <DashboardHeader userName="Guest" />

                <main className="min-h-[calc(100dvh-72px)] pb-24 md:pb-0">
                    <Outlet />
                </main>
            </div>

            <BottomNavigation />
        </div>
    );
}