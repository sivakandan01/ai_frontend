import { useState } from "react";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useGetChatsQuery, useSendChatMutation } from "@/services/api/chats";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import type { User } from "@/types/user";

interface MessagesProps {
    selectedUser: User | null;
    onToggleAi: (open: boolean) => void;
}

const Messages = ({ selectedUser, onToggleAi }: MessagesProps) => {
    const [message, setMessage] = useState("");
    const { userId: currentUserId } = useCurrentUser();

    const { data: chatHistory, isLoading: loadingHistory } = useGetChatsQuery(selectedUser?.id || "", {
        skip: !selectedUser?.id,
    });

    const [sendChat] = useSendChatMutation();

    const handleSendMessage = async () => {
        if (!message.trim() || !selectedUser) return;

        const messageContent = message.trim();

        if (messageContent.toLowerCase() === "@chat") {
            onToggleAi(true);
            setMessage("");
            return;
        }

        setMessage("");

        try {
            await sendChat({
                receiver_id: selectedUser.id,
                content: messageContent,
                is_user: true
            }).unwrap();
        } catch (err) {
            console.error("Failed to send message:", err);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    if (!selectedUser) {
        return (
            <div className="w-full h-full flex items-center justify-center text-[rgb(var(--secondary-text))] bg-[rgb(var(--main-surface))] transition-colors duration-300">
                <div className="text-center">
                    <p className="text-lg font-medium">No conversation selected</p>
                    <p className="text-sm mt-2">Search for a user to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[rgb(var(--main-surface))] transition-colors duration-300">
            {/* Chat Header */}
            <div className="flex-none h-16 border-b border-[rgb(var(--border-color))] px-6 flex items-center gap-3 bg-[rgb(var(--sidebar-bg))]">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[rgb(var(--button-primary))] flex items-center justify-center text-white font-semibold flex-shrink-0 shadow-sm">
                    {selectedUser.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="font-semibold text-[rgb(var(--primary-text))] truncate">
                    {selectedUser.user_name}
                </div>
            </div>

            <MessageList
                messages={(chatHistory as any) || []}
                isLoading={loadingHistory}
                currentUserId={currentUserId}
                onRetry={(messageId) => {
                    console.log("Retrying message:", messageId);
                }}
            />

            {/* Footer - Input Area */}
            <div className="flex-none border-t border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] p-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(var(--focus-ring))] text-[rgb(var(--primary-text))] placeholder-[rgb(var(--secondary-text))] transition-all"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-[rgb(var(--button-primary))] text-white rounded-lg hover:opacity-90 disabled:bg-[rgb(var(--button-secondary))] disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;