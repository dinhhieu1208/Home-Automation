import React, { useState } from "react";

export default function AddMemberModal({ isOpen, onClose, onAdd }) {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleAdd = async () => {
    if (!name || !email) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);

    // gọi API gửi email invite
    const res = await fetch("/api/v1/users/invite", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Invitation sent to " + email);
      onAdd && onAdd();
      onClose();
    } else {
      const err = await res.json();
      alert(err.detail || "Error sending invitation");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 space-y-4">
        <h3 className="text-lg font-semibold">Add New Member</h3>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-2 py-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="w-full border px-2 py-1 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
