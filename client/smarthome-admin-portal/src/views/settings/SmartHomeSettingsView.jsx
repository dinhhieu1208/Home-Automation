import React from "react";
import { FiHome, FiCpu, FiUsers, FiZap } from "react-icons/fi";

export default function SmartHomeSettingsView() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-gray-800 mb-1">Cài đặt SmartHome</h3>
        <p className="text-gray-500">Quản lý phòng, thiết bị, thành viên và tự động hóa.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card
          icon={<FiHome />}
          label="Quản lý phòng"
          value="5 phòng"
          buttonText="Quản lý"
          buttonColor="indigo"
        />
        <Card
          icon={<FiCpu />}
          label="Quản lý thiết bị"
          value="12 thiết bị"
          buttonText="Xem thiết bị"
          buttonColor="green"
        />
        <Card
          icon={<FiUsers />}
          label="Phân quyền thành viên"
          value="3 thành viên"
          buttonText="Cập nhật"
          buttonColor="blue"
        />
        <Card
          icon={<FiZap />}
          label="Tự động hóa"
          value="7 rule"
          buttonText="Thêm mới"
          buttonColor="purple"
        />
      </div>
    </div>
  );
}

function Card({ icon, label, value, buttonText, buttonColor }) {
  const colors = {
    indigo: "bg-indigo-600 hover:bg-indigo-700",
    green: "bg-green-500 hover:bg-green-600",
    blue: "bg-blue-500 hover:bg-blue-600",
    purple: "bg-purple-500 hover:bg-purple-600",
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 flex flex-col items-center hover:shadow-2xl transition">
      <div className="text-4xl text-gray-600 mb-3">{icon}</div>
      <span className="text-gray-500 text-sm">{label}</span>
      <span className="text-lg font-semibold text-gray-800 mt-1">{value}</span>
      <button className={`mt-4 px-4 py-2 text-white rounded-lg ${colors[buttonColor]} transition`}>
        {buttonText}
      </button>
    </div>
  );
}
