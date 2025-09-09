import React from "react";

export default function NotificationsSettingsView() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Cài đặt thông báo</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" /> 
          <span>Email Notifications</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" className="w-4 h-4" /> 
          <span>Push Notifications</span>
        </label>
      </div>
    </div>
  );
}
