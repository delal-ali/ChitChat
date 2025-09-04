import { Phone, Video, Info } from "lucide-react";
import { OnlineStatusIndicator } from "./OnlineStatusIndicator";

export const ChatHeader = ({ avatar, name, subtitle, isOnline }) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <OnlineStatusIndicator avatar={avatar} name={name} isOnline={isOnline} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</span>
          {subtitle && <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Video className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
          <Info className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};
