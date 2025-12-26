import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface UpdateUserRequest {
  provider?: string;
  model?: string;
  image_provider?: string;
  mermaid_model?: string;
}

interface UpdateUserResponse {
  success: boolean;
  message: string;
  user?: {
    provider: string;
    model: string;
  };
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (data) => ({
        url: "/users/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateUserMutation } = userApi;