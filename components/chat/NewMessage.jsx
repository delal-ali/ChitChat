"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const NewMessage = ({ token, onConversationCreated }) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (ev) => {
    ev.preventDefault();
    setError("");

    if (!username.trim()) return setError("Username is required");
    if (!content.trim()) return setError("Message cannot be empty");

    try {
      setLoading(true);

      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          toUsername: username.trim(),
          content: content.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "User not found or message failed");
        return;
      }

      // Notify parent (Sidebar) that a new conversation exists
      onConversationCreated?.(data.receiver.id);

      // Clear input
      setUsername("");
      setContent("");
      setOpen(false);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Icon button to toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-gray-600 rounded-full text-white"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Collapsible form */}
      {open && (
        <div className="absolute left-full ml-2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50">
          <h3 className="text-sm font-semibold mb-2">New Message</h3>
          <form onSubmit={handleSend} className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-2 py-1 rounded bg-gray-700 text-white focus:outline-none"
            />
            <textarea
              placeholder="Type a message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="px-2 py-1 rounded bg-gray-700 text-white focus:outline-none resize-none"
              rows={3}
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded transition-colors"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
