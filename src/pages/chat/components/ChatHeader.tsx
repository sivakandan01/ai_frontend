import { ThemeToggle } from "@/components/common";

interface ChatHeaderProps {
  mode: "rag" | "ai";
  sessionName?: string;
}

export default function ChatHeader({ mode, sessionName }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[rgb(var(--sidebar-bg))]">
      <div>
        <h2 className="text-xl font-semibold text-[rgb(var(--primary-text))]">
          {sessionName || "New Chat"}
        </h2>
        <span className="text-sm text-[rgb(var(--secondary-text))]">
          {mode === "rag" ? "RAG Mode" : "AI Chat"}
        </span>
      </div>

      {/* Mode Indicator and Theme Toggle */}
      <div className="flex items-center gap-3">
        <span
          className="px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--button-primary))]/20 text-[rgb(var(--button-primary))] border border-[rgb(var(--button-primary))]/50"
        >
          {mode === "rag" ? "RAG" : "AI"}
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
}
