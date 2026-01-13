import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { chatsApi } from '@/services/api/chats';
import type { AppDispatch } from '@/store';
import type { ChatMessage } from '@/services/api/chats';

interface SocketMessage {
  type: string;
  message: ChatMessage;
  is_new_conversation: boolean;
}

export const useSocket = (userId: string | null) => {
  const socketRef = useRef<WebSocket | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userId) {
        console.log('DEBUG: No userId provided for WebSocket. Connection skipped.');
        return;
    }

    const baseUrl = (import.meta.env.VITE_BASE_URL || 'http://localhost:8001').replace(/\/$/, '');
    const wsUrl = baseUrl.replace(/^http/, 'ws') + `/chats/ws/${userId}`;

    const connect = () => {
      const socket = new WebSocket(wsUrl);
      socketRef.current = socket;

      const handleIncomingMessageBody = (newMessage: ChatMessage) => {
        const partnerId = newMessage.sender_id === userId ? newMessage.receiver_id : newMessage.sender_id;
        dispatch(
          chatsApi.util.updateQueryData('getChats', partnerId, (draft) => {
            if (!draft.find(m => m.id === newMessage.id)) {
              draft.push(newMessage);
            }
          })
        );
      };

      const handleSidebarUpdate = () => {
        dispatch(chatsApi.util.invalidateTags([{ type: 'Conversations', id: 'LIST' }]));
      };

      socket.onopen = () => {
        console.log(`✅ WebSocket Connected Successfully | Connection ID: ${userId}`);
      };

      socket.onmessage = (event) => {
        const data: SocketMessage = JSON.parse(event.data);
        if (data.type === 'new_message') {
          handleIncomingMessageBody(data.message);
          handleSidebarUpdate();
        }
      };

      socket.onclose = (event) => {
        setTimeout(connect, 3000);
      };

      socket.onerror = (error) => {
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [userId, dispatch]);

  return socketRef.current;
};
