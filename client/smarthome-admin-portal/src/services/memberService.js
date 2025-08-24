import api from "./api";

export const getMembers = async () => {
  try {
    const res = await api.get("/members/"); 
    const members = res.data.map((m) => ({
      id: m.id || m._id,
      name:  m.name, 
      avatar: m.avatar,
      role: m.role,
    }));
    return members;
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return [];
  }
};

