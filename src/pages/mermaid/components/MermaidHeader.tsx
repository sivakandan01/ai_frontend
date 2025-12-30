import { ThemeToggle } from "@/components/common";

interface MermaidHeaderProps {
  currentSessionName?: string;
  onMenuClick?: () => void;
}

export default function MermaidHeader({
  currentSessionName,
  onMenuClick,
}: MermaidHeaderProps) {
  return (
    <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))]">
      <div className="flex items-center gap-2 md:gap-0 flex-1 min-w-0">
        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-[rgb(var(--input-bg))] rounded-lg transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 text-[rgb(var(--primary-text))]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="min-w-0 flex-1">
          <h2 className="text-base md:text-xl font-semibold text-[rgb(var(--primary-text))] truncate">
            {currentSessionName || "New Mermaid Diagram"}
          </h2>
          <span className="text-xs md:text-sm text-[rgb(var(--secondary-text))]">Mermaid Diagram Generator</span>
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        <ThemeToggle />
      </div>
    </div>
  );
}
