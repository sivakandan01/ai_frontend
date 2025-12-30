import { ThemeToggle } from "@/components/common";

interface ChatHeaderProps {
  mode: "rag" | "ai";
  sessionName?: string;
  onMenuClick?: () => void;
}

export default function ChatHeader({ mode, sessionName, onMenuClick }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-[rgb(var(--sidebar-bg))] border-b border-[rgb(var(--border-color))]">
      <div className="flex items-center gap-2 md:gap-0 flex-1 min-w-0">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-[rgb(var(--input-bg))] rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[rgb(var(--primary-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <h2 className="text-base md:text-xl font-semibold text-[rgb(var(--primary-text))] truncate">
            {sessionName || "New Chat"}
          </h2>
          <span className="text-xs md:text-sm text-[rgb(var(--secondary-text))]">
            {mode === "rag" ? "RAG Mode" : "AI Chat"}
          </span>
        </div>
      </div>

      {/* Mode Indicator and Theme Toggle */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <span
          className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-[rgb(var(--button-primary))]/20 text-[rgb(var(--button-primary))] border border-[rgb(var(--button-primary))]/50"
        >
          {mode === "rag" ? "RAG" : "AI"}
        </span>
        <ThemeToggle />
      </div>
    </div>
  );
}
