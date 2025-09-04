"use client";
import { Upload } from "lucide-react";
import { useRef } from "react";

export const FileUploadButton = ({ onUpload }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleChange}
      />
      <button
        onClick={handleClick}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Upload className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
};
