import { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import mermaid from "mermaid";
import { useGenerateMermaidMutation, useGetMermaidDiagramsQuery } from "@/services/api/mermaid";
import {
  useGetSessionsQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} from "@/services/api/rag";
import { useUpdateUserMutation } from "@/services/api/user";
import type { RootState } from "@/store";
import { updateMermaidModel } from "@/store/slices/userSlice";

export interface LocalDiagram {
  prompt: string;
  mermaid_code: string;
  diagram_id: string;
  completed: boolean;
  error: boolean;
}

export const useMermaidLogic = () => {
  const [diagrams, setDiagrams] = useState<LocalDiagram[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>("");
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [currentDiagramIndex, setCurrentDiagramIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState<number>(80); 
  const diagramRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const mermaidModel = useSelector((state: RootState) => state.user.mermaid_model);

  const [generateMermaid] = useGenerateMermaidMutation();
  const [updateSession] = useUpdateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data: sessions, refetch: refetchSessions } = useGetSessionsQuery({ type: "mermaid" });

  const currentSessionName = useMemo(() => {
    return sessions?.find((s) => s.id === sessionId)?.session_name;
  }, [sessions, sessionId]);

  const { data: sessionDiagrams } = useGetMermaidDiagramsQuery(sessionId || "", {
    skip: !sessionId,
  });

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      suppressErrorRendering: true,
      logLevel: 'fatal', // Only show fatal errors, suppress syntax errors
    });
  }, []);

  // Render mermaid diagram when current diagram changes
  useEffect(() => {
    const renderDiagram = async () => {
      if (diagramRef.current && currentDiagramIndex !== null && diagrams[currentDiagramIndex]) {
        const diagram = diagrams[currentDiagramIndex];
        if (diagram.completed && !diagram.error && diagram.mermaid_code) {
          try {
            diagramRef.current.innerHTML = '';
            const { svg } = await mermaid.render(
              `mermaid-${diagram.diagram_id}`,
              diagram.mermaid_code
            );
            diagramRef.current.innerHTML = svg;

            // Make SVG responsive - keep it simple
            const svgElement = diagramRef.current.querySelector('svg');
            if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
            }
          } catch (error) {
            // Suppress console errors and mark diagram as errored
            setDiagrams((prev) => {
              const updated = [...prev];
              if (currentDiagramIndex !== null && updated[currentDiagramIndex]) {
                updated[currentDiagramIndex] = {
                  ...updated[currentDiagramIndex],
                  error: true,
                };
              }
              return updated;
            });
            diagramRef.current.innerHTML = '';
          }
        }
      }
    };

    renderDiagram();
  }, [currentDiagramIndex, diagrams]);

  const handleNewChat = () => {
    setDiagrams([]);
    setSessionId("");
    setCurrentDiagramIndex(null);
  };

  const handleSessionClick = async (id: string) => {
    setSessionId(id);
    setDiagrams([]);
    setCurrentDiagramIndex(null);
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
        setDiagrams([]);
        setSessionId("");
        setCurrentDiagramIndex(null);
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  useEffect(() => {
    if (sessionDiagrams && sessionDiagrams.length > 0) {
      const loadedDiagrams: LocalDiagram[] = sessionDiagrams.map((diagram) => ({
        prompt: diagram.prompt,
        mermaid_code: diagram.mermaid_code,
        diagram_id: diagram.diagram_id,
        completed: true,
        error: false,
      }));
      setDiagrams(loadedDiagrams);
      setCurrentDiagramIndex(loadedDiagrams.length - 1);
    }
  }, [sessionDiagrams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending || !input.trim()) return;

    setIsSending(true);
    const newDiagramIndex = diagrams.length;
    setDiagrams((prev) => [
      ...prev,
      { prompt: input, mermaid_code: "", diagram_id: "", completed: false, error: false },
    ]);
    setCurrentDiagramIndex(newDiagramIndex);

    setInput("");

    try {
      const response = await generateMermaid({
        prompt: input,
        session_id: sessionId || "",
        model: mermaidModel,
      }).unwrap();

      if (response && !sessionId && response.session_id) {
        setSessionId(response.session_id);
        refetchSessions();
      }

      setDiagrams((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.completed === false) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            mermaid_code: response.mermaid_code,
            diagram_id: response.diagram_id,
            completed: true,
            error: false,
          };
        }

        return updated;
      });
    } catch (error) {
      console.log("error", error);
      setDiagrams((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.completed === false) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            completed: true,
            error: true,
          };
        }

        return updated;
      });
      console.error("Failed to generate mermaid diagram", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleModelChange = async (value: string) => {
    dispatch(updateMermaidModel(value));
    try {
      await updateUser({ mermaid_model: value }).unwrap();
    } catch (error) {
      console.error("Failed to update mermaid model:", error);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200)); // max 200%
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50)); // min 50%
  };

  const handleResetZoom = () => {
    setZoom(60); // Reset to default 60%
  };

  const handleDownload = () => {
    if (diagramRef.current && currentDiagramIndex !== null && diagrams[currentDiagramIndex]) {
      const svgElement = diagramRef.current.querySelector('svg');
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `mermaid-diagram-${Date.now()}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }
  };

  return {
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
  };
};
