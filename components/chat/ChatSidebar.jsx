"use client";
import { useState, useEffect } from "react";
import { NewMessage } from "./NewMessage";

export const Sidebar = ({
  userId,
  token,
  user,
  activeConversation,
  onSelectConversation,
}) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const messages = await res.json();
        if (!res.ok) return;

        const grouped = messages.reduce((acc, msg) => {
          const otherUser =
            msg.senderId === userId
              ? msg.receiver.username
              : msg.sender.username;
          if (!acc[otherUser]) {
            acc[otherUser] = [];
          }
          acc[otherUser].push(msg);
          return acc;
        }, {});

        let conversationList = Object.keys(grouped).map((otherUser) => {
          const msgs = grouped[otherUser];
          const latestMessage = msgs.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )[0];
          return {
            user: otherUser,
            lastMessage: latestMessage.content,
            timestamp: latestMessage.timestamp,
          };
        });

        // ✅ sort conversations by latest timestamp (newest first)
        conversationList = conversationList.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        setConversations(conversationList);
      } catch (err) {
        console.error("Error fetching conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token, userId]);

  return (
    <div className="w-64 bg-gray-800 h-full p-4 overflow-y-auto flex flex-col">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          Welcome, {user?.username}
        </h2>
      </div>
      <div className="flex-1">
        {loading && <p className="text-gray-400">Loading conversations...</p>}
        {conversations.map((conv) => (
          <div
            key={conv.user}
            className={`p-3 mb-2 rounded-lg cursor-pointer ${
              activeConversation === conv.user ? "bg-gray-700" : "bg-gray-800"
            } hover:bg-gray-600`}
            onClick={() => onSelectConversation(conv.user)}
          >
            <div className="flex justify-between">
              <span className="text-white font-medium">{conv.user}</span>
              <span className="text-gray-400 text-sm">
                {new Date(conv.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-gray-300 text-sm truncate">{conv.lastMessage}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <NewMessage
          token={token}
          onConversationCreated={onSelectConversation}
        />
      </div>
    </div>
  );
};
