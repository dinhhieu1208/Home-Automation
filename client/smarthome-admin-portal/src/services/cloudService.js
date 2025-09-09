import api from "./api";

export const getCloudData = async () => {
  const res = await api.get("/cloud");
  return res.data;
};
