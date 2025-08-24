<<<<<<< HEAD
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}
=======
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/AppRoutes";

const App = () => {
  return <RouterProvider router={router} />;
};
>>>>>>> 598fed0 (Feat/HieuTruong/updated/200/OK)

export default App;
