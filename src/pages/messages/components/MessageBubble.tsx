import { Clock, Check, CheckCheck, AlertCircle, RefreshCw } from "lucide-react";

interface UserMessage {
    id?: string;
    sender_id: string;
    receiver_id: string;
    content: string;
    created_at: string;
    status: 'sending' | 'sent' | 'delivered' | 'failed';
    is_read: boolean;
    is_user: boolean;
}

interface MessageBubbleProps {
    message: UserMessage;
    showTimestamp?: boolean;
    onRetry?: (messageId: string) => void;
}

const MessageBubble = ({ message, showTimestamp = true, onRetry }: MessageBubbleProps) => {
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
            case 'failed':
                return <AlertCircle className="w-3 h-3 text-red-500" />;
            default:
                return null;
        }
    };

    return (
        <div className={`flex flex-col mb-4 ${message.is_user ? 'items-end' : 'items-start'}`}>
            {/* Message Bubble */}
            <div
                className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                    message.is_user
                        ? 'bg-blue-500 text-white rounded-br-sm'
                        : 'bg-gray-200 text-gray-900 rounded-bl-sm'
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
                    {message.is_user && (
                        <span className="flex items-center">
                            {getStatusIcon()}
                        </span>
                    )}
                </div>
            )}

            {/* Retry Button for Failed Messages */}
            {message.status === 'failed' && message.is_user && onRetry && message.id && (
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