// components/DeviceIcon.jsx
import React from "react";

export default function DeviceIcon({ type }) {
  const iconMap = {
    air: "air",
    tv: "tv",
    temp: "device_thermostat",
    wifi: "wifi",
    light: "lightbulb",
    vacuum: "robot_vacuum",
    lock: "lock",
    door: "door_front",
    heater: "heat_pump",
  };

  return (
    <span className="material-symbols-outlined text-3xl text-indigo-500">
      {iconMap[type] || "devices"}
    </span>
  );
}
