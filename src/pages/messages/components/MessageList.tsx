import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import { type ChatMessage } from "@/services/api/chats";

interface MessageListProps {
    messages: ChatMessage[];
    isLoading: boolean;
    currentUserId: string;
    onRetry?: (messageId: string) => void;
}

interface MessageGroup {
    date: string;
    messages: ChatMessage[];
}

const MessageList = ({ messages, isLoading, currentUserId, onRetry }: MessageListProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isUserScrolling, setIsUserScrolling] = useState(false);

    const formatDateHeader = (dateString: string) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            });
        }
    };

    const groupMessagesByDate = (messages: ChatMessage[]): MessageGroup[] => {
        const groups: Record<string, ChatMessage[]> = {};

        messages.forEach(msg => {
            const dateKey = new Date(msg.created_at).toDateString();
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(msg);
        });

        return Object.entries(groups).map(([date, msgs]) => ({
            date: formatDateHeader(date),
            messages: msgs,
        }));
    };

    const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior });
        }
    };

    const handleScroll = () => {
        if (!containerRef.current) return;

        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;

        setIsUserScrolling(!isAtBottom);
    };

    useEffect(() => {
        if (!isUserScrolling) {
            scrollToBottom('smooth');
        }
    }, [messages, isUserScrolling]);

    useEffect(() => {
        scrollToBottom('auto');
    }, []);

    const messageGroups = groupMessagesByDate(messages);

    if (isLoading) {
        return (
            <div className="flex-1 overflow-y-auto p-6 bg-[rgb(var(--main-surface))]">
                <div className="flex items-center justify-center h-full">
                    <div className="text-[rgb(var(--secondary-text))]">Loading messages...</div>
                </div>
            </div>
        );
    }

    if (messages.length === 0) {
        return (
            <div className="flex-1 overflow-y-auto p-6 bg-[rgb(var(--main-surface))]">
                <div className="flex items-center justify-center h-full text-[rgb(var(--secondary-text))]">
                    <p>No messages yet. Start the conversation!</p>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 bg-[rgb(var(--main-surface))] scrollbar-hide"
        >
            {messageGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                    {/* Date Header */}
                    <div className="flex justify-center my-4">
                        <span className="px-3 py-1 text-xs text-[rgb(var(--secondary-text))] bg-[rgb(var(--hover-bg))] border border-[rgb(var(--border-color))] rounded-full">
                            {group.date}
                        </span>
                    </div>

                    {/* Messages in this date group */}
                    {group.messages.map((message, index) => (
                        <MessageBubble
                            key={message.id || `${message.created_at}-${index}`}
                            message={message}
                            isOutgoing={message.sender_id === currentUserId}
                            onRetry={onRetry}
                        />
                    ))}
                </div>
            ))}

            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList;