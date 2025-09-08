import React from "react";

export default function NotificationsModal({ isOpen, onClose, notifications }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 pt-20 px-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">All Notifications</h3>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <ul className="space-y-4">
          {notifications.map((n, idx) => (
            <li
              key={idx}
              className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="material-icons text-2xl text-indigo-600">{n.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{n.message}</p>

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

              {n.actions?.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {n.actions.map((a, idx) => (
                    <button
                      key={idx}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        a.style === "primary"
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
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
      </div>
    </div>
  );
}
