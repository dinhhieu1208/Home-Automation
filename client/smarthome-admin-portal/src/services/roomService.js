import api from "./api";

// Lấy tất cả phòng
export const getRooms = async () => {
  const res = await api.get("/rooms");
  return res.data;
};

// Bật/tắt thiết bị
export const toggleDevice = async (deviceId) => {
  const res = await api.patch(`/devices/${deviceId}/toggle`);
  return res.data;
};

// Lấy quyền truy cập phòng
export const getRoomAccess = async (roomId) => {
  const res = await api.get(`/roomaccess/${roomId}`);
  return res.data;
};

// Lấy tất cả người dùng
export const getUsers = async () => {
  const res = await api.get("/users");  
  return res.data;
};

// Tạo phòng mới
export const createRoom = async (roomData) => {
  const res = await api.post("/rooms/create", roomData); 
  return res.data;
};
