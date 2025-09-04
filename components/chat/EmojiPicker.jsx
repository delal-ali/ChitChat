"use client";

import { useState } from "react";
import { Smile } from "lucide-react";

const emojis = [
  "😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇",
  "😍","🤩","😘","😗","😚","😋","😜","🤪","😎","🥳"
];

const EmojiSelector = ({ onSelect }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {open && (
        <div className="absolute bottom-10 right-0 z-10 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
          <div className="grid grid-cols-5 gap-2">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(emoji);
                  setOpen(false);
                }}
                className="flex items-center justify-center w-12 h-12 text-2xl rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Smile className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};
export default EmojiSelector;