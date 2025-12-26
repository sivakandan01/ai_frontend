import { useState, useRef, useCallback, useEffect } from "react";
import { Sidebar } from "@/components/layout";
import MermaidHeader from "./components/MermaidHeader";
import MermaidPromptList from "./components/MermaidPromptList";
import MermaidInput from "./components/MermaidInput";
import MermaidDisplay from "./components/MermaidDisplay";
import { useMermaidLogic } from "./hooks/useMermaidLogic";

export default function MermaidContainer() {
  const {
    diagrams,
    sessionId,
    input,
    isSending,
    sessions,
    currentSessionName,
    mermaidModel,
    currentDiagramIndex,
    diagramRef,
    zoom,
    setInput,
    setCurrentDiagramIndex,
    handleNewChat,
    handleSessionClick,
    handleRenameSession,
    handleDeleteSession,
    handleSubmit,
    handleModelChange,
    handleZoomIn,
    handleZoomOut,
    handleResetZoom,
    handleDownload,
  } = useMermaidLogic();

  // Resizable split pane state
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 20; // minimum 20%
  const MAX_WIDTH = 80; // maximum 80%

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Clamp between MIN_WIDTH and MAX_WIDTH
      const clampedWidth = Math.min(Math.max(newLeftWidth, MIN_WIDTH), MAX_WIDTH);
      setLeftWidth(clampedWidth);
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div
      className="flex flex-row bg-[rgb(var(--sidebar-bg))] h-screen overflow-hidden"
      style={{ userSelect: isDragging ? 'none' : 'auto' }}
    >
      <Sidebar
        mode="ai"
        sessions={sessions}
        sessionId={sessionId}
        onNewChat={handleNewChat}
        onSessionClick={handleSessionClick}
        onRenameSession={handleRenameSession}
        onDeleteSession={handleDeleteSession}
      />
      <div className="flex-1 flex flex-col h-screen bg-[rgb(var(--sidebar-bg))]">
        <MermaidHeader
          currentSessionName={currentSessionName}
          mermaidModel={mermaidModel}
          onModelChange={handleModelChange}
        />

        {/* Split Screen Layout */}
        <div ref={containerRef} className="flex-1 flex relative overflow-hidden">
          {/* Left Side - Prompt Section */}
          <div
            style={{ width: `${leftWidth}%` }}
            className="flex flex-col bg-[rgb(var(--sidebar-bg))] overflow-hidden"
          >
            <MermaidPromptList
              diagrams={diagrams}
              currentDiagramIndex={currentDiagramIndex}
              onDiagramClick={setCurrentDiagramIndex}
            />
            <MermaidInput
              input={input}
              isSending={isSending}
              onInputChange={setInput}
              onSubmit={handleSubmit}
            />
          </div>

          {/* Resizer */}
          <div
            onMouseDown={handleMouseDown}
            className={`group relative flex items-center justify-center w-2 hover:w-2 bg-[rgb(var(--border-color))] hover:bg-[rgb(var(--button-primary))] cursor-col-resize transition-all ${
              isDragging ? 'bg-[rgb(var(--button-primary))] w-2' : ''
            }`}
            style={{ cursor: 'col-resize' }}
          >
            <div className="absolute w-1 h-12 bg-[rgb(var(--border-color))] rounded-full group-hover:bg-[rgb(var(--primary-text))] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Right Side - Diagram Display */}
          <div
            style={{ width: `${100 - leftWidth}%` }}
            className="flex flex-col bg-[rgb(var(--main-surface))] overflow-hidden"
          >
            <MermaidDisplay
              diagrams={diagrams}
              currentDiagramIndex={currentDiagramIndex}
              diagramRef={diagramRef}
              zoom={zoom}
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onResetZoom={handleResetZoom}
              onDownload={handleDownload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
