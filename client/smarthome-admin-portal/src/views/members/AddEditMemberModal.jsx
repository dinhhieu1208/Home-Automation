import React, { useState } from "react";
import { addMember, updateMember } from "../../services/memberManagementService";

export default function AddEditMemberModal({ member, onClose, onSave }) {
  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [avatar, setAvatar] = useState(member?.avatar || "");
  const [role, setRole] = useState(member?.role || "Member");
  const [status, setStatus] = useState(member?.status || "Active");
  const [selectedRooms, setSelectedRooms] = useState(member?.rooms || []);

  // Danh sách phòng hardcode
  const rooms = [
    "Toilet",
    "Master Bedroom",
    "Drying Yard",
    "Kitchen",
    "Bathroom",
    "Garden / Balcony",
    "Terrace",
    "Living Room",
    "Storage / Garage",
  ];

  const handleRoomToggle = (roomName) => {
    if (selectedRooms.includes(roomName)) {
      setSelectedRooms(selectedRooms.filter((r) => r !== roomName));
    } else {
      setSelectedRooms([...selectedRooms, roomName]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, avatar, role, status, rooms: selectedRooms };

    if (member) {
      await updateMember(member._id, payload);
    } else {
      await addMember(payload);
    }
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">
          {member ? "Edit Member" : "Add Member"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Avatar URL"
            className="w-full border p-2 rounded"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div>
            <p className="font-medium mb-1">Rooms Access:</p>
            <div className="flex flex-wrap gap-2">
              {rooms.map((r) => (
                <label key={r} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(r)}
                    onChange={() => handleRoomToggle(r)}
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
