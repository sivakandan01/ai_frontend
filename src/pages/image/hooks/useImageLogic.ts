import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGenerateImageMutation, useGetImagesQuery } from "@/services/api/image";
import {
  useGetSessionsQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} from "@/services/api/rag";
import { useUpdateUserMutation } from "@/services/api/user";
import type { RootState } from "@/store";
import { updateImageProvider } from "@/store/slices/userSlice";

export interface LocalImage {
  prompt: string;
  image_url: string;
  completed: boolean;
  error: boolean;
}

export const useImageLogic = () => {
  const [images, setImages] = useState<LocalImage[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>("");
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const dispatch = useDispatch();
  const imageProvider = useSelector((state: RootState) => state.user.image_provider);

  const [generateImage] = useGenerateImageMutation();
  const [updateSession] = useUpdateSessionMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [updateUser] = useUpdateUserMutation();

  const { data: sessions, refetch: refetchSessions } = useGetSessionsQuery({ type: "image" });

  const currentSessionName = useMemo(() => {
    return sessions?.find((s) => s.id === sessionId)?.session_name;
  }, [sessions, sessionId]);

  const { data: sessionImages } = useGetImagesQuery(sessionId || "", {
    skip: !sessionId,
  });

  const handleNewChat = () => {
    setImages([]);
    setSessionId("");
  };

  const handleSessionClick = async (id: string) => {
    setSessionId(id);
    setImages([]);
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
        setImages([]);
        setSessionId("");
      }
    } catch (err) {
      console.error("Error deleting session:", err);
    }
  };

  useEffect(() => {
    if (sessionImages && sessionImages.length > 0) {
      const loadedImages: LocalImage[] = sessionImages.map((img) => ({
        prompt: img.prompt,
        image_url: img.image_url,
        completed: true,
        error: false,
      }));
      setImages(loadedImages);
    }
  }, [sessionImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSending || !input.trim()) return;

    setIsSending(true);
    setImages((prev) => [
      ...prev,
      { prompt: input, image_url: "", completed: false, error: false },
    ]);

    setInput("");

    try {
      const response = await generateImage({
        prompt: input,
        session_id: sessionId || "",
        image_provider: imageProvider,
      }).unwrap();

      if (response && !sessionId && response.session_id) {
        setSessionId(response.session_id);
        refetchSessions();
      }

      setImages((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;

        if (updated[lastIndex]?.completed === false) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            image_url: response.image_url,
            completed: true,
            error: false,
          };
        }

        return updated;
      });
    } catch (error) {
      console.log("error", error);
      setImages((prev) => {
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
      console.error("Failed to generate image", error);
    } finally {
      setIsSending(false);
    }
  };

  const handleProviderChange = async (value: string) => {
    dispatch(updateImageProvider(value));
    try {
      await updateUser({ image_provider: value }).unwrap();
    } catch (error) {
      console.error("Failed to update image provider:", error);
    }
  };

  return {
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
  };
};
