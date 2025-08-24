import React, { useState, useEffect } from "react";
import AddEditMemberModal from "./AddEditMemberModal";
import { getMembers, deleteMember, toggleMemberAccess } from "../../services/memberManagementService";
import formatDate from "../../utils/formatDate";

export default function MemberListView() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => { fetchMembers(); }, []);

  const fetchMembers = async () => {
    const data = await getMembers();
    setMembers(Array.isArray(data) ? data : []);
  };

  const handleEdit = (member) => { setSelectedMember(member); setModalOpen(true); };
const handleDelete = async (member) => {
  await deleteMember(member._id);
  await fetchMembers();
};

const handleToggleAccess = async (member) => {
  if (!member.rooms || member.rooms.length === 0) return;
  const roomId = Array.isArray(member.rooms) ? member.rooms[0] : member.rooms;
  await toggleMemberAccess(roomId, member._id, !member.toggleAccess);
  await fetchMembers();
};


  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <button
          onClick={() => { setSelectedMember(null); setModalOpen(true); }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Member
        </button>
      </div>

      <div className="flex border-b border-gray-300 pb-2 mb-4 text-gray-600 font-medium">
        <div className="flex-1 pl-14">Name</div>
        <div className="w-32">Role</div>
        <div className="w-32">Status</div>
        <div className="w-32">Joined Date</div>
        <div className="w-40 text-right pr-4">Actions</div>
      </div>

      <div className="space-y-1">
        {members.map((m) => (
          <div key={m._id} className="flex justify-between items-center py-4 border-b border-gray-200">
            <div className="flex items-center space-x-4 pl-14 flex-1">
              <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <div className="font-medium text-gray-700">{m.name || "-"}</div>
                <div className="text-gray-500 text-sm">{Array.isArray(m.rooms) ? m.rooms.join(", ") : m.rooms || "No room"}</div>
              </div>
            </div>
            <div className="flex items-center text-gray-600">
              <div className="w-32">{m.role || "-"}</div>
              <div className="w-32">
                <span className={`px-2 py-1 rounded-full text-sm font-medium ${m.status === "online" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {m.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
              <div className="w-32 text-gray-500 text-sm">{m.joinedDate ? formatDate(m.joinedDate) : "-"}</div>
              <div className="w-40 text-right flex items-center justify-end space-x-2 pr-4">
                <button
                  onClick={() => handleEdit(m)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition"
                  title="Edit Member"
                >
                  <span className="material-icons text-base">edit</span>
                </button>
                <button
                  onClick={() => handleDelete(m)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition"
                  title="Delete Member"
                >
                  <span className="material-icons text-base">delete</span>
                </button>
                <button
                  onClick={() => handleToggleAccess(m)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${
                    m.toggleAccess
                      ? "bg-green-50 text-green-600 hover:bg-green-100"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } transition`}
                  title={m.toggleAccess ? "Unlock Access" : "Lock Access"}
                >
                  <span className="material-icons text-base">{m.toggleAccess ? "lock_open" : "lock"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <AddEditMemberModal member={selectedMember} onClose={() => setModalOpen(false)} onSave={fetchMembers} />
      )}
    </div>
  );
}
