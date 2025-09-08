import React from "react";
import { Link, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Card from "../components/Card";

import AccountSettingsView from "../views/settings/AccountSettingsView";
import SystemSettingsView from "../views/settings/SystemSettingsView";
import SmartHomeSettingsView from "../views/settings/SmartHomeSettingsView";
import NotificationsSettingsView from "../views/settings/NotificationsSettingsView";
import OtherSettingsView from "../views/settings/OtherSettingsView";
import AboutView from "../views/settings/AboutView";

const tabs = [
  { key: "account", label: "Tài khoản", path: "/settings/account" },
  { key: "system", label: "Hệ thống", path: "/settings/system" },
  { key: "smarthome", label: "SmartHome", path: "/settings/smarthome" },
  { key: "notifications", label: "Thông báo", path: "/settings/notifications" },
  { key: "about", label: "Thông tin", path: "/settings/about" },
  { key: "other", label: "Khác", path: "/settings/other" },
];

export default function SettingsPage() {
  const location = useLocation();
      return (
        <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg rounded-r-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Cài đặt</h2>
        <ul className="space-y-3 flex-1">
          {tabs.map((tab) => (
            <li key={tab.key}>
              <Link
                to={tab.path}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  location.pathname === tab.path
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-8">
        <Card className="p-8 rounded-xl h-full">
          <Routes>
            <Route path="/" element={<Navigate to="account" replace />} />
            <Route path="account" element={<AccountSettingsView />} />
            <Route path="system" element={<SystemSettingsView />} />
            <Route path="smarthome" element={<SmartHomeSettingsView />} />
            <Route path="notifications" element={<NotificationsSettingsView />} />
            <Route path="other" element={<OtherSettingsView />} />
            <Route path="about" element={<AboutView />} />
          </Routes>
        </Card>
      </main>
    </div>
  );
}