
import { Outlet } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}

