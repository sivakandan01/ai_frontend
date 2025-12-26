import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Chats from "./Chats";
import type { LocalMessage } from "@/types/chat";
import type { RootState } from "@/store";
import { updateProviderModel } from "@/store/slices/userSlice";
import { useUpdateUserMutation } from "@/services/api/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PROVIDER_MODELS: Record<string, string[]> = {
  groq: ["llama-3.3-70b-versatile", "llama-3.1-8b-instant", "openai/gpt-oss-120b"],
  gemini: ["gemini-2.5-flash", "gemini-2.5-pro", "gemini-2.0-flash-001"],
  ollama: ["llama3.2", "llama3.1", "mistral", "phi3", "gemma2", "gemma2:2b"]
};

interface ChatAreaProps {
  mode: "rag" | "ai";
  messages: LocalMessage[];
  input: string;
  isSending?: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ChatArea({
  mode,
  messages,
  input,
  isSending = false,
  onInputChange,
  onSubmit,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const provider = useSelector((state: RootState) => state.user.provider);
  const model = useSelector((state: RootState) => state.user.model);

  const [updateUser] = useUpdateUserMutation();

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleProviderModelChange = async (newProvider: string, newModel: string) => {
    dispatch(updateProviderModel({ provider: newProvider, model: newModel }));

    try {
      await updateUser({ provider: newProvider, model: newModel }).unwrap();
    } catch (error) {
      console.error("Failed to update provider/model:", error);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-[rgb(var(--sidebar-bg))] overflow-hidden">
      {/* Messages Area */}
      <div ref={messagesContainerRef} className="flex-1 mx-[6%] overflow-y-auto scrollbar-hide">
        {messages.map((message, index) =>
          message.role === "user" ? (
            <Chats
              key={index}
              message={message.content}
              side="right"
              isLoading={false}
            />
          ) : (
            <Chats
              key={index}
              message={message.content}
              side="left"
              isLoading={!message.completed}
            />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form at bottom */}
      <div className="bg-[rgb(var(--sidebar-bg))] px-6 py-5">
        <div className="mx-[5%]">
          <form onSubmit={onSubmit} className="flex gap-3">
            <div className="flex-1 flex items-center gap-2 px-5 py-1 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus-within:border-[rgb(var(--border-color))]">
              <input
                type="text"
                value={input}
                onChange={(e) => !isSending && onInputChange(e.target.value)}
                placeholder="Message..."
                disabled={isSending}
                readOnly={isSending}
                className="flex-1 bg-transparent border-none focus:outline-none text-[rgb(var(--primary-text))] placeholder-[rgb(var(--secondary-text))] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              />

              <Select
                value={`${provider}-${model}`}
                onValueChange={(value) => {
                  const [newProvider, ...modelParts] = value.split('-');
                  const newModel = modelParts.join('-');
                  handleProviderModelChange(newProvider, newModel);
                }}
                disabled={isSending}
              >
                <SelectTrigger className="w-[120px] h-9">
                  <SelectValue>
                    <span className="capitalize">{provider}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROVIDER_MODELS).map(([providerKey, models]) =>
                    models.map((modelName) => (
                      <SelectItem key={`${providerKey}-${modelName}`} value={`${providerKey}-${modelName}`}>
                        <span className="capitalize">{providerKey}</span> - {modelName}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="px-6 py-3.5 bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSending ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
