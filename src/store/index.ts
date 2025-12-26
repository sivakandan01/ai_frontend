import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { messageApi } from '../services/api/message';
import { authApi } from '../services/api/auth';
import { ragApi } from '../services/api/rag';
import { userApi } from '../services/api/user';
import { imageApi } from '../services/api/image';
import { mermaidApi } from '../services/api/mermaid';
import userReducer from './slices/userSlice';

const userPersistConfig = {
  key: 'user',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [ragApi.reducerPath]: ragApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [imageApi.reducerPath]: imageApi.reducer,
    [mermaidApi.reducerPath]: mermaidApi.reducer,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(messageApi.middleware, authApi.middleware, ragApi.middleware, userApi.middleware, imageApi.middleware, mermaidApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
