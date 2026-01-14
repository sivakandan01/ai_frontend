import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { User } from "@/types/user";

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
    getUsers: builder.query<User[], string | void>({
      query: (search) => ({
        url: "/users/",
        params: search ? { search } : {},
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: (data) => ({
        url: "/users/",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;