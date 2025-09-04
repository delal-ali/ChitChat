"use client";
import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeade";
import { MessageGet } from "./MessageGet";
import { MessageSend } from "./MessageSend";
import { MessageInput } from "./MessageInput";

export const ChatWindow = ({ receiverId, userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const scrollRef = useRef();

  useEffect(() => {
    if (!token || !receiverId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
        const data = await res.json();

        const filtered = data.filter(
          (msg) =>
            (msg.senderId === userId && msg.receiver.username === receiverId) ||
            (msg.sender.username === receiverId && msg.receiverId === userId)
        );
        setMessages(filtered);
      } catch (err) {
        console.error("Fetch messages error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token, receiverId, userId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || !receiverId) return;

    try {
      setError(null);
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: text,
          senderId: userId,
          toUsername: receiverId,
        }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || `Failed to send message: ${res.status}`);
      }

      const data = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch (err) {
      console.error("Send message error:", err);
      setError(err.message);
    }
  };

  if (!receiverId) {
    return (
      <div className="flex-1 h-full flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-800 h-full">
      <ChatHeader
        className="min-h-[48px] p-4"
        avatar="/default-avatar.png"
        name={receiverId}
        subtitle="Online"
        isOnline={true}
      />
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
        style={{ maxHeight: "calc(100vh - 112px)" }} 
      >
        <>
          {loading && <p className="text-gray-400">Loading messages...</p>}
          {error && <p className="text-red-400">{error}</p>}
          {messages.length === 0 && !loading && !error && (
            <p className="text-gray-400">No messages yet</p>
          )}
          {messages.map((msg) =>
            msg.senderId === userId ? (
              <MessageSend
                key={msg.id}
                text={msg.content}
                time={new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                status="read"
              />
            ) : (
              <MessageGet
                key={msg.id}
                avatar="/default-avatar.png"
                name={msg.sender?.username || receiverId}
                text={msg.content}
                time={new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
            )
          )}
        </>
      </div>
      <div className="p-4 border-t border-gray-700 bg-gray-800 sticky bottom-0">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
};