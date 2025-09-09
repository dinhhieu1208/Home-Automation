import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Load user từ localStorage khi refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Memo để tránh re-render không cần thiết
  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook dùng trong component
export const useAuth = () => useContext(AuthContext);
