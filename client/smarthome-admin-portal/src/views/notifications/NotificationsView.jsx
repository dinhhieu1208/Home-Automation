import React, { useEffect, useState } from "react";
import { getNotifications } from "../../services/notificationService";

const typeIcons = {
  reminder: "event_note",
  device_alert: "warning",
  access_request: "vpn_key",
  request: "mail",
};

export default function NotificationsView() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getNotifications();
        setNotifications(data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filteredNotifications =
    filter === "all"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-4">
        {["all", "reminder", "device_alert", "access_request", "request"].map(
          (type) => (
            <button
              key={type}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                filter === type
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={() => setFilter(type)}
            >
              {type === "all"
                ? "All"
                : type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          )
        )}
      </div>

      {loading ? (
        <div className="text-gray-400">Loading notifications...</div>
      ) : filteredNotifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No notifications available</p>
      ) : (
        <ul className="space-y-4">
          {filteredNotifications.map((n, idx) => (
            <li
              key={n.id || idx}
              className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <span className="material-icons text-xl text-indigo-500">
                  {typeIcons[n.type] || "notifications"}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{n.message}</p>

                  {/* User info */}
                  {n.user && (
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={n.user.avatar}
                        alt={n.user.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-xs text-gray-500">{n.user.name}</span>
                    </div>
                  )}

                  {/* Profile info */}
                  {n.profile && (
                    <div className="flex items-center gap-2 mt-1">
                      <img
                        src={n.profile.avatar}
                        alt={n.profile.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <a
                        href={n.profile.link}
                        className="text-xs text-indigo-600 font-semibold"
                      >
                        {n.profile.name}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {n.actions?.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {n.actions.map((a, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        a.style === "primary"
                          ? "bg-indigo-600 text-white hover:bg-indigo-700"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } transition`}
                      onClick={() => console.log(`Action: ${a.action}`)}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
