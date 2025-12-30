import { useState } from "react";
import { Sidebar } from "@/components/layout";
import { ChatArea } from "@/components/chat";
import ChatHeader from "./components/ChatHeader";
import { useChatLogic } from "./hooks/useChatLogic";

export default function ChatContainer() {
  const {
    mode,
    messages,
    sessionId,
    input,
    isSending,
    sessions,
    currentSessionName,
    setInput,
    handleNewChat,
    handleSessionClick,
    handleRenameSession,
    handleDeleteSession,
    handleSubmit,
  } = useChatLogic();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-row bg-[rgb(var(--sidebar-bg))] h-screen overflow-hidden">
      <Sidebar
        mode={mode}
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
        <ChatHeader
          mode={mode}
          sessionName={currentSessionName}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        <ChatArea
          mode={mode}
          messages={messages}
          input={input}
          isSending={isSending}
          onInputChange={setInput}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
