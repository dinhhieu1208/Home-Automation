import React, { useState, useEffect } from "react";
import {
  Lightbulb, Tv, Fan, Camera, Heater, AirVent, WashingMachine, Blinds
} from "lucide-react";

import { createRoom } from "../services/roomService";
import { getMembers } from "../services/memberService";
import Toast from "./Toast";

const DEVICE_ICONS = { 
  light: Lightbulb, 
  tv: Tv,   
  fan: Fan, 
  camera: Camera, 
  heater: Heater, 
  ac: AirVent,      
  wm: WashingMachine, 
  curtain: Blinds 
};

export default function AddRoomModal({ onClose }) {
  const [roomName, setRoomName] = useState("");
  const [roomDesc, setRoomDesc] = useState("");
  const [deviceStates, setDeviceStates] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    loadMembers();
    const initialStates = {};
    Object.keys(DEVICE_ICONS).forEach(type => initialStates[type] = false);
    setDeviceStates(initialStates);
  }, []);

  const loadMembers = async () => {
    try {
      const members = await getMembers();
      setAllUsers(members);
    } catch (error) {
      console.error("Failed to load members:", error);
      showToast("Failed to load members", "error");
    }
  };

  const toggleDevice = (type) => {
    setDeviceStates({ ...deviceStates, [type]: !deviceStates[type] });
  };

  const toggleUser = (user) => {
    if (selectedUsers.find(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim() || !roomDesc.trim()) {
      showToast("Please enter room name and description", "error");
      return;
    }

    const selectedDeviceTypes = Object.keys(deviceStates).filter(type => deviceStates[type]);
    if (selectedDeviceTypes.length === 0) {
      showToast("Please select at least one device", "error");
      return;
    }

    if (selectedUsers.length === 0) {
      showToast("Please select at least one member", "error");
      return;
    }

    const devices = Object.keys(deviceStates).map(type => ({
      type,
      name: type,
      status: deviceStates[type] ? "on" : "off"
    }));

    const roomData = { name: roomName, description: roomDesc, devices, members: selectedUsers };

    try {
      setLoading(true);
      await createRoom(roomData);
      showToast("Room created successfully!", "success");

      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Failed to create room:", error);
      showToast("Failed to create room", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-xl p-6 w-2/3 max-w-3xl flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-indigo-700">Create New Room</h2>

          <input 
            type="text" 
            placeholder="Room Name" 
            value={roomName} 
            onChange={(e)=>setRoomName(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400" 
          />

          <textarea 
            placeholder="Description" 
            value={roomDesc} 
            onChange={(e)=>setRoomDesc(e.target.value)}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400" 
          />

          <div>
            <h4 className="font-semibold mb-2 text-indigo-600">Devices</h4>
            <div className="flex flex-wrap gap-2">
              {Object.keys(DEVICE_ICONS).map((type) => {
                const Icon = DEVICE_ICONS[type];
                const isOn = deviceStates[type];
                return (
                  <div 
                    key={type} 
                    className={`flex flex-col items-center justify-center w-20 h-20 rounded-lg cursor-pointer transition-all border 
                      ${isOn ? "bg-indigo-100 border-indigo-400" : "bg-gray-100 border-gray-300"} hover:scale-105`}
                    onClick={() => toggleDevice(type)}
                  >
                    <Icon className={`w-8 h-8 mb-1 ${isOn ? "text-indigo-600" : "text-gray-500"}`} />
                    <span className="text-xs font-semibold text-center break-words w-full">{type}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-indigo-600">Members</h4>
            <div className="flex gap-2 flex-wrap">
              {allUsers.map(u => (
                <div 
                  key={u.id} 
                  className={`flex flex-col items-center text-xs p-2 rounded cursor-pointer border transition-all
                    ${selectedUsers.find(s => s.id === u.id) ? "bg-indigo-100 border-indigo-400" : "bg-gray-100 border-gray-300"} hover:scale-105`}
                  onClick={() => toggleUser(u)}
                >
                  <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full mb-1" />
                  <span>{u.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-200">Cancel</button>
            <button 
              onClick={handleCreateRoom} 
              disabled={loading}
              className={`px-4 py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </>
  )
}
