
import api from "./api";

export const getDevices = async () => {
  const res = await api.get("/devices");
  return res.data;
};

export const toggleDevice = async (deviceId, is_on) => {
  const res = await api.patch(`/devices/${deviceId}/toggle`, { is_on });
  return res.data;
};

