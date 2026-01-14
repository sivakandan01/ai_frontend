import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ProjectRequest {
    prompt: string;
    tech_stack?: string;
}

interface ProjectResponse {
    project_id: string;
    message: string;
}

export const projectGeneratorApi = createApi({
    reducerPath: 'projectGeneratorApi',
    baseQuery: fetchBaseQuery({
        baseUrl: (import.meta.env.VITE_BASE_URL || 'http://localhost:8001').replace(/\/$/, ''),
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        generateProject: builder.mutation<ProjectResponse, ProjectRequest>({
            query: (body) => ({
                url: '/project-generator/generate',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGenerateProjectMutation } = projectGeneratorApi;
