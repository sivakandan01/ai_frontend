import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MERMAID_MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-8b-instant",
  "gemini-2.5-flash",
  "gemini-2.5-pro",
];

interface MermaidInputProps {
  input: string;
  isSending: boolean;
  mermaidModel: string;
  onInputChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MermaidInput({
  input,
  isSending,
  mermaidModel,
  onInputChange,
  onModelChange,
  onSubmit,
}: MermaidInputProps) {
  return (
    <div className="bg-[rgb(var(--sidebar-bg))] px-3 md:px-6 py-3 md:py-5">
      <div className="mx-[1%] md:mx-[5%]">
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-2 md:gap-3">
          <div className="flex-1 flex flex-col md:flex-row items-stretch md:items-center gap-2 px-3 md:px-5 py-2 md:py-1 bg-[rgb(var(--input-bg))] border border-[rgb(var(--border-color))] rounded-xl focus-within:border-[rgb(var(--border-color))]">
            <input
              type="text"
              value={input}
              onChange={(e) => !isSending && onInputChange(e.target.value)}
              placeholder="Describe the diagram you want to generate..."
              disabled={isSending}
              readOnly={isSending}
              className="flex-1 bg-transparent border-none focus:outline-none text-sm md:text-base text-[rgb(var(--primary-text))] placeholder-[rgb(var(--secondary-text))] disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden py-1 md:py-0"
            />

            <Select value={mermaidModel} onValueChange={onModelChange} disabled={isSending}>
              <SelectTrigger className="w-full md:w-[180px] h-8 md:h-9 text-xs md:text-sm">
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
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="px-4 md:px-6 py-2.5 md:py-3.5 text-sm md:text-base bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-white font-medium rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSending ? "Generating..." : "Generate"}
          </button>
        </form>
      </div>
    </div>
  );
}
