import { useState, useEffect } from "react";
import { getUserInfo } from "../services/authService";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const info = getUserInfo();
    setUser(info);
  }, []);

  return { user };
}
