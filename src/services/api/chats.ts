import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ChatMessage {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  is_read: boolean;
  is_user: boolean;
}

export interface Conversation {
  id: string;
  user_name: string;
  email: string;
  last_message: string;
  last_message_date: string;
}

export interface SendChatRequest {
  content: string;
  receiver_id: string;
  is_user: boolean;
}

export interface UpdateChatRequest {
  chatId: string;
  content?: string;
  status?: string;
  is_read?: boolean;
}

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Chats', 'Conversations'],
  endpoints: (builder) => ({
    getChats: builder.query<ChatMessage[], string>({
      query: (receiverId) => `chats/${receiverId}`,
      providesTags: (result, error, receiverId) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Chats' as const, id })), { type: 'Chats', id: 'LIST' }]
          : [{ type: 'Chats', id: 'LIST' }],
    }),
    getConversations: builder.query<Conversation[], void>({
      query: () => "chats/conversations",
      providesTags: (result) => 
        result 
          ? [...result.map(({ id }) => ({ type: 'Conversations' as const, id })), { type: 'Conversations', id: 'LIST' }]
          : [{ type: 'Conversations', id: 'LIST' }],
    }),
    sendChat: builder.mutation<ChatMessage, SendChatRequest>({
      query: (payload) => ({
        url: "chats/",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: 'Chats', id: 'LIST' }, { type: 'Conversations', id: 'LIST' }],
    }),
    updateChatStatus: builder.mutation<ChatMessage, UpdateChatRequest>({
      query: ({ chatId, ...payload }) => ({
        url: `chats/${chatId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { chatId }) => [{ type: 'Chats', id: chatId }],
    }),
  }),
});

export const { 
  useGetChatsQuery, 
  useGetConversationsQuery,
  useSendChatMutation, 
  useUpdateChatStatusMutation 
} = chatsApi;
