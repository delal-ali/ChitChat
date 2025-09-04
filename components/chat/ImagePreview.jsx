
import { X } from "lucide-react";

export const ImgPreview = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <div className="relative w-48 h-48 rounded-lg overflow-hidden shadow-lg">
      <img
        src={src}
        alt="Preview"
        className="w-full h-full object-cover"
      />
      <button
        onClick={onClose}
        className="absolute top-1 right-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <X className="w-4 h-4 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};
