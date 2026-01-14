import { useState } from "react";
import Messages from "./message";
import MessageSidebar from "./sidebar";
import MessageHeader from "./header";
import { useSocket } from "@/hooks/useSocket";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ChatArea } from "@/components/chat";
import { useChatLogic } from "@/hooks/useChatLogic";

import type { User } from "@/types/user";

const MessageComponent = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isAiPanelOpen, setIsAiPanelOpen] = useState(false);
    const [aiPanelWidth, setAiPanelWidth] = useState(400);

    const { userId: currentUserId } = useCurrentUser();

    useSocket(currentUserId);

    const { messages, input, isSending, setInput: onInputChange, handleSubmit: onSubmit } = useChatLogic();

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        const startX = e.clientX;
        const startWidth = aiPanelWidth;

        const onMouseMove = (moveEvent: MouseEvent) => {
            const newWidth = startWidth + (startX - moveEvent.clientX);
            if (newWidth >= 200 && newWidth <= 600) {
                setAiPanelWidth(newWidth);
            }
        };

        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[rgb(var(--main-surface))] transition-colors duration-300">
            <div className="flex-none border-b border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] shadow-sm">
                <MessageHeader
                    onUserSelect={setSelectedUser}
                    isAiOpen={isAiPanelOpen}
                    onToggleAi={() => setIsAiPanelOpen(!isAiPanelOpen)}
                />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-80 flex-none border-r border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] overflow-y-auto scrollbar-hide">
                    <MessageSidebar onUserSelect={setSelectedUser} selectedUserId={selectedUser?.id || null} />
                </div>

                <div className="flex flex-1 bg-[rgb(var(--main-surface))] overflow-hidden">
                    <div className="flex-1 min-w-0">
                        <Messages selectedUser={selectedUser} onToggleAi={(open) => setIsAiPanelOpen(open)} />
                    </div>

                    {isAiPanelOpen && (
                        <>
                            {/* Resize Handle */}
                            <div
                                onMouseDown={handleMouseDown}
                                className="w-1 cursor-col-resize bg-[rgb(var(--border-color))] hover:bg-[rgb(var(--primary-color))] transition-colors duration-200 z-10"
                            />

                            {/* AI Panel */}
                            <div
                                style={{ width: `${aiPanelWidth}px` }}
                                className="flex-none border-l border-[rgb(var(--border-color))] bg-[rgb(var(--main-surface))] relative h-full flex flex-col"
                            >
                                <ChatArea
                                    messages={messages}
                                    input={input}
                                    isSending={isSending}
                                    onInputChange={onInputChange}
                                    onSubmit={onSubmit}
                                    isCompact={true}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MessageComponent