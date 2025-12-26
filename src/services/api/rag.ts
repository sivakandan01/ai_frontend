import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface DocumentResponse {
  id: string;
  filename: string;
  user_id: string;
  upload_date: string;
  document_count?: number;
}

export interface QueryRequest {
  query: string;
  top_k?: number;
  document_ids?: string[];
}

export interface QueryResponse {
  answer: string;
  sources: Array<{
    content: string;
    document_id: string;
    score: number;
  }>;
}

export interface DeleteResponse {
  success: boolean;
  message: string;
}

export interface SessionResponse {
  id: string;
  session_name: string;
}

export interface UpdateSession {
  session_name: string;
}

export const ragApi = createApi({
  reducerPath: 'ragApi',
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
  tagTypes: ['Sessions'],
  endpoints: (builder) => ({
    uploadDocument: builder.mutation<DocumentResponse, FormData>({
      query: (formData) => ({
        url: '/rag/upload',
        method: 'POST',
        body: formData,
      }),
    }),
    queryDocuments: builder.mutation<QueryResponse, QueryRequest>({
      query: (queryRequest) => ({
        url: '/rag/query',
        method: 'POST',
        body: queryRequest,
      }),
    }),
    listDocuments: builder.query<DocumentResponse[], void>({
      query: () => '/rag/documents',
    }),
    deleteDocument: builder.mutation<DeleteResponse, string>({
      query: (documentId) => ({
        url: `/rag/documents/${documentId}`,
        method: 'DELETE',
      }),
    }),
    createSession: builder.mutation<{ session_id: string }, void>({
      query: () => ({
        url: '/session',
        method: 'POST',
      }),
      invalidatesTags: ['Sessions'],
    }),
    getSessions: builder.query<SessionResponse[], { type?: string } | void>({
      query: (params) => {
        const queryParams = params && params.type ? `?type=${params.type}` : '';
        return `/session/${queryParams}`;
      },
      providesTags: ['Sessions'],
    }),
    updateSession: builder.mutation<SessionResponse, { sessionId: string; data: UpdateSession }>({
      query: ({ sessionId, data }) => ({
        url: `/session/${sessionId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Sessions'],
    }),
    deleteSession: builder.mutation<DeleteResponse, string>({
      query: (sessionId) => ({
        url: `/session/${sessionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Sessions'],
    })
  }),
});

export const {
  useUploadDocumentMutation,
  useQueryDocumentsMutation,
  useListDocumentsQuery,
  useDeleteDocumentMutation,
  useCreateSessionMutation,
  useGetSessionsQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = ragApi;
