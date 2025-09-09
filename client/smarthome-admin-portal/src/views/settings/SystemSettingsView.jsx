import React, { useState } from "react";

export default function SystemSettingsView() {
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-800">Cài đặt hệ thống</h3>
      <p className="text-gray-600">Quản lý các thiết lập và trạng thái của hệ thống SmartHome.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-500 text-sm">Wi-Fi</span>
          <span className="text-lg font-semibold text-green-600">Connected</span>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-500 text-sm">Cloud</span>
          <span className="text-lg font-semibold text-blue-600">Online</span>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-500 text-sm">Backup</span>
          <span className="text-lg font-semibold text-yellow-600">25/08/2025</span>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg shadow flex flex-col items-center">
          <span className="text-gray-500 text-sm">Firmware</span>
          <span className="text-lg font-semibold text-indigo-600">v1.0.0</span>
        </div>
      </div>

    <div className="space-y-4">
      <label className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow hover:bg-gray-100 transition">
        <span className="font-medium text-gray-700">Cập nhật tự động</span>
        <div
          onClick={() => setAutoUpdate(!autoUpdate)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            autoUpdate ? "bg-indigo-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
              autoUpdate ? "translate-x-6" : ""
            }`}
          />
        </div>
      </label>

      <label className="flex items-center justify-between bg-gray-50 p-4 rounded-xl shadow hover:bg-gray-100 transition">
        <span className="font-medium text-gray-700">Chế độ bảo trì</span>
        <div
          onClick={() => setMaintenanceMode(!maintenanceMode)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            maintenanceMode ? "bg-red-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
              maintenanceMode ? "translate-x-6" : ""
            }`}
          />
        </div>
      </label>
    </div>

      <div className="flex flex-wrap gap-4 mt-4">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
          Cập nhật Firmware
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Sao lưu ngay
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
          Reset hệ thống
        </button>
      </div>
    </div>
  );
}
