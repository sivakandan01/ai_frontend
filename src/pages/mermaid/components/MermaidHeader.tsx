import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/common";

const MERMAID_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

interface MermaidHeaderProps {
  currentSessionName?: string;
  mermaidModel: string;
  onModelChange: (value: string) => void;
}

export default function MermaidHeader({
  currentSessionName,
  mermaidModel,
  onModelChange,
}: MermaidHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--sidebar-bg))]">
      <div>
        <h2 className="text-xl font-semibold text-[rgb(var(--primary-text))]">
          {currentSessionName || "New Mermaid Diagram"}
        </h2>
        <span className="text-sm text-[rgb(var(--secondary-text))]">Mermaid Diagram Generator</span>
      </div>

      {/* Model Selector and Theme Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[rgb(var(--secondary-text))]">Model:</span>
        <Select value={mermaidModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-[220px] bg-[rgb(var(--input-bg))] border-[rgb(var(--border-color))] text-[rgb(var(--primary-text))]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {MERMAID_MODELS.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ThemeToggle />
      </div>
    </div>
  );
}
