import React, { useState, useEffect } from "react";
import { getConversations, getMessages, sendMessage } from "../../services/chatServices";
import { useAuth } from "../../contexts/AuthContext";

const MessageView = () => {
  const auth = useAuth();
  const currentUser = auth?.currentUser;

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Nếu user chưa load xong thì show loading
  if (!currentUser) {
    return <div className="p-4">Loading user...</div>;
  }

  const token = localStorage.getItem("token"); // lấy token nếu cần cho API

  // Load conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const convs = await getConversations(currentUser._id, token);
        setConversations(convs);
        if (convs.length > 0) setSelectedChat(convs[0]);
      } catch (err) {
        console.error("Error loading conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [currentUser, token]);

  // Load messages khi chọn conversation
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      try {
        const msgs = await getMessages(selectedChat._id, token);
        setMessages(msgs);
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    };

    fetchMessages();
  }, [selectedChat, token]);

  // Gửi tin nhắn
  const handleSend = async () => {
    if (!newMessage.trim() || !selectedChat || !currentUser) return;

    try {
      const sentMsg = await sendMessage(
        {
          conversationId: selectedChat._id,
          senderId: currentUser._id,
          text: newMessage,
          attachments: [],
        },
        token // truyền token nếu API cần
      );
      setMessages([...messages, sentMsg]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="flex h-screen border border-gray-300 rounded-lg overflow-hidden">
      {/* LEFT: Conversations */}
      <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 font-bold text-lg">Chats</div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat) => (
            <div
              key={chat._id}
              className={`p-4 cursor-pointer hover:bg-gray-100 ${
                selectedChat?._id === chat._id ? "bg-gray-200" : ""
              }`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="font-semibold">{chat.name || "Unnamed Group"}</div>
              <div className="text-sm text-gray-600 truncate">
                {chat.lastMessage?.text || "No messages yet"}
              </div>
              <div className="text-xs text-gray-400">
                {chat.updatedAt ? new Date(chat.updatedAt).toLocaleTimeString() : ""}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Messages */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {selectedChat && (
          <div className="p-4 border-b border-gray-200 bg-white">
            <h2 className="font-semibold">{selectedChat.name}</h2>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${msg.senderId === currentUser._id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.senderId === currentUser._id
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p>{msg.text}</p>
                <span className="block text-xs mt-1 text-gray-400">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString() : ""}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
