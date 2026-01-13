import { useState } from "react";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useGetChatsQuery, useSendChatMutation } from "@/services/api/chats";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface User {
    id: string;
    user_name: string;
    email: string;
}

interface MessagesProps {
    selectedUser: User | null;
}

const Messages = ({ selectedUser }: MessagesProps) => {
    const [message, setMessage] = useState("");
    const currentUser = useSelector((state: RootState) => state.user);
    const currentUserId = currentUser.id || "";

    const { data: chatHistory, isLoading: loadingHistory } = useGetChatsQuery(selectedUser?.id || "", {
        skip: !selectedUser?.id,
    });

    const [sendChat] = useSendChatMutation();

    const handleSendMessage = async () => {
        if (!message.trim() || !selectedUser) return;

        const messageContent = message.trim();
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
            <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <p className="text-lg font-medium">No conversation selected</p>
                    <p className="text-sm mt-2">Search for a user to start chatting</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex-none h-16 border-b border-gray-200 px-6 flex items-center gap-3 bg-white">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {selectedUser.user_name.charAt(0).toUpperCase()}
                </div>
                <div className="font-semibold text-gray-900 truncate">
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
            <div className="flex-none border-t border-gray-200 bg-white p-4">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messages;