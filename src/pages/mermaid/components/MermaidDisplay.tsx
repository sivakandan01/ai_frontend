import { ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";
import type { LocalDiagram } from "../hooks/useMermaidLogic";

interface MermaidDisplayProps {
  diagrams: LocalDiagram[];
  currentDiagramIndex: number | null;
  diagramRef: React.RefObject<HTMLDivElement>;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  onDownload: () => void;
}

export default function MermaidDisplay({
  diagrams,
  currentDiagramIndex,
  diagramRef,
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
  onDownload,
}: MermaidDisplayProps) {
  const hasCompletedDiagram = currentDiagramIndex !== null &&
    diagrams[currentDiagramIndex]?.completed &&
    !diagrams[currentDiagramIndex]?.error;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[rgb(var(--sidebar-bg))]">
      {/* Zoom Controls */}
      {hasCompletedDiagram && (
        <div className="flex items-center justify-between px-6 py-3 border-b border-[rgb(var(--border-color))] bg-[rgb(var(--main-surface))]">
          <div className="flex items-center gap-2">
            <button
              onClick={onZoomOut}
              disabled={zoom <= 50}
              className="p-2 rounded-lg bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4 text-[rgb(var(--primary-text))]" />
            </button>
            <button
              onClick={onResetZoom}
              className="px-3 py-2 rounded-lg bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] transition-colors"
              title="Reset Zoom"
            >
              <div className="flex items-center gap-1">
                <RotateCcw className="w-3 h-3 text-[rgb(var(--primary-text))]" />
                <span className="text-xs font-medium text-[rgb(var(--primary-text))]">{zoom}%</span>
              </div>
            </button>
            <button
              onClick={onZoomIn}
              disabled={zoom >= 200}
              className="p-2 rounded-lg bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4 text-[rgb(var(--primary-text))]" />
            </button>
          </div>
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-white transition-colors"
            title="Download SVG"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download</span>
          </button>
        </div>
      )}

      {/* Diagram Display Area */}
      <div className="flex-1 overflow-auto scrollbar-hide p-6">
        {currentDiagramIndex !== null && diagrams[currentDiagramIndex] ? (
          <>
            {!diagrams[currentDiagramIndex].completed ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex space-x-3">
                  <div className="w-4 h-4 bg-[rgb(var(--button-primary))] rounded-full animate-bounce"></div>
                  <div className="w-4 h-4 bg-[rgb(var(--button-primary))] rounded-full animate-bounce delay-100"></div>
                  <div className="w-4 h-4 bg-[rgb(var(--button-primary))] rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            ) : diagrams[currentDiagramIndex].error ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <div className="text-[rgb(var(--error-color))] text-lg font-semibold mb-2">
                    Failed to generate diagram
                  </div>
                  <p className="text-[rgb(var(--secondary-text))] text-sm">
                    The AI couldn't create a valid diagram from your prompt. Please try rephrasing your request.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                <div
                  ref={diagramRef}
                  className="mermaid-diagram"
                  style={{
                    maxWidth: '100%',
                    width: 'fit-content',
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.2s ease-out',
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[rgb(var(--secondary-text))]">
            <p>Enter a prompt to generate a Mermaid diagram</p>
          </div>
        )}
      </div>
    </div>
  );
}
