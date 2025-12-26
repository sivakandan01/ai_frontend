import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ImageResponse {
  image_url: string;
  session_id: string;
  status: string;
  message: string;
}

export interface CreateImage {
  prompt: string;
  session_id?: string;
  image_provider: string;
}

export interface ImageMessage {
  id: string;
  image_url: string;
  prompt: string;
  session_id: string;
  date: string;
}

export const imageApi = createApi({
  reducerPath: "imageApi",
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
    generateImage: builder.mutation<ImageResponse, CreateImage>({
      query: (payload) => ({
        url: "image/generate",
        method: "POST",
        body: payload,
      }),
    }),
    getImages: builder.query<ImageMessage[], string>({
      query: (sessionId) => `image/${sessionId}`,
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGenerateImageMutation, useGetImagesQuery } = imageApi;
