import { useState } from "react";
import { Sidebar } from "@/components/layout";
import ImageHeader from "./components/ImageHeader";
import ImageList from "./components/ImageList";
import ImageInput from "./components/ImageInput";
import { useImageLogic } from "./hooks/useImageLogic";

export default function ImageContainer() {
  const {
    images,
    sessionId,
    input,
    isSending,
    sessions,
    currentSessionName,
    imageProvider,
    setInput,
    handleNewChat,
    handleSessionClick,
    handleRenameSession,
    handleDeleteSession,
    handleSubmit,
    handleProviderChange,
  } = useImageLogic();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row bg-[rgb(var(--sidebar-bg))] h-screen overflow-hidden">
      <Sidebar
        mode="ai"
        sessions={sessions}
        sessionId={sessionId}
        onNewChat={handleNewChat}
        onSessionClick={handleSessionClick}
        onRenameSession={handleRenameSession}
        onDeleteSession={handleDeleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-[rgb(var(--main-surface))]">
        <ImageHeader
          currentSessionName={currentSessionName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <ImageList images={images} />
        <ImageInput
          input={input}
          isSending={isSending}
          imageProvider={imageProvider}
          onInputChange={setInput}
          onProviderChange={handleProviderChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
