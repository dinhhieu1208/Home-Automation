import React, { useState, useEffect } from "react";
import AddEditMemberModal from "./AddEditMemberModal";
import ConfirmModal from "../../components/ConfirmModal";
import { getMembers, deleteMember, lockMember, unlockMember } from "../../services/memberManagementService";
import formatDate from "../../utils/formatDate";
import { toast } from "react-toastify";

export default function MemberListView() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const [profileMember, setProfileMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Không thể tải danh sách thành viên");
      setMembers([]);
    }
  };

  const normalizeId = (m) => {
    if (!m) return null;
    return String(m.id ?? m._id ?? (m._id && (m._id.$oid || String(m._id))));
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const handleDelete = (member) => {
    const memberId = normalizeId(member);
    if (!memberId) {
      toast.error("Không thể xóa: ID thành viên không hợp lệ");
      return;
    }

    setConfirmAction(() => async () => {
      try {
        await deleteMember(memberId);
        await fetchMembers();
        toast.success("Xóa thành viên thành công");
      } catch {
        toast.error("Xóa thành viên thất bại");
      }
    });

    setConfirmOpen(true);
  };

  const handleLockUnlock = (member) => {
    const memberId = normalizeId(member);
    if (!memberId) {
      toast.error("Không thể thực hiện: ID thành viên không hợp lệ");
      return;
    }

    setConfirmAction(() => async () => {
      try {
        if (member.active) {
          await lockMember(memberId);
          toast.success("Khóa tài khoản thành công");
        } else {
          await unlockMember(memberId);
          toast.success("Mở khóa tài khoản thành công");
        }
        await fetchMembers();
      } catch {
        toast.error("Thao tác thất bại");
      }
    });

    setConfirmOpen(true);
  };

  const handleShowProfile = async (memberId) => {
    try {
      const allMembers = await getMembers(); 
      const member = allMembers.find((m) => (m.id || m._id) === memberId);
      if (member) {
        setProfileMember(member);
        setProfileOpen(true);
      }
    } catch (err) {
      toast.error("Không thể tải profile");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Members</h1>
        <button
          onClick={() => {
            setSelectedMember(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Member
        </button>
      </div>

      <div className="flex border-b border-gray-300 pb-2 mb-4 text-gray-600 font-medium">
        <div className="flex-1 pl-14">Tên thành viên</div>
        <div className="w-32">Vai trò</div>
        <div className="w-32">Ngày tham gia</div>
        <div className="w-40 text-right pr-4">Hành động</div>
      </div>

      <div className="space-y-1">
        {members.map((m, idx) => {
          const memberId = normalizeId(m) || `idx-${idx}`;

          return (
            <div
              key={memberId}
              className="flex justify-between items-center py-4 border-b border-gray-200"
            >
              <div
                className="flex items-center space-x-4 pl-14 flex-1 cursor-pointer"
                onClick={() => handleShowProfile(memberId)}
              >
                <div className="relative">
                  <img
                    src={m?.avatar || "https://via.placeholder.com/40"}
                    alt={m?.name || "No name"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      m?.status === "online" ? "bg-green-600" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div>
                  <div className="font-medium text-gray-700">{m?.name || "-"}</div>
                  <div className="text-gray-500 text-sm">
                    {Array.isArray(m?.rooms) ? m.rooms.join(", ") : m?.rooms || "No room"}
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <div className="w-32">{m?.role || "-"}</div>
                <div className="w-32 text-gray-500 text-sm">
                  {m?.joinedDate ? formatDate(m.joinedDate) : "-"}
                </div>
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
                    onClick={() => handleLockUnlock(m)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition"
                    title={m?.active ? "Lock Account" : "Unlock Account"}
                  >
                    <span className="material-icons text-base">
                      {m?.active ? "person_off" : "person"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <AddEditMemberModal
          member={selectedMember}
          onClose={() => setModalOpen(false)}
          onSave={async () => {
            await fetchMembers();
            toast.success("Lưu thành viên thành công");
          }}
        />
      )}

      {confirmOpen && (
        <ConfirmModal
          open={confirmOpen}
          title="Confirm Action"
          message="Bạn có chắc chắn muốn thực hiện hành động này?"
          onConfirm={async () => {
            if (confirmAction) await confirmAction();
            setConfirmOpen(false);
          }}
          onCancel={() => setConfirmOpen(false)}
        />
      )}

      {profileOpen && profileMember && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setProfileOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center">
              <img
                src={profileMember.avatar || "https://via.placeholder.com/80"}
                alt={profileMember.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <div className="font-semibold text-lg">{profileMember.name}</div>
              <div className="text-gray-500 mb-2">{profileMember.role}</div>
              {profileMember.rooms && (
                <div className="text-gray-600 text-sm">
                  Rooms: {Array.isArray(profileMember.rooms) ? profileMember.rooms.join(", ") : profileMember.rooms}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
