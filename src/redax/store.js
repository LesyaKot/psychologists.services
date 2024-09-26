import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { psychologistsReducer } from "./psychologists/slice";
import { authReducer } from "./auth/slice";

const psychologistsPersistConfig = {
  key: "psychologists",
  storage,
  whitelist: ["favorites"],
};

const persistedPsychologistsReducer = persistReducer(
  psychologistsPersistConfig,
  psychologistsReducer
);

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    psychologists: persistedPsychologistsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
