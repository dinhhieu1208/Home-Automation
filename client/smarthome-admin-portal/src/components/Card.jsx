import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {children}
    </div>
  );
}
