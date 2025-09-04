"use client";
import { Check, CheckCheck } from "lucide-react";

export const MessageSend = ({ text, image, time, status }) => {
  return (
    <div className="flex justify-end my-3">
      <div className="max-w-xs">
        <div className="bg-blue-500 text-white px-3 py-2 rounded-2xl rounded-br-sm">
          {image && (
            <div className="mb-2">
              <img
                src={image}
                alt="sent"
                className="w-full max-h-60 rounded-lg object-cover"
              />
            </div>
          )}
          {text && <p>{text}</p>}
          <div className="flex items-center justify-end gap-1 mt-1">
            <span className="text-xs opacity-80">{time}</span>
            {status === "sent" && <Check className="w-4 h-4 opacity-80" />}
            {status === "delivered" && <CheckCheck className="w-4 h-4 opacity-80" />}
            {status === "read" && <CheckCheck className="w-4 h-4 text-blue-300" />}
          </div>
        </div>
      </div>
    </div>
  );
};
