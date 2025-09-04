export const OnlineStatusIndicator = ({ avatar, name, isOnline }) => {
  return (
    <div className="relative inline-block">
      <img
        src={avatar}
        alt={name}
        className="w-10 h-10 rounded-full"
      />
      <span
        className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-gray-900 ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
        title={isOnline ? "Online" : "Offline"}
      />
    </div>
  );
};
