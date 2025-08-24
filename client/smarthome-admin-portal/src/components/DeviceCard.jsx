// components/DeviceCard.jsx
import React from "react";
import DeviceIcon from "./DeviceIcon";

export default function DeviceCard({ device, onToggle }) {
  return (
    <div
      className={`w-32 h-32 p-3 rounded-lg shadow flex flex-col items-center justify-between cursor-pointer ${
        device.status ? "bg-indigo-50" : "bg-gray-100"
      }`}
      onClick={() => onToggle(device.id)}
    >
      <DeviceIcon type={device.type} />
      <span className="text-sm font-medium">{device.name}</span>
      <span
        className={`text-xs ${
          device.status ? "text-green-600" : "text-gray-400"
        }`}
      >
        {device.status ? "On" : "Off"}
      </span>
    </div>
  );
}
