import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Message {
  id: string;
  content: string;
  session_id: string;
  role: "user" | "assistant";
  date: string;
  is_success: boolean;
}

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation<
      { content: string; is_success: boolean; role: string; session_id: string },
      { message: string; session_id?: string }
    >({
      query: (payload) => ({
        url: "message/",
        method: "POST",
        body: payload,
      }),
    }),
    getMessages: builder.query<Message[], string>({
      query: (sessionId) => `message/${sessionId}`,
      keepUnusedDataFor: 0, // Don't cache - always fetch fresh
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = messageApi;