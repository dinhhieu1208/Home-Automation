import React from "react";
import { Outlet, Link } from "react-router-dom";
import logo from "../assets/images/Logo_SmartHome.png";
import illustration from "../assets/images/illustration.gif";

export default function AuthLayout() {
  return (
    <div className="min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
          <span className="text-gray-700 font-semibold">Home Automation</span>
        </div>
          <nav className="text-sm text-gray-500 text-right">
            <Link to="/auth/register" className="mr-4 hover:underline">Create Account</Link>
            <Link to="/auth/login" className="hover:underline">Login</Link>
          </nav>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center min-h-[72vh]">
          <div className="flex items-center">
            <div className="w-full max-w-md">
              <Outlet />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <img
              src={illustration}
              alt="Illustration"
              className="w-full max-w-lg select-none"
              draggable="false"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
