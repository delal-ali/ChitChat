export const TypingIndicator = ({ name }) => {
  return (
    <div className="flex items-center gap-2 my-2 ml-12">
      <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-2xl rounded-bl-sm max-w-xs">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {name || "Someone"} is typing
        </span>
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
      </div>
    </div>
  );
};
