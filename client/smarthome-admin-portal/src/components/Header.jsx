import React, { useState, useEffect } from "react";
import { Search, MoreVertical } from "lucide-react";
import { useProfile } from "../hooks/useProfile";
import { saveProfile } from "../services/profileService";

export default function Header() {
  const { profile, setProfile } = useProfile();
  const [popupOpen, setPopupOpen] = useState(false);
  const [editing, setEditing] = useState(false); 
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.name || "",
        email: profile.email || "",
        avatar: profile.avatar || "",
      });
    }
  }, [profile]);

  const handleUpdate = () => setEditing(true);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updated = await saveProfile(formData);
      setProfile(updated);
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!profile) return null;

  return (
    <header className="h-16 bg-white shadow flex items-center px-6">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-600">Home Automation</h1>
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="flex items-center bg-gray-200 px-3 py-1 rounded-lg w-full max-w-md border border-gray-300">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent px-2 w-full text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 min-w-[120px] relative">
        <img
          src={profile.avatar}
          alt="user"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setPopupOpen(!popupOpen)}
        />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-gray-600">{profile.name}</span>
          <button className="p-1 rounded hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
{popupOpen && (
  <div className="absolute right-0 top-14 w-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden">
    {/* Header Gradient */}
    <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-4 flex flex-col items-center">
      <div className="relative">
        <img
          src={formData.avatar || "/default-avatar.png"}
          alt="user"
          className="w-16 h-16 rounded-full border-4 border-white"
        />
      </div>
      <h3 className="text-white font-semibold mt-2">{formData.full_name}</h3>
      <p className="text-indigo-200 text-sm">{profile.role}</p>
    </div>

    {/* Body */}
    <form onSubmit={handleSave} className="flex flex-col gap-3 p-4">
      <input
        type="text"
        placeholder="Full Name"
        value={formData.full_name}
        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
        className={`border px-3 py-2 rounded-lg text-sm w-full transition ${
          editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200 cursor-not-allowed"
        }`}
        disabled={!editing}
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className={`border px-3 py-2 rounded-lg text-sm w-full transition ${
          editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200 cursor-not-allowed"
        }`}
        disabled={!editing}
      />
      <input
        type="text"
        placeholder="Avatar URL"
        value={formData.avatar}
        onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
        className={`border px-3 py-2 rounded-lg text-sm w-full transition ${
          editing ? "bg-white border-gray-300" : "bg-gray-100 border-gray-200 cursor-not-allowed"
        }`}
        disabled={!editing}
      />

      <div className="flex gap-2 mt-2">
        {!editing ? (
          <button
            type="button"
            onClick={handleUpdate}
            className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
        )}
        <button
          type="button"
          onClick={() => { setPopupOpen(false); setEditing(false); }}
          className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

      </div>
    </header>
  );
}
