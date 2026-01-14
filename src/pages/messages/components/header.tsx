import SearchBar from "@/components/custom/searchBar";
import { ThemeToggle } from "@/components/common";

interface User {
    id: string;
    user_name: string;
    email: string;
}

interface MessageHeaderProps {
    onUserSelect: (user: User) => void;
}

const MessageHeader = ({ onUserSelect }: MessageHeaderProps) => {
    return (
        <div className="h-[60px] w-full flex items-center px-6 bg-[rgb(var(--main-surface))] border-b border-[rgb(var(--border-color))] transition-colors duration-300">
            <div className="flex-1 flex justify-center">
                <SearchBar onUserSelect={onUserSelect} />
            </div>
            <div className="flex items-center gap-4 ml-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default MessageHeader;
