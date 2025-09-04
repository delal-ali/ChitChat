"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/chat/ChatSidebar";
import { ChatWindow } from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const t = localStorage.getItem("token");
    const u = JSON.parse(localStorage.getItem("user"));
    if (t && u) {
      setToken(t);
      setUser(u);
      setUserId(u.id);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Loading chat...
      </div>
    );
  }

  if (!token || !userId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        You must be logged in to access chat
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="flex-shrink-0 border-r border-gray-700">
        <Sidebar
          userId={userId}
          token={token}
          user={user}
          activeConversation={activeConversation}
          onSelectConversation={setActiveConversation}
        />
      </div>

      <div className="flex-1 h-full">
        <ChatWindow
          receiverId={activeConversation}
          userId={userId}
          token={token}
        />
      </div>
    </div>
  );
}
