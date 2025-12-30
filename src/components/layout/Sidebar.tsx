import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/slices/userSlice";
import { type SessionResponse } from "@/services/api/rag";

interface SidebarProps {
  mode: "rag" | "ai";
  sessions?: SessionResponse[];
  sessionId: string | undefined;
  onNewChat: () => void;
  onSessionClick: (id: string) => void;
  onRenameSession: (id: string, newName: string) => void;
  onDeleteSession: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({
  mode,
  sessions,
  sessionId,
  onNewChat,
  onSessionClick,
  onRenameSession,
  onDeleteSession,
  isOpen = true,
  onClose,
}: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleBack = () => {
    navigate("/selection");
  };

  const handleLogout = () => {
    // Clear auth token from localStorage
    localStorage.removeItem("access_token");
    // Clear user state from Redux
    dispatch(clearUser());
    // Navigate to login page
    navigate("/login");
  };

  const startRename = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
    setOriginalName(currentName);
  };

  const saveRename = (id: string) => {
    const trimmedName = editName.trim();
    // Only call API if name actually changed
    if (trimmedName && trimmedName !== originalName) {
      onRenameSession(id, trimmedName);
    }
    setEditingId(null);
    setEditName("");
    setOriginalName("");
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditName("");
    setOriginalName("");
  };

  const confirmDelete = (id: string) => {
    onDeleteSession(id);
    setDeletingId(null);
  };

  const handleSessionClick = (id: string) => {
    onSessionClick(id);
    // Close sidebar on mobile when selecting a session
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  const handleNewChatClick = () => {
    onNewChat();
    // Close sidebar on mobile when creating new chat
    if (onClose && window.innerWidth < 768) {
      onClose();
    }
  };

  if (mode !== "ai") {
    return null;
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[rgb(var(--sidebar-bg))]/60"
            onClick={() => setDeletingId(null)}
          />

          {/* Modal */}
          <div className="relative bg-[rgb(var(--main-surface))] border border-[rgb(var(--border-color))] rounded-lg shadow-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-[rgb(var(--primary-text))] font-semibold text-lg mb-2">Delete session?</h3>
            <p className="text-[rgb(var(--secondary-text))] text-sm mb-6">
              "{sessions?.find((s) => s.id === deletingId)?.session_name}" will be permanently deleted. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] text-[rgb(var(--primary-text))] text-sm font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deletingId)}
                className="px-4 py-2 bg-[rgb(var(--error-color))] hover:opacity-90 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed md:relative w-[280px] bg-[rgb(var(--sidebar-bg))] border-r border-[rgb(var(--border-color))] flex flex-col h-screen z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Top Space */}
        <div className="h-[20px] flex-shrink-0"></div>

        {/* Back Button */}
        <div className="px-4 flex-shrink-0 mb-3">
          <button
            onClick={handleBack}
            className="w-full px-4 py-2.5 bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] text-[rgb(var(--primary-text))] font-medium rounded-lg transition-all flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-4 flex-shrink-0">
        <button
          onClick={handleNewChatClick}
          className="w-full px-4 py-2.5 bg-[rgb(var(--button-primary))] hover:bg-[rgb(var(--button-hover))] text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          New Chat
        </button>
      </div>

      {/* Space after New Chat */}
      <div className="h-[30px] flex-shrink-0"></div>

      {/* Sessions List */}
      <div className="flex-1 overflow-hidden px-4">
        <div className="h-full flex flex-col">
          <h3 className="text-[rgb(var(--secondary-text))] text-xs font-semibold uppercase mb-3 flex-shrink-0 tracking-wider">
            Recent
          </h3>
          <div className="space-y-1.5 overflow-y-auto scrollbar-hide">
            {sessions?.map((session) => (
              <div
                key={session.id}
                className={`relative rounded-lg transition-all group ${
                  sessionId === session.id
                    ? "bg-[rgb(var(--input-bg))]"
                    : "hover:bg-[rgb(var(--input-bg))]"
                }`}
              >
                {editingId === session.id ? (
                  /* Editing Mode */
                  <div className="px-3 py-2.5">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveRename(session.id);
                        if (e.key === "Escape") cancelRename();
                      }}
                      onBlur={() => saveRename(session.id)}
                      className="w-full bg-[rgb(var(--sidebar-bg))] text-[rgb(var(--primary-text))] text-sm px-2 py-1 rounded border border-[rgb(var(--border-color))] focus:outline-none focus:border-[rgb(var(--button-primary))]"
                      autoFocus
                    />
                  </div>
                ) : (
                  /* Normal Mode */
                  <>
                    <button
                      onClick={() => handleSessionClick(session.id)}
                      className="w-full text-left px-3 py-2.5 flex items-center gap-3"
                    >
                      <svg
                        className={`w-4 h-4 flex-shrink-0 ${
                          sessionId === session.id
                            ? "text-[rgb(var(--primary-text))]"
                            : "text-[rgb(var(--secondary-text))] group-hover:text-[rgb(var(--primary-text))]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      <span
                        className={`text-sm truncate font-medium flex-1 ${
                          sessionId === session.id
                            ? "text-[rgb(var(--primary-text))]"
                            : "text-[rgb(var(--secondary-text))] group-hover:text-[rgb(var(--primary-text))]"
                        }`}
                      >
                        {session.session_name}
                      </span>
                    </button>

                    {/* Action Buttons - Show on Hover */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-hover:flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startRename(session.id, session.session_name);
                        }}
                        className="p-1.5 text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--primary-text))] hover:bg-[rgb(var(--sidebar-bg))] rounded transition-colors"
                        title="Rename"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeletingId(session.id);
                        }}
                        className="p-1.5 text-[rgb(var(--secondary-text))] hover:text-[rgb(var(--error-color))] hover:bg-[rgb(var(--sidebar-bg))] rounded transition-colors"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Space before Logout */}
      <div className="h-[40px] flex-shrink-0"></div>

      {/* Logout Button */}
      <div className="px-4 pb-6 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2.5 bg-[rgb(var(--button-secondary))] hover:bg-[rgb(var(--button-secondary-hover))] text-[rgb(var(--primary-text))] font-medium rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </div>
    </>
  );
}
