"use client";
import ChatPage from "@/components/chat/ChatPage";
import { useParams } from "next/navigation";

export default function UserChatPage({ token }) {
  const params = useParams();        
  const userId = params.userId;      

  return <ChatPage userId={userId} token={token} />;
}
