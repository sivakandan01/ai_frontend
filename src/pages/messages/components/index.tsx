import { useState } from "react";
import Messages from "./message";
import MessageSidebar from "./sidebar";
import MessageHeader from "./header";

interface User {
    id: string;
    user_name: string;
    email: string;
}

const MessageComponent = () => {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return(
        <div className="flex flex-col h-screen w-full bg-gray-50">
            <div className="flex-none border-b border-gray-200 bg-white shadow-sm">
                <MessageHeader onUserSelect={setSelectedUser} />
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-80 flex-none border-r border-gray-200 bg-white overflow-y-auto">
                    <MessageSidebar />
                </div>
                <div className="flex-1 bg-white">
                    <Messages selectedUser={selectedUser} />
                </div>
            </div>
        </div>
    )
}

export default MessageComponent