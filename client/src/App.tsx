import { Routes, Route } from "react-router";
import RootLayout from "./components/layouts/RootLayout";
import Home from "./features/home-page/Home";
import { Dashboard } from "./features/dashboard/Dashboard";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Account from "./features/account/Account";
import Analytics from "./features/analytics/Analytics";
import CheckIn from "./features/check-in/CheckIn";
import Events from "./features/events/Events";
export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="check-in" element={<CheckIn />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="account" element={<Account />} />
      </Route >
      
    </Routes>
  );
}