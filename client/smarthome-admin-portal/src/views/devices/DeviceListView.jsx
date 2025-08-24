import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { getDevices, toggleDevice } from "../../services/deviceService";
import { getMembers } from "../../services/memberManagementService";
import { getRooms } from "../../services/roomService";
import { getPowerConsumption } from "../../services/powerService";

export default function DeviceListView() {
  const [devices, setDevices] = useState([]);
  const [members, setMembers] = useState([]);
  const [roomsMap, setRoomsMap] = useState({});
  const [powerData, setPowerData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // getDevices usually returns array of device objects
        const [deviceList, memberList, roomList, powerList] = await Promise.all([
          getDevices(),
          getMembers(),
          getRooms(),
          getPowerConsumption("week"),
        ]);

        setDevices(Array.isArray(deviceList) ? deviceList : []);
        setMembers(Array.isArray(memberList) ? memberList : []);

        // Build a flexible rooms map. roomList may be: [{ _id, id, name }],
        // or [{ name }], or ["Living Room", "Kitchen"]. We'll map by possible keys.
        const roomMap = {};
        if (Array.isArray(roomList)) {
          roomList.forEach((r) => {
            if (!r) return;
            if (typeof r === "string") {
              // map name -> name
              roomMap[r] = r;
            } else if (typeof r === "object") {
              const id = r._id || r.id || r.roomId || r.id_room;
              const name = r.name || r.roomName || r.label || id;
              if (id) roomMap[id] = name;
              // also map by name to name so devices that store room by name will resolve
              if (name) roomMap[name] = name;
            }
          });
        }
        setRoomsMap(roomMap);

        // Normalize power data. powerList could be object { deviceId: value } or array [{ deviceId, value }]
        const powerMap = {};
        if (powerList) {
          if (!Array.isArray(powerList) && typeof powerList === "object") {
            // object keyed by device id
            Object.entries(powerList).forEach(([k, v]) => {
              powerMap[k] = v;
            });
          } else if (Array.isArray(powerList)) {
            powerList.forEach((p) => {
              if (!p) return;
              const key = p.deviceId || p.device_id || p._id || p.id;
              const val = p.value ?? p.consumption ?? p.power ?? p.watt;
              if (key) powerMap[key] = val;
            });
          }
        }
        setPowerData(powerMap);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Helper to determine boolean on/off from various possible fields
  const isDeviceOn = (device) => {
    if (!device) return false;
    if (typeof device.is_on === "boolean") return device.is_on;
    if (typeof device.isOn === "boolean") return device.isOn;
    if (typeof device.status === "string") return device.status.toLowerCase() === "on";
    if (typeof device.status === "number") return device.status === 1;
    if (typeof device.status === "boolean") return device.status;
    // fallback to defaultState
    if (typeof device.defaultState === "string") return device.defaultState.toLowerCase() === "on";

    return false;
  };

  const toggleStatus = async (deviceId, currentStatus) => {
    // optimistic update: store previous and update UI
    const prev = devices;
    setDevices((prevDevices) =>
      prevDevices.map((d) => {
        const id = d.id || d._id;
        if (id === deviceId) {
          // try to normalize status fields
          return {
            ...d,
            is_on: !currentStatus,
            status: !currentStatus ? "on" : "off",
          };
        }
        return d;
      })
    );

    try {
      // Many toggleDevice implementations accept only id and return updated device or status
      const res = await toggleDevice(deviceId);

      // if the API returned something that identifies new status, merge it
      if (res) {
        setDevices((prevDevices) =>
          prevDevices.map((d) => {
            const id = d.id || d._id;
            if (id === deviceId) {
              // res may be the whole device or a small object
              const newStatus = res.status ?? res.is_on ?? (res === "on" ? "on" : res === "off" ? "off" : undefined);
              const isOn =
                typeof newStatus === "boolean"
                  ? newStatus
                  : typeof newStatus === "string"
                  ? newStatus.toLowerCase() === "on"
                  : undefined;

              return {
                ...d,
                ...(typeof newStatus !== "undefined" ? { status: isOn ? "on" : "off", is_on: !!isOn } : {}),
              };
            }
            return d;
          })
        );
      }
    } catch (err) {
      console.error("Failed to toggle device:", err);
      // revert optimistic update on error
      setDevices(prev);
    }
  };

  if (loading) {
    return <p className="p-4">Loading devices...</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-x-auto">
      <div className="flex justify-end p-4">
        <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">+ Add Device</button>
      </div>

      <table className="min-w-full table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Device</th>
            <th className="px-4 py-2 text-left">Members</th>
            <th className="px-4 py-2 text-left">Room</th>
            <th className="px-4 py-2 text-left">Power consumption</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => {
            const deviceId = device.id || device._id;
            const isOn = isDeviceOn(device);

            // members can be an array of IDs, or objects
            const deviceMembers = device.memberIds || device.members || device.membership || [];

            // room lookup: try common keys then fallback to roomName/room
            const roomKey = device.room_id || device.roomId || device.room || device.roomName;
            const roomDisplay = (roomKey && roomsMap[roomKey]) || device.roomName || device.room || "-";

            const powerValue = powerData[deviceId] ?? powerData[deviceId?.toString()] ?? "-";

            return (
              <tr key={deviceId} className="border-t">
                <td className="px-4 py-2">{device.name || device.label || "-"}</td>

                <td className="px-4 py-2 flex -space-x-2">
                  {Array.isArray(deviceMembers) &&
                    deviceMembers.map((memberRef) => {
                      // memberRef may be id string or full object
                      if (!memberRef) return null;
                      if (typeof memberRef === "object") {
                        return (
                          <img
                            key={memberRef._id || memberRef.id}
                            src={memberRef.avatar}
                            alt={memberRef.name}
                            className="w-6 h-6 rounded-full border-2 border-white"
                          />
                        );
                      }

                      const member = members.find((m) => m._id === memberRef || m.id === memberRef);
                      return member ? (
                        <img
                          key={member._id || member.id}
                          src={member.avatar}
                          alt={member.name}
                          className="w-6 h-6 rounded-full border-2 border-white"
                        />
                      ) : null;
                    })}
                </td>

                <td className="px-4 py-2">{roomDisplay}</td>

                <td className="px-4 py-2">{powerValue ?? "-"}</td>

                <td className="px-4 py-2">
                  <Switch
                    checked={isOn}
                    onChange={() => toggleStatus(deviceId, isOn)}
                    className={`${isOn ? "bg-indigo-600" : "bg-gray-300"} relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
                  >
                    <span className={`${isOn ? "translate-x-6" : "translate-x-1"} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
                  </Switch>
                </td>

                <td className="px-4 py-2 text-gray-400 cursor-pointer">⋮</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
