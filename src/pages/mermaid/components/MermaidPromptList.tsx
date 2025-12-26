import type { LocalDiagram } from "../hooks/useMermaidLogic";

interface MermaidPromptListProps {
  diagrams: LocalDiagram[];
  currentDiagramIndex: number | null;
  onDiagramClick: (index: number) => void;
}

export default function MermaidPromptList({
  diagrams,
  currentDiagramIndex,
  onDiagramClick,
}: MermaidPromptListProps) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-4 bg-[rgb(var(--sidebar-bg))]">
      <h3 className="text-lg font-semibold text-[rgb(var(--primary-text))] mb-4">Prompts</h3>
      {diagrams.map((diagram, index) => (
        <div
          key={index}
          onClick={() => onDiagramClick(index)}
          className={`p-4 rounded-lg cursor-pointer transition-colors ${
            currentDiagramIndex === index
              ? "bg-[rgb(var(--button-primary))] text-[rgb(var(--primary-text))]"
              : "bg-[rgb(var(--input-bg))] text-[rgb(var(--primary-text))] hover:bg-[rgb(var(--button-hover))]"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm flex-1">{diagram.prompt}</p>
            {!diagram.completed && (
              <div className="flex space-x-2 flex-shrink-0">
                <div className="w-2 h-2 bg-[rgb(var(--primary-text))] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[rgb(var(--primary-text))] rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-[rgb(var(--primary-text))] rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
