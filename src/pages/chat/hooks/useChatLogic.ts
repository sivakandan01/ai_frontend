import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useSendMessageMutation, useGetMessagesQuery } from "@/services/api/message";
import {
  useQueryDocumentsMutation,
  useGetSessionsQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} from "@/services/api/rag";
import type { LocalMessage } from "@/types/chat";

export const useChatLogic = () => {
  const location = useLocation();
  const mode = (location.state as { mode?: "rag" | "ai" })?.mode || "ai";

  const [messages, setMessages] = useState<LocalMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>("");
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const [sendMessage] = useSendMessageMutation();
  const [queryDocuments] = useQueryDocumentsMutation();
  const [updateSession] = useUpdateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();

  // Only fetch sessions for AI mode
  const { data: sessions, refetch: refetchSessions } = useGetSessionsQuery(
    { type: "message" },
    {
      skip: mode === "rag",
    }
  );

  // Get current session name
  const currentSessionName = useMemo(() => {
    return sessions?.find((s) => s.id === sessionId)?.session_name;
  }, [sessions, sessionId]);

  // Fetch messages for selected session
  const { data: sessionMessages } = useGetMessagesQuery(sessionId || "", {
    skip: !sessionId || mode === "rag",
  });

  const handleNewChat = () => {
    setMessages([]);
    setSessionId("");
  };

  const handleSessionClick = async (id: string) => {
    setSessionId(id);
    setMessages([]);
  };

  const handleRenameSession = async (id: string, newName: string) => {
    try {
      await updateSession({ sessionId: id, data: { session_name: newName } }).unwrap();
    } catch (err) {
      console.error("Error renaming session:", err);
    }
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await deleteSession(id).unwrap();
      if (id === sessionId) {
        setMessages([]);
        setSessionId("");
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  // Load messages when sessionMessages changes
  useEffect(() => {
    if (sessionMessages && sessionMessages.length > 0) {
      const loadedMessages: LocalMessage[] = sessionMessages.map((msg) => ({
        content: msg.content,
        role: msg.role,
        completed: true,
        error: false,
      }));
      setMessages(loadedMessages);
    }
  }, [sessionMessages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setMessages((prev) => [
      ...prev,
      { content: input, role: "user", completed: true, error: false },
      { content: "", role: "assistant", completed: false, error: false },
    ]);

    setInput("");

    try {
      if (mode === "rag") {
        const response = await queryDocuments({
          query: input,
          top_k: 5,
        }).unwrap();

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;

          if (
            updated[lastIndex]?.role === "assistant" &&
            updated[lastIndex]?.completed === false
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: response.answer,
              completed: true,
              error: false,
            };
          }

          return updated;
        });
      } else {
        const response = await sendMessage({
          message: input,
          session_id: sessionId || "",
        }).unwrap();

        if (response && !sessionId && response.session_id) {
          setSessionId(response.session_id);
          if (mode === "ai") {
            refetchSessions();
          }
        }

        setMessages((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;

          if (
            updated[lastIndex]?.role === "assistant" &&
            updated[lastIndex]?.completed === false
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              content: response.content,
              completed: true,
              error: false,
            };
          }

          return updated;
        });
      }
    } catch (error) {
      console.log("error", error);
      setMessages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (
          updated[lastIndex]?.role === "assistant" &&
          updated[lastIndex]?.completed === false
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: "Error occured Please Try Again.",
            completed: true,
            error: true,
          };
        }

        return updated;
      });
      console.error("Failed to send message", error);
    } finally {
      setIsSending(false);
    }
  };

  return {
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
  };
};
