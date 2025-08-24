import React from "react";

export default function SettingsSection({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="bg-white rounded-lg shadow p-4">{children}</div>
    </div>
  );
}
