import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/common";

interface ImageHeaderProps {
  currentSessionName?: string;
  imageProvider: string;
  onProviderChange: (value: string) => void;
}

export default function ImageHeader({
  currentSessionName,
  imageProvider,
  onProviderChange,
}: ImageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[rgb(var(--sidebar-bg))]">
      <div>
        <h2 className="text-xl font-semibold text-[rgb(var(--primary-text))]">
          {currentSessionName || "New Image Generation"}
        </h2>
        <span className="text-sm text-[rgb(var(--secondary-text))]">Image Generation</span>
      </div>

      {/* Provider Selector and Theme Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-[rgb(var(--secondary-text))]">Provider:</span>
        <Select value={imageProvider} onValueChange={onProviderChange}>
          <SelectTrigger className="w-[180px] bg-[rgb(var(--input-bg))] border-[rgb(var(--border-color))] text-[rgb(var(--primary-text))]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pollinations">Pollinations</SelectItem>
            <SelectItem value="huggingface">Hugging Face</SelectItem>
          </SelectContent>
        </Select>
        <ThemeToggle />
      </div>
    </div>
  );
}
