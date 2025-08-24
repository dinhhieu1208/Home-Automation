import api from "./api";

export const getPowerConsumption = async (range = "week") => {
  const res = await api.get(`/power-consumptions?range=${range}`);
  return res.data;
};
