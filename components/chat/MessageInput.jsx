"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import EmojiSelector  from "@/components/chat/EmojiPicker";
import { FileUploadButton } from "@/components/chat/FileUploadButton";

export const MessageInput = ({ onSend, onUpload }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 bg-transparent outline-none text-gray-900 dark:text-gray-100 px-3 py-2 rounded-full"
      />
      <EmojiSelector onSelect={(emoji) => setMessage(message + emoji)} />
      <FileUploadButton onUpload={onUpload} />
      <button
        onClick={handleSend}
        disabled={!message.trim()}
        className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition-colors ${
          message.trim()
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        <Send className="w-5 h-5 rotate-45" />
      </button>
    </div>
  );
};