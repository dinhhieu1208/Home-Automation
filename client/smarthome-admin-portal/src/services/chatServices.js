import api from "./api";

// Lấy danh sách conversations của 1 user
export const getConversations = async (userId) => {
  const res = await api.get(`/chat/conversations/${userId}`);
  return res.data;
};

// Lấy danh sách messages trong 1 conversation
export const getMessages = async (conversationId, limit = 50, skip = 0) => {
  const res = await api.get(
    `/chat/messages/${conversationId}?limit=${limit}&skip=${skip}`
  );
  return res.data;
};

// Gửi tin nhắn
export const sendMessage = async (messageData) => {
  const res = await api.post(`/chat/messages`, messageData);
  return res.data;
};
