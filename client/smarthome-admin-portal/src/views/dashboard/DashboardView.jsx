import React, { useEffect, useState } from "react";
import {
  Wifi,
  Tv,
  Thermometer,
  Lightbulb,
  Wind,
  Power,
  Fan,
  Droplets,
  Shield,
  DoorClosed,
  Router,
  Camera,
  WashingMachine,
  Flame,
  Sun,
  Waves,
  CloudRain,
  Sprout,
  Heater,
  Unlock,
  Lock,
  Blinds,
  AirVent,
  Cctv,
} from "lucide-react";

import { getRooms, toggleDevice } from "../../services/roomService";
import { getMembers } from "../../services/memberService";
import { getNotifications } from "../../services/notificationService";
import PowerChart from "../../components/PowerChart";

import illustration from "../../assets/images/illustration.gif";
import livingRoom from "../../assets/images/camera_living.png";
import kitchen from "../../assets/images/Camera CCTV.png";
import bedroom from "../../assets/images/camera_bedroom.png";

export default function DashboardView() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getRooms()
      .then((data) => {
        setRooms(data);
        if (data.length > 0) setSelectedRoom(data[0]);
      })
      .catch(console.error);
    getMembers().then(setMembers).catch(console.error);
    getNotifications().then(setNotifications).catch(console.error);
  }, []);

  const handleToggle = async (device) => {
    try {
      const res = await toggleDevice(device.id);
      setRooms((prev) =>
        prev.map((r) =>
          r.id === selectedRoom.id
            ? {
                ...r,
                devices: r.devices.map((d) =>
                  d.id === device.id ? { ...d, status: res.status } : d
                ),
              }
            : r
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  function Member({ avatar, name, role }) {
    return (
      <div className="flex flex-col items-center">
        <img
          src={avatar || "/src/assets/images/user1.png"}
          alt={name}
          className="w-12 h-12 rounded-full"
        />
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    );
  }

  const deviceIcons = {
    light: Lightbulb,
    tv: Tv,
    smartTV: Tv,
    wifi: Wifi,
    router: Router,
    airConditioner: AirVent,
    heater: Heater,
    smartFan: Fan,
    fan: Fan,
    airpurifier: Wind,
    humiditySensor: Thermometer,
    waterSensor: Droplets,
    gasSensor: Flame,
    motionSensor: Shield,
    lightSensor: Sun,
    rainSensor: CloudRain,
    soilMoistureSensor: Sprout,
    doorSensor: DoorClosed,
    pump: Waves,
    washingMachine: WashingMachine,
    curtain: Blinds,
    camera: Camera,
    cctv: Cctv,
  };

  function DeviceCard({ device, onToggle }) {
    const Icon = deviceIcons[device.type] || Power;
    const handleClick = () => onToggle(device);

    return (
      <div
        className={`bg-white p-4 rounded-xl shadow flex flex-col items-center justify-between cursor-pointer w-40 h-40 ${
          device.status === "on" ? "border border-indigo-500 bg-indigo-50" : ""
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-xs font-semibold">
            {device.status === "on" ? "on" : "off"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={device.status === "on"}
              onChange={handleClick}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>
        <Icon
          className={`w-10 h-10 ${
            device.status === "on" ? "text-indigo-600" : "text-gray-400"
          }`}
        />
        <p
          className={`text-sm font-semibold ${
            device.status === "on" ? "text-indigo-600" : "text-gray-600"
          }`}
        >
          {device.name}
        </p>
      </div>
    );
  }

  function CameraCard({ name, camera, image }) {
    return (
      <div className="bg-white rounded-xl shadow overflow-hidden w-40">
        <div className="relative">
          <img src={image} alt={name} className="w-full h-24 object-cover" />
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1 rounded">
            {camera}
          </span>
        </div>
        <p className="text-center text-sm font-semibold py-2">{name}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Hello, Admin!</h2>
              <p className="text-gray-500 mt-1">
                Welcome home, air quality is good and Fresh. Take a walk and have coffee.
              </p>
              <div className="mt-4 flex gap-3">
                <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Locked
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2">
                  <Unlock className="w-4 h-4" /> Unlock
                </button>
              </div>
            </div>
            <img src={illustration} alt="Illustration" className="w-52 h-32" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Rooms</h3>
              {selectedRoom && (
                <div className="text-sm text-gray-500 flex gap-4 items-center">
                  <span>💧 78%</span>
                  <span>🌡️ 25°C</span>
                  <select
                    className="border rounded px-2 py-1"
                    value={selectedRoom.name}
                    onChange={(e) =>
                      setSelectedRoom(rooms.find((r) => r.name === e.target.value))
                    }
                  >
                    {rooms.map((r) => (
                      <option key={r.id} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-4 mb-4 flex-wrap">
              {selectedRoom?.devices.map((d) => (
                <DeviceCard key={d.id} device={d} onToggle={handleToggle} />
              ))}
              <button className="w-40 h-40 bg-gray-100 rounded-xl shadow flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-indigo-600 font-semibold">+ Add new</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="bg-white p-6 rounded-2xl shadow flex-1 space-y-4">
              <h3 className="text-lg font-semibold mb-3">Camera</h3>
              <div className="flex gap-5 flex-wrap">
                <CameraCard name="Living Room" camera="Camera 1" image={livingRoom} />
                <CameraCard name="Kitchen" camera="Camera 2" image={kitchen} />
                <CameraCard name="Master BedRoom" camera="Camera 3" image={bedroom} />
              </div>
            </div>
            <div className="bg-[#6B6BF9] p-6 rounded-2xl shadow flex flex-col items-center text-center w-52">
              <div className="bg-white p-2 rounded-md mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Need help?</h4>
              <p className="text-sm text-white mb-4">
                Contact our highly trained personal for help
              </p>
              <button className="bg-white text-black px-4 py-2 rounded-lg text-sm shadow">
                Contact Service
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <ul className="space-y-4">
              {notifications
                .sort(() => 0.5 - Math.random())
                .slice(0, 3)
                .map((n) => (
                  <li
                    key={n.id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-icons text-indigo-600 text-lg">{n.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{n.message}</p>
                        {n.user && (
                          <div className="flex items-center gap-2 mt-1">
                            <img
                              src={n.user.avatar}
                              alt={n.user.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-xs text-gray-500">{n.user.name}</span>
                          </div>
                        )}
                        {n.profile && (
                          <div className="flex items-center gap-2 mt-1">
                            <img
                              src={n.profile.avatar}
                              alt={n.profile.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <a
                              href={n.profile.link}
                              className="text-xs text-indigo-600 font-semibold"
                            >
                              {n.profile.name}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    {n.actions?.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {n.actions.map((a, idx) => (
                          <button
                            key={idx}
                            className={`px-3 py-1 rounded text-sm font-medium ${
                              a.style === "primary"
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            onClick={() => console.log(`Action: ${a.action}`)}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Members</h3>
              <button className="px-3 py-1 border rounded-lg text-sm">+ Add new</button>
            </div>
            <div className="flex gap-4 flex-wrap">
              {members.map((m) => (
                <Member key={m.id} avatar={m.avatar} name={m.name} role={m.role} />
              ))}
            </div>
          </div>
          <PowerChart />
        </div>
      </div>
    </>
  );
}
