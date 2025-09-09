import api from "./api";

// Helper: validate id trước khi gọi API
const ensureId = (id) => {
  const validId = id && typeof id === "string" && id.trim() !== "";
  if (!validId) throw new Error(" Invalid member id");
  return id;
};

// Lấy danh sách thành viên
export const getMembers = async () => {
  try {
    const res = await api.get("/member-managements/");
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error("Failed to fetch members:", err);
    return [];
  }
};

// Thêm thành viên mới
export const addMember = async (data) => {
  try {
    const res = await api.post("/member-managements/create", data);
    return res.data;
  } catch (err) {
    console.error("Failed to add member:", err);
    throw err;
  }
};

// Cập nhật thành viên
export const updateMember = async (memberId, data) => {
  const validId = ensureId(String(memberId));
  const res = await api.put(`/member-managements/update/${validId}`, data);
  return res.data;
};

// Xóa thành viên
export const deleteMember = async (memberId) => {
  const validId = ensureId(String(memberId));
  const res = await api.delete(`/member-managements/delete/${validId}`);
  return res.data;
};

// Khóa tài khoản
export const lockMember = async (memberId) => {
  const validId = ensureId(String(memberId));
  const res = await api.patch(`/member-managements/lock/${validId}`);
  return res.data;
};

// Mở khóa tài khoản
export const unlockMember = async (memberId) => {
  const validId = ensureId(String(memberId));
  const res = await api.patch(`/member-managements/unlock/${validId}`);
  return res.data;
};
