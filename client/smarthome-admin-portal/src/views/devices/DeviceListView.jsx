import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { getDevices } from "../../services/deviceService";
import { getRooms, getRoomAccess } from "../../services/roomService";
import { getPowerConsumption } from "../../services/powerService";
import { deviceIcons } from "../../components/DeviceIconMap"; 

export default function DeviceListView() {
  const [devices, setDevices] = useState([]);
  const [roomsMap, setRoomsMap] = useState({});
  const [roomAccessMap, setRoomAccessMap] = useState({});
  const [powerData, setPowerData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [deviceList, roomList, powerList] = await Promise.all([
          getDevices(),
          getRooms(),
          getPowerConsumption("week"),
        ]);

        const deviceArr = Array.isArray(deviceList) ? deviceList : [];
        setDevices(deviceArr);

        // Map roomId => roomName
        const rm = {};
        if (Array.isArray(roomList)) {
          roomList.forEach((r) => {
            const id = r._id || r.id || r.roomId || r.id_room;
            const name = r.name || r.roomName || r.label || id;
            if (id) rm[id] = name;
          });
        }
        setRoomsMap(rm);

        // Lấy danh sách roomId cần query access
        const roomIds = [
          ...new Set(
            deviceArr
              .map((d) => d.room_id || d.roomId || d.room || d.roomName)
              .filter(Boolean)
              .map(String)
          ),
        ];

        // Lấy access cho từng room
        const accessMap = {};
        await Promise.all(
          roomIds.map(async (rid) => {
            try {
              const res = await getRoomAccess(rid);
              // fix: API trả về mảng trực tiếp
              accessMap[rid] = Array.isArray(res) ? res : [];
            } catch (err) {
              console.warn("getRoomAccess failed for", rid, err);
              accessMap[rid] = [];
            }
          })
        );
        setRoomAccessMap(accessMap);

        // Lấy power data
        const pMap = {};
        if (powerList) {
          if (!Array.isArray(powerList) && typeof powerList === "object") {
            Object.entries(powerList).forEach(([k, v]) => (pMap[k] = v));
          } else if (Array.isArray(powerList)) {
            powerList.forEach((p) => {
              if (!p) return;
              const key = p.deviceId || p.device_id || p._id || p.id;
              const val = p.value ?? p.consumption ?? p.power ?? p.watt;
              if (key) pMap[key] = val;
            });
          }
        }
        setPowerData(pMap);
      } catch (err) {
        console.error("Failed to fetch device/room/power data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  const isDeviceOn = (device) => {
    if (!device) return false;
    if (typeof device.is_on === "boolean") return device.is_on;
    if (typeof device.isOn === "boolean") return device.isOn;
    if (typeof device.status === "string") return device.status.toLowerCase() === "on";
    if (typeof device.status === "number") return device.status === 1;
    if (typeof device.status === "boolean") return device.status;
    if (typeof device.defaultState === "string") return device.defaultState.toLowerCase() === "on";
    return false;
  };

  if (loading) {
    return <p className="p-6 text-center text-gray-500"></p>;
  }

  return (
    <div className="rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">List Of All Devices</h2>

        <button
          onClick={() => console.log("Add new device clicked")}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Add New Device
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Thiết bị</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Thành viên (Room)</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phòng</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Công suất</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {devices.map((device) => {
              const deviceId = device.id || device._id;
              const active = isDeviceOn(device);

              const roomKey = device.room_id || device.roomId || device.room || device.roomName;
              const roomDisplay = (roomKey && roomsMap[roomKey]) || device.roomName || device.room || "-";
              const powerValue = powerData[deviceId] ?? powerData[String(deviceId)] ?? "-";

              const membersOfRoom = roomKey ? roomAccessMap[String(roomKey)] || [] : [];

              const IconComp = deviceIcons[device.type] || deviceIcons[device.type?.toLowerCase?.()] || deviceIcons["light"] || null;

              return (
                <tr key={deviceId} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      {IconComp && <IconComp className={`${active ? "text-indigo-600" : "text-gray-400"} w-5 h-5`} />}
                      <span className="font-medium">{device.name || device.label || "-"}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {membersOfRoom.length === 0 ? (
                        <div className="text-sm text-gray-400">No members</div>
                      ) : (
                        membersOfRoom.map((m) => (
                          <img
                            key={m.memberId || m._id}
                            src={m.avatar || "/default-avatar.png"}
                            alt={m.name || "Member"}
                            title={`${m.name || "Member"}${m.role ? ` • ${m.role}` : ""}`}
                            className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                          />
                        ))
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">{roomDisplay}</td>

                  <td className="px-6 py-4 text-sm text-gray-600">{powerValue !== "-" ? `${powerValue}W` : "-"}</td>

                  <td className="px-6 py-4">
                    <Switch
                      checked={active}
                      disabled
                      className={`${active ? "bg-blue-500" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-colors cursor-default`}
                    >
                      <span className={`${active ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                    </Switch>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
