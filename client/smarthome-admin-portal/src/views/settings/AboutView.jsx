import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Teach from "../../assets/images/Teach.png";

export default function AboutView() {
  return (
    <div className="flex flex-col min-h-screen space-y-6">
      {/* Nội dung chính */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FaInfoCircle className="text-indigo-600 w-6 h-6" />
          <h3 className="text-2xl font-bold text-gray-800">Thông tin ứng dụng</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3 bg-white shadow-md rounded-xl">
          <div>
            <span className="text-gray-800 font-semibold">Tên ứng dụng: </span>
            <span className="text-gray-600">SmartHome Admin Portal</span>
          </div>
          <div>
            <span className="text-gray-800 font-semibold">Nhà phát triển: </span>
            <span className="text-gray-600">IOT Team</span>
          </div>
          <div>
            <span className="text-gray-800 font-semibold">Phiên bản: </span>
            <span className="text-gray-600">V1.0.0</span>
          </div>
          <div>
            <span className="text-gray-800 font-semibold">Hỗ trợ: </span>
            <a
              href="mailto:support@smarthome.com"
              className="text-gray-600 hover:underline"
            >
              support@smarthome.com
            </a>
          </div>
          <div>
            <span className="text-gray-800 font-semibold">Thời gian phát hành: </span>
            <span className="text-gray-600">02/09/2025</span>
          </div>
          <div>
            <span className="text-gray-800 font-semibold">Website: </span>
            <a
              href="https://SmartHomeAdminPortal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:underline"
            >
              www.SmartHomeAdminPortal.com
            </a>
          </div>
        </div>
      </div>

      <div className="mt-auto bg-white shadow-md p-6 rounded-xl space-y-3">
        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold">SmartHome Admin Portal</span> là nền tảng quản lý hệ thống nhà thông minh, 
          giúp bạn kiểm soát thiết bị, phòng, thành viên và các tự động hóa một cách dễ dàng và trực quan.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Phiên bản này mang đến giao diện thân thiện, bảo mật cao và tối ưu cho quản trị viên.
        </p>
      </div>
    </div>
  );
}
