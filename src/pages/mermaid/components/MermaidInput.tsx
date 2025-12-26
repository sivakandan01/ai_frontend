interface MermaidInputProps {
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function MermaidInput({
  input,
  isSending,
  onInputChange,
  onSubmit,
}: MermaidInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 bg-[rgb(var(--sidebar-bg))]">
      <div className="flex flex-col gap-3">
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Describe the diagram you want to generate..."
          className="bg-[rgb(var(--input-bg))] text-[rgb(var(--primary-text))] rounded-lg px-4 py-3 focus:outline-none resize-none h-14 overflow-hidden border border-[rgb(var(--border-color))]"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="bg-[rgb(var(--button-primary))] text-[rgb(var(--primary-text))] px-6 py-3 rounded-lg hover:bg-[rgb(var(--button-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate Diagram
        </button>
      </div>
    </form>
  );
}
