"use client";
import { useEffect, useState } from "react";

export const ConversationItem = ({ conversation, onClick, isActive }) => {
  const { lastMessage, user } = conversation;

  return (
    <li
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
        isActive ? "bg-gray-700" : "hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      <img
        src="/default-avatar.png" // no profilePic in schema
        alt={user.username}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1 overflow-hidden">
        <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-200"}`}>
  {user.username}  // always the other user
</p>
<p className={`text-xs truncate ${isActive ? "text-gray-300" : "text-gray-400"}`}>
  {lastMessage.content || "No messages yet"}
</p>
      </div>
      <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
        {lastMessage
          ? new Date(lastMessage.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : ""}
      </span>
    </li>
  );
};
