import api from "./api";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token"); 
  if (!token) return null;
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveProfile = async (data) => {
  const token = localStorage.getItem("token"); 
  if (!token) return null;
  const res = await api.put("/auth/me/profile", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const logoutProfile = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
