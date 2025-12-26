import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface MermaidResponse {
  mermaid_code: string;
  session_id: string;
  diagram_id: string;
}

export interface CreateMermaid {
  prompt: string;
  session_id?: string;
  model: string;
}

export interface MermaidDiagram {
  id: string;
  mermaid_code: string;
  prompt: string;
  session_id: string;
  diagram_id: string;
  date: string;
}

export const mermaidApi = createApi({
  reducerPath: "mermaidApi",
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
    generateMermaid: builder.mutation<MermaidResponse, CreateMermaid>({
      query: (payload) => ({
        url: "mermaid/generate",
        method: "POST",
        body: payload,
      }),
    }),
    getMermaidDiagrams: builder.query<MermaidDiagram[], string>({
      query: (sessionId) => `mermaid/${sessionId}`,
      keepUnusedDataFor: 0, 
    }),
  }),
});

export const { useGenerateMermaidMutation, useGetMermaidDiagramsQuery } = mermaidApi;
