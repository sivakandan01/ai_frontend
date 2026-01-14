import { useState } from "react";
import Messages from "./message";
import MessageSidebar from "./sidebar";
import MessageHeader from "./header";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useSocket } from "@/hooks/useSocket";

interface User {
    id: string;
    user_name: string;
    email: string;
}

const MessageComponent = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const currentUser = useSelector((state: RootState) => state.user);
    const currentUserId = currentUser.id || "";

    useSocket(currentUserId);

    return (
        <div className="flex flex-col h-screen w-full bg-[rgb(var(--main-surface))] transition-colors duration-300">
            <div className="flex-none border-b border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] shadow-sm">
                <MessageHeader onUserSelect={setSelectedUser} />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-80 flex-none border-r border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))] overflow-y-auto scrollbar-hide">
                    <MessageSidebar onUserSelect={setSelectedUser} selectedUserId={selectedUser?.id || null} />
                </div>
                <div className="flex-1 bg-[rgb(var(--main-surface))]">
                    <Messages selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    )
}

export default MessageComponent