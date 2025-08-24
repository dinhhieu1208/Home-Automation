// src/services/memberManagementService.js
import api from "./api";

// Lấy danh sách thành viên
export const getMembers = async () => {
  try {
    const res = await api.get("/member-managements/");
    return res.data;
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
export const updateMember = async (id, data) => {
  try {
    const res = await api.put(`/member-managements/update/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Failed to update member:", err);
    throw err;
  }
};

// Xóa thành viên
export const deleteMember = async (memberId) => {
  try {
    const res = await api.delete(`/member-managements/delete/${memberId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to delete member:", err);
    throw err;
  }
};

// Toggle quyền truy cập trong phòng (lock/unlock access)
export const toggleMemberAccess = async (roomId, memberId, toggleAccess) => {
  try {
    const res = await api.patch(`/member-managements/${roomId}/${memberId}/toggle`, {
      toggleAccess,
    });
    return res.data;
  } catch (err) {
    console.error(`Failed to toggle access for member ${memberId}:`, err);
    throw err;
  }
};

// Khóa tài khoản (lock account)
export const lockMember = async (memberId) => {
  try {
    const res = await api.patch(`/member-managements/lock/${memberId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to lock member ${memberId}:`, err);
    throw err;
  }
};

// Mở khóa tài khoản (unlock account)
export const unlockMember = async (memberId) => {
  try {
    const res = await api.patch(`/member-managements/unlock/${memberId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to unlock member ${memberId}:`, err);
    throw err;
  }
};
