import React from "react";

const menu = [
  { key: "account", label: "Tài khoản" },
  { key: "system", label: "Hệ thống" },
  { key: "smarthome", label: "Nhà thông minh" },
  { key: "notifications", label: "Thông báo" },
  { key: "about", label: "Giới thiệu" },
];

export default function SettingsSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Cài đặt</h2>
      <nav className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            onClick={() => onTabChange(item.key)}
            className={`w-full text-left px-3 py-2 rounded-md ${
              activeTab === item.key
                ? "bg-indigo-100 text-indigo-700 font-medium"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
