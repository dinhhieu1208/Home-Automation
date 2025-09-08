import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Logo from "../assets/images/Logo_SmartHome.png";
import ConfirmDialog from "../components/ConfirmDialog";

const topMenu = [
  { icon: "home", link: "/dashboard" },
  { icon: "door_front", link: "/rooms" },
  { icon: "tv", link: "/devices" },
  { icon: "people", link: "/members" },
  { icon: "message", link: "/messages" },
  { icon: "cloud", link: "/cloud" },
  { icon: "bar_chart", link: "/analytics" },
  { icon: "notifications", link: "/notifications" },
];

const bottomMenu = [
  { icon: "settings", link: "/settings" },
  { icon: "logout", link: "/logout" },
];

export default function Nav() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 

  const handleLogout = () => setIsLogoutOpen(true);

  const confirmLogout = () => {
    setIsLogoutOpen(false);
    navigate("/auth/login");
  };

  const cancelLogout = () => setIsLogoutOpen(false);

  return (
    <>
      <aside className="w-16 bg-white shadow flex flex-col items-center py-2">
        <div className="mb-6">
          <img src={Logo} alt="logo" className="w-20 h-15" />
        </div>

        <nav className="flex flex-col items-center space-y-6">
          {topMenu.map((item, i) => {
            const isActive = location.pathname.startsWith(item.link);

            const baseClass = "w-6 h-6";
            const colorClass = isActive
              ? "text-indigo-600"
              : "text-gray-700 hover:text-indigo-600";

            if (item.icon === "home" || item.icon === "door_front") {
              return (
                <button
                  key={i}
                  onClick={() => navigate(item.link)}
                  className={colorClass}
                >
                  <span className={`material-icons ${baseClass}`}>
                    {item.icon}
                  </span>
                </button>
              );
            }

            return (
              <Link key={i} to={item.link} className={colorClass}>
                <span className={`material-icons ${baseClass}`}>
                  {item.icon}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col items-center space-y-6">
          {bottomMenu.map((item, i) =>
            item.icon === "logout" ? (
              <button
                key={i}
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                <span className="material-icons w-6 h-6">{item.icon}</span>
              </button>
            ) : (
              <Link
                key={i}
                to={item.link}
                className={`${
                  location.pathname.startsWith(item.link)
                    ? "text-indigo-600"
                    : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                <span className="material-icons w-6 h-6">{item.icon}</span>
              </Link>
            )
          )}
        </div>
      </aside>

      <ConfirmDialog
        isOpen={isLogoutOpen}
        title="Đăng xuất"
        message="Bạn có chắc muốn đăng xuất không?"
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </>
  );
}
