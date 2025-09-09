import React, { useEffect, useState } from "react";
import { FaUser, FaHistory, FaCog, FaEnvelope, FaShieldAlt, FaSignOutAlt, FaEdit,FaLock,FaSignInAlt, FaKey, FaPlus } from "react-icons/fa";
import { fetchProfile } from "../../services/profileService";

export default function ProfileTabs() {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile();
      setProfile(data);
    };
    getProfile();
  }, []);

  if (!profile)
    return <p className="text-center text-gray-500 mt-10 animate-pulse">Đang tải...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 from-indigo-50 to-indigo-100 p-1 rounded-2xl shadow-lg">
        <img
          src={profile.avatar}
          alt="avatar"
          className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-200 object-cover"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800">
            {profile.full_name || profile.name || "Người dùng"}
          </h2>
          <p className="flex items-center text-gray-600 mt-2">
            <FaEnvelope className="mr-2 text-blue-800" /> {profile.email}
          </p>
          <p className="flex items-center text-gray-600 mt-1">
            <FaShieldAlt className="mr-2 text-blue-800" /> {profile.role}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex space-x-6">
          {[
            { id: "info", label: "Thông tin", icon: <FaUser /> },
            { id: "activity", label: "Hoạt động", icon: <FaHistory /> },
            { id: "settings", label: "Cài đặt", icon: <FaCog /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.icon} <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div>
        {activeTab === "info" && (
          <div className="bg-white  rounded-2xl  space-y-4 transition-all duration-300">
            <p className="text-gray-700"><strong>Tên:</strong> {profile.full_name || profile.name || "Người dùng"}</p>
            <p className="text-gray-700"><strong>Email:</strong> {profile.email}</p>
            <p className="text-gray-700"><strong>Role:</strong> {profile.role}</p>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="rounded-2xl p-6  space-y-5 transition-all duration-300">
            <p className="text-gray-800 font-semibold text-lg">Hoạt động gần đây</p>
        <div className="flex justify-between items-center p-4 rounded-xl shadow-lg hover:scale-[1.02] transition">
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <FaSignInAlt className="text-indigo-500" />
            Đăng nhập vào hệ thống
          </span>
          <span className="text-gray-500 text-sm">10:23, 25/08/2025</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray rounded-xl shadow-lg hover:scale-[1.02] transition">
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <FaKey className="text-green-500" />
            Thay đổi mật khẩu
          </span>
          <span className="text-gray-500 text-sm">09:15, 20/08/2025</span>
        </div>

        <div className="flex justify-between items-center p-4 bg-gray rounded-xl shadow-lg hover:scale-[1.02] transition">
          <span className="flex items-center gap-2 text-gray-700 font-medium">
            <FaPlus className="text-pink-500" />
            Thêm thiết bị "Đèn phòng khách"
          </span>
          <span className="text-gray-500 text-sm">14:00, 18/08/2025</span>
        </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-md hover:from-indigo-600 hover:to-indigo-700 hover:scale-[1.02] transition">
              <FaEdit className="text-lg" /> Chỉnh sửa
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-4 bg-orange-500/90 text-white rounded-2xl shadow-md hover:bg-teal-600 hover:scale-[1.03] transition">
              <FaLock className="text-lg" /> Đổi mật khẩu
            </button>
            <button className="flex items-center justify-center gap-2 px-5 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-md hover:from-red-600 hover:to-red-700 hover:scale-[1.02] transition">
              <FaSignOutAlt className="text-lg" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
