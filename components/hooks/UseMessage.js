"use client";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

let socket;

const getConversationId = (senderId, receiverId) =>
  [senderId, receiverId].sort().join("_");

export const useMessages = (receiverId, userId, token) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const conversationRef = useRef(getConversationId(userId, receiverId));

  useEffect(() => {
    if (!receiverId || !token || !userId) return;

    conversationRef.current = getConversationId(userId, receiverId);

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data?.message || "Failed to fetch messages");
        }

        const data = await res.json();

      
        const filteredMessages = data.filter((msg) => {
          const convId = getConversationId(msg.senderId, msg.receiverId);
          return convId === conversationRef.current;
        });

        setMessages(filteredMessages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Initialize socket if not already
    if (!socket) socket = io("/"); // Use your Socket.IO server URL if needed

    const handleNewMessage = (message) => {
      const convId = getConversationId(message.senderId, message.receiverId);
      if (convId === conversationRef.current) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [receiverId, token, userId]);

  const sendMessage = async (text) => {
    if (!receiverId || !text.trim() || !token) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ senderId: userId, receiverId, content: text }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.message || "Failed to send message");
      }

      const savedMessage = await res.json();
      setMessages((prev) => [...prev, savedMessage]);
      socket.emit("sendMessage", savedMessage);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError(err.message);
    }
  };

  return { messages, loading, sendMessage, error };
};
