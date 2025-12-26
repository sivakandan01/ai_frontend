interface ImageInputProps {
  input: string;
  isSending: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ImageInput({
  input,
  isSending,
  onInputChange,
  onSubmit,
}: ImageInputProps) {
  return (
    <form onSubmit={onSubmit} className="p-6 bg-[rgb(var(--sidebar-bg))]">
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Describe the image you want to generate..."
          className="flex-1 bg-[rgb(var(--input-bg))] text-[rgb(var(--primary-text))] rounded-lg px-4 py-3 focus:outline-none border border-[rgb(var(--border-color))] overflow-hidden"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="bg-[rgb(var(--button-primary))] text-white px-6 py-3 rounded-lg hover:bg-[rgb(var(--button-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Generate
        </button>
      </div>
    </form>
  );
}
