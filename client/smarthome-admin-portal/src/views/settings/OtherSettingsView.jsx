import React from "react";
import Google from "../../assets/images/logo_google.png";
import Facebook from "../../assets/images/logo_facebook.png";
import Twitter from "../../assets/images/logo_Twitter.png";

export default function OtherSettingsView() {
  const contacts = [
    { name: "Google", logo: Google, link: "https://mail.google.com",},
    { name: "Facebook", logo: Facebook, link: "https://www.facebook.com",},
    { name: "Twitter", logo: Twitter, link: "https://twitter.com", },
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-3xl font-bold text-gray-800">Cài đặt khác</h2>
      <p className="text-gray-500">Quản lý thông tin ứng dụng, liên hệ và hỗ trợ.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className=" rounded-xl p-4 space-y-6 -ml-4">
          <h3 className="text-2xl font-semibold text-gray-800">Liên hệ nhanh</h3>
          <p className="text-gray-500">Chọn nền tảng bạn muốn liên hệ hoặc gửi feedback.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <a
                key={contact.name}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:bg-indigo-50 transition transform hover:-translate-y-1"
              >
                <img
                  src={contact.logo}
                  alt={contact.name}
                  className="w-14 h-14 mb-3 object-contain"
                />
                <span className="text-base font-semibold text-gray-800">
                  {contact.name}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-6 text-gray-600">
            <p>
              Gửi feedback trực tiếp qua email:{" "}
              <a
                href="mailto:support@smarthome.com"
                className="text-indigo-600 hover:underline"
              >
                support@smarthome.com
              </a>
            </p>
            <p className="mt-2 text-sm">
              Thời gian xuất bản: <span className="font-medium">02/09/2025</span>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Thông tin ứng dụng</h4>
            <p className="text-gray-600">
              SmartHome Control giúp bạn quản lý các thiết bị trong nhà từ xa một cách dễ dàng và
              an toàn.
            </p>
            <ul className="mt-3 text-gray-500 text-sm space-y-1">
              <li>
                <span className="font-medium">Phiên bản:</span> V1.0.0
              </li>
              <li>
                <span className="font-medium">Nhà phát triển:</span> IoT Team
              </li>
              <li>
                <span className="font-medium">Email:</span> support@smarthome.com
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-3">Hỗ trợ & Tài liệu</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <a href="/docs" className="text-indigo-600 hover:underline">
                  Hướng dẫn sử dụng
                </a>
              </li>
              <li>
                <a href="/faq" className="text-indigo-600 hover:underline">
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
              <li>
                <a
                  href="https://zalo.me/g/smarthome"
                  target="_blank"
                  className="text-indigo-600 hover:underline"
                >
                  Nhóm Zalo hỗ trợ
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
