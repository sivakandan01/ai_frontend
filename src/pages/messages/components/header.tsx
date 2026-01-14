import SearchBar from "@/components/custom/searchBar";
import { ThemeToggle } from "@/components/common";

import { Sparkles } from "lucide-react";

import type { User } from "@/types/user";

interface MessageHeaderProps {
    onUserSelect: (user: User) => void;
    isAiOpen: boolean;
    onToggleAi: () => void;
}

const MessageHeader = ({ onUserSelect, isAiOpen, onToggleAi }: MessageHeaderProps) => {
    return (
        <div className="h-[60px] w-full flex items-center px-6 bg-[rgb(var(--main-surface))] border-b border-[rgb(var(--border-color))] transition-colors duration-300">
            <div className="flex-1 flex justify-center">
                <SearchBar onUserSelect={onUserSelect} />
            </div>
            <div className="flex items-center gap-4 ml-4">
                <button
                    onClick={onToggleAi}
                    className={`p-2 rounded-lg transition-all duration-200 ${isAiOpen
                        ? "bg-[rgb(var(--primary-color))] text-white shadow-md shadow-[rgb(var(--primary-color))/0.2]"
                        : "hover:bg-[rgb(var(--hover-bg))] text-[rgb(var(--text-secondary))]"
                        }`}
                    title={isAiOpen ? "Close AI Assistant" : "Open AI Assistant"}
                >
                    <Sparkles className={`w-5 h-5 ${isAiOpen ? "animate-pulse" : ""}`} />
                </button>
                <ThemeToggle />
            </div>
        </div>
    );
};

export default MessageHeader;
