import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Header from "../components/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Nav />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
