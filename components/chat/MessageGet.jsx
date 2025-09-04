"use client";
import { Image as ImageIcon } from "lucide-react";

export const MessageGet = ({ avatar, name, image, text, time }) => {
  return (
    <div className="flex items-start gap-2 my-3">
      <img
        src={avatar}
        alt={name}
        className="w-9 h-9 rounded-full"
      />
      <div className="max-w-xs">
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{name}</p>
        <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-2xl rounded-bl-sm">
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
          <span className="text-xs text-gray-500 block mt-1 text-right">{time}</span>
        </div>
      </div>
    </div>
  );
};
