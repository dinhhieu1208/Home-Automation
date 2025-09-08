import React, { useState } from "react";
import { addMember, updateMember } from "../../services/memberManagementService";

export default function AddEditMemberModal({ member, onClose, onSave }) {
  const [name, setName] = useState(member?.name || "");
  const [email, setEmail] = useState(member?.email || "");
  const [avatar, setAvatar] = useState(member?.avatar || "");
  const [role, setRole] = useState(member?.role || "Member");
  const [active, setActive] = useState(member?.active ?? true);
  const [selectedRooms, setSelectedRooms] = useState(member?.rooms || []);

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

    const formData = {
      name,
      email,
      avatar,
      role,
      active,
      rooms: selectedRooms,
    };

    try {
      const memberId = member?._id || member?.id;
      if (memberId) {
        await updateMember(memberId, formData);
      } else {
        await addMember(formData);
      }
      if (onSave) onSave();
      onClose();
    } catch (error) {
      console.error("Lỗi khi lưu thành viên:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {member ? "Edit Member" : "Add Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="Member">Member</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={active ? "true" : "false"}
                onChange={(e) => setActive(e.target.value === "true")}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              Rooms Access
            </p>
            <div className="grid grid-cols-2 gap-2">
              {rooms.map((r) => (
                <label key={r} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(r)}
                    onChange={() => handleRoomToggle(r)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm">{r}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
