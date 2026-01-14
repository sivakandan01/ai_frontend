import { useGetConversationsQuery } from "@/services/api/chats";
import { Loader2 } from "lucide-react";

interface User {
    id: string;
    user_name: string;
    email: string;
}

interface MessageSidebarProps {
    onUserSelect: (user: User) => void;
    selectedUserId: string | null;
}

const MessageSidebar = ({ onUserSelect, selectedUserId }: MessageSidebarProps) => {
    const { data: conversations = [], isLoading } = useGetConversationsQuery();
    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-[rgb(var(--sidebar-bg))] flex flex-col transition-colors duration-300">
            <div className="p-4 border-b border-[rgb(var(--border-color))]">
                <h2 className="text-sm font-semibold text-[rgb(var(--secondary-text))] uppercase tracking-wider">
                    Recent Chats
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        onClick={() => onUserSelect({
                            id: conv.id,
                            user_name: conv.user_name,
                            email: conv.email
                        })}
                        className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${selectedUserId === conv.id
                            ? "bg-[rgb(var(--hover-bg))] rounded-xl"
                            : "hover:bg-[rgb(var(--hover-bg))] rounded-xl"
                            }`}
                    >
                        {/* Avatar */}
                        <div className="w-10 h-10 rounded-full bg-[rgb(var(--button-primary))] flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm">
                            {conv.user_name.charAt(0).toUpperCase()}
                        </div>
                        {/* Preview Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <div className="font-medium text-[rgb(var(--primary-text))] truncate">
                                    {conv.user_name}
                                </div>
                                <div className="text-[10px] text-[rgb(var(--secondary-text))]">
                                    {new Date(conv.last_message_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            <div className="text-xs text-[rgb(var(--secondary-text))] truncate">
                                {conv.last_message}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageSidebar;