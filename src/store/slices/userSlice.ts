import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  provider: string;
  model: string;
  image_provider: string;
  mermaid_model: string;
  theme: 'light' | 'dark';
  isAuth: boolean;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  provider: 'groq',
  model: 'llama-3.3-70b-versatile',
  image_provider: 'pollinations',
  mermaid_model: 'llama-3.3-70b-versatile',
  theme: 'dark',
  isAuth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    updateProviderModel: (state, action: PayloadAction<{ provider?: string; model?: string }>) => {
      if (action.payload.provider) state.provider = action.payload.provider;
      if (action.payload.model) state.model = action.payload.model;
    },
    updateImageProvider: (state, action: PayloadAction<string>) => {
      state.image_provider = action.payload;
    },
    updateMermaidModel: (state, action: PayloadAction<string>) => {
      state.mermaid_model = action.payload;
    },
    updateTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateProviderModel, updateImageProvider, updateMermaidModel, updateTheme, clearUser } = userSlice.actions;
export default userSlice.reducer;