import api from "./api";

export const getNotifications = async () => {
  const res = await api.get("/notifications/");
  return res.data.map((n) => ({
    id: n._id,
    title: `Alert: ${n.alertId} - Status: ${n.status}`,
    sentAt: n.sentAt,
  }));
};
