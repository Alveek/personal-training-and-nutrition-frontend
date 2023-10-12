import { configureStore } from '@reduxjs/toolkit';
import landing from './slices/landingPageSlice.ts';
import currentClientReducer from './slices/clientSlice.ts';
import modalReducer from './slices/modalsSlice.ts';
import userReducer from './slices/userSlice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { loginMiddleware, refreshMiddleware } from './middleware/tokensStorage.ts';
import { userApi } from './services/userApi.ts';
import { combinedApi } from './services/combinedApi.ts';

export const store = configureStore({
  reducer: {
    [combinedApi.reducerPath]: combinedApi.reducer,
    [userApi.reducerPath]: combinedApi.reducer,
    landing,
    user: userReducer,
    currentClient: currentClientReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([combinedApi.middleware, loginMiddleware.middleware, refreshMiddleware.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
