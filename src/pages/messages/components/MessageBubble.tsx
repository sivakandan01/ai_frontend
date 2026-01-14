import { Clock, Check, CheckCheck, AlertCircle, RefreshCw } from "lucide-react";
import { type ChatMessage } from "@/services/api/chats";

interface MessageBubbleProps {
    message: ChatMessage;
    isOutgoing: boolean;
    showTimestamp?: boolean;
    onRetry?: (messageId: string) => void;
}

const MessageBubble = ({ message, isOutgoing, showTimestamp = true, onRetry }: MessageBubbleProps) => {
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getStatusIcon = () => {
        switch (message.status) {
            case 'sending':
                return <Clock className="w-3 h-3 text-gray-400" />;
            case 'sent':
                return <Check className="w-3 h-3 text-gray-400" />;
            case 'delivered':
                return <CheckCheck className="w-3 h-3 text-gray-400" />;
            case 'read':
                return <CheckCheck className="w-3 h-3 text-blue-500" />;
            case 'failed':
                return <AlertCircle className="w-3 h-3 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-col mb-4 ${isOutgoing ? 'items-end' : 'items-start'}`}>
            {/* Message Bubble */}
            <div
                className={`px-4 py-2 rounded-lg max-w-[70%] break-words shadow-sm transition-all ${isOutgoing
                    ? 'bg-[rgb(var(--button-primary))] text-white rounded-br-sm'
                    : 'bg-[rgb(var(--hover-bg))] text-[rgb(var(--primary-text))] rounded-bl-sm border border-[rgb(var(--border-color))] shadow-sm'
                    }`}
            >
                {message.content}
            </div>

            {/* Timestamp and Status */}
            {showTimestamp && (
                <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-500">
                        {formatTime(message.created_at)}
                    </span>
                    {isOutgoing && (
                        <span className="flex items-center">
                            {getStatusIcon()}
                        </span>
                    )}
                </div>
            )}

            {/* Retry Button for Failed Messages */}
            {message.status === 'failed' && isOutgoing && onRetry && message.id && (
                <button
                    onClick={() => onRetry(message.id!)}
                    className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 mt-1"
                >
                    <RefreshCw className="w-3 h-3" />
                    Retry
                </button>
            )}
        </div>
    );
};

export default MessageBubble;