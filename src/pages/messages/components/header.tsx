import SearchBar from "@/components/custom/searchBar";

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
    <div className="h-[60px] w-full flex items-center justify-center px-4">
      <SearchBar onUserSelect={onUserSelect} />
    </div>
  );
};

export default MessageHeader;
