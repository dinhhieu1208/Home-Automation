import api from "./api";

export const getNotifications = async () => {
  try {
    const res = await api.get("/notifications/");
    return res.data.map((n) => ({
      id: n.id,
      type: n.type,
      icon: n.icon,
      message: n.message,
      actions: n.actions || [],
      user: n.user ? {
        name: n.user.name,
        avatar: n.user.avatar
      } : undefined,
      profile: n.profile ? {
        name: n.profile.name,
        avatar: n.profile.avatar,
        link: n.profile.link
      } : undefined
    }));
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
};
