import React, { useEffect } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const icon = type === "success" ? "✔️" : "❌";

  return (
    <div className={`fixed bottom-4 right-4 flex items-center gap-3 text-white px-4 py-3 rounded-lg shadow-lg ${bgColor} animate-slide-in`}>
      <span className="text-lg">{icon}</span>
      <span>{message}</span>
    </div>
  );
}
