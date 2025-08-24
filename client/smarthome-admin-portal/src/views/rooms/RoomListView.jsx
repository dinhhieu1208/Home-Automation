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
  Blinds,
  AirVent,
  Cctv,
} from "lucide-react";

import { getRooms, toggleDevice, getRoomAccess } from "../../services/roomService";
import livingRoomImg from "../../assets/images/camera_living.png";
import AddRoomModal from "../../components/AddRoomModal"; // import popup

export default function RoomListView() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [members, setMembers] = useState([]);
  const [showAddRoomModal, setShowAddRoomModal] = useState(false); // state popup

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      loadMembers(selectedRoom.id);
    }
  }, [selectedRoom]);

  const loadRooms = async () => {
    const data = await getRooms();
    setRooms(data);
    if (data.length > 0) setSelectedRoom(data[0]);
  };

  const loadMembers = async (roomId) => {
    const data = await getRoomAccess(roomId);
    setMembers(data);
  };

  const handleToggle = async (deviceId) => {
    await toggleDevice(deviceId);
    await loadRooms();
  };

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
    const handleClick = () => onToggle(device.id);

    return (
      <div
        className={`bg-white p-4 rounded-xl shadow flex flex-col items-center justify-between cursor-pointer w-40 h-40 ${
          device.status === "on" ? "border border-indigo-500 bg-indigo-50" : ""
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <span className="text-xs font-semibold">{device.status === "on" ? "on" : "off"}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={device.status === "on"} className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 
              after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
              after:bg-white after:border after:rounded-full after:h-4 after:w-4 
              after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
        </div>

        <Icon className={`w-10 h-10 ${device.status === "on" ? "text-indigo-600" : "text-gray-400"}`} />
        <p className={`text-sm font-semibold ${device.status === "on" ? "text-indigo-600" : "text-gray-600"}`}>
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
    <div className="flex gap-6">
      <div className="flex-1">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 flex-wrap">
            {rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                  ${selectedRoom?.id === room.id 
                    ? "bg-indigo-600 text-white shadow-md" 
                    : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`}
              >
                {room.name}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-1 px-2 py-1 rounded-md text-white text-xs bg-blue-600 shadow-md hover:shadow-lg transition-all duration-200 whitespace-nowrap -mt-10"
            onClick={() => setShowAddRoomModal(true)} // mở popup
          >
            <span className="text-sm font-bold">+</span>
            Add Room
          </button>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-gray-600">
          <span>💧 78%</span>
          <span>🌡️ 25°C</span>
        </div>

        <div className="flex gap-4 flex-wrap mb-4">
          {selectedRoom?.devices?.map((d) => (
            <DeviceCard key={d.id} device={d} onToggle={handleToggle} />
          ))}
          <div className="w-40 h-40 flex items-center justify-center border-2 border-dashed rounded-lg text-indigo-500 cursor-pointer">
            + Add new
          </div>
        </div>
      </div>

      <div className="w-96 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <img src={livingRoomImg} alt="Living Room" className="rounded-lg mb-2" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Zoom</span>
            <input type="range" className="flex-1 mx-2" />
            <div className="flex gap-2">
              <button>
                <span className="material-symbols-outlined text-gray-500 text-2xl">mic</span>
              </button>
              <button>
                <span className="material-icons text-gray-500 text-2xl">volume_up</span>
              </button>
              <button>
                <span className="material-icons text-gray-500 text-2xl">power_settings_new</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Accessible Members</h4>
            <button className="bg-gray-200 flex items-center justify-center text-indigo-500 text-sm">+ Add new</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {members.map((m) => (
              <div key={m.id} className="flex flex-col items-center text-xs">
                <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full" />
                <span>{m.name}</span>
                <span className="text-gray-400">{m.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Recent Activity</h4>
            <button className="text-indigo-500 text-sm">View All</button>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            {selectedRoom?.activities?.map((act, idx) => (
              <li key={idx}>{act.text}</li>
            ))}
          </ul>
        </div>
      </div>

{showAddRoomModal && (
  <AddRoomModal
    isOpen={showAddRoomModal}
    onClose={() => setShowAddRoomModal(false)}
    onRoomCreated={loadRooms} // để reload phòng sau khi tạo
  />
)}

    </div>
  );
}
