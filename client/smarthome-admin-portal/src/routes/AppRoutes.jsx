import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout"; 
import AuthLayout from "../layouts/AuthLayout";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import DevicesPage from "../pages/DevicesPage";
import SettingsPage from "../pages/SettingsPage";
import CloudPage from "../pages/CloudPage";
import AnalyticsPage from "../pages/AnalyticPage";
import NotificationsPage from "../pages/NotificationsPage";
import MessagesPage from "../pages/MessagePage";

import DashboardView from "../views/dashboard/DashboardView";
import DeviceListView from "../views/devices/DeviceListView";
import RoomListView from "../views/rooms/RoomListView";
import MemberListView from "../views/members/MemberListView";
import CloudView from "../views/cloud/CloudView";
import AnalyticsView from "../views/analytics/AnalyticsView";
import NotificationView from "../views/notifications/NotificationsView";
import MessageView from "../views/messages/MessageView";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/register" replace />} />

        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        {/* Admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardView />} />
          </Route>
          <Route path="/devices" element={<DevicesPage />}>
            <Route index element={<DeviceListView />} />
          </Route>
          <Route path="/rooms" element={<RoomListView />} />
          <Route path="/members" element={<MemberListView />} /> 
          <Route path="/settings/*" element={<SettingsPage />} />
            <Route path="/cloud" element={<CloudPage />}>
          <Route index element={<CloudView />} />
          </Route>
          <Route path="/analytics" element={<AnalyticsPage />}>
            <Route index element={<AnalyticsView />} />
          </Route>
          <Route path="/notifications" element={<NotificationsPage />}>
            <Route index element={<NotificationView />} />
          </Route>
          <Route path="/messages" element={<MessagesPage />}>
            <Route index element={<MessageView />} />
          </Route>
        </Route>
        
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

