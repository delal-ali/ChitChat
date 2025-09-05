"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";

export function Features() {
  return (
    <div className='mt-0 my-0'>
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={features} />
    </div>
    </div>
  );
}

export const features = [
  {
    title: "Instant Messaging",
    description:
      "Send and receive messages instantly with friends or groups, keeping everyone connected in real-time.",
  },
  {
    title: "Group Chats",
    description:
      "Create group conversations with multiple people, making collaboration and discussion easy and fun.",
  },
  {
    title: "Media Sharing",
    description:
      "Share photos, videos, and files directly within chats without switching apps or platforms.",
  },
  {
    title: "Custom Emojis & Stickers",
    description:
      "Express yourself with custom emojis, GIFs, and stickers tailored for your chats.",
  },
  {
    title: "Secure & Private",
    description:
      "All messages are end-to-end encrypted, ensuring your conversations stay private and safe.",
  },
  {
    title: "Cross-Platform",
    description:
      "Access your chats on web, mobile, or desktop seamlessly, keeping you connected wherever you are.",
  },
];
