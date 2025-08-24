import api from "./api"; 

const token = localStorage.getItem("token");

export const fetchProfile = async () => {
  if (!token) return null;
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const saveProfile = async (data) => {
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
