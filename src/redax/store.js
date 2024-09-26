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


const psychologistsPersistConfig = {
  key: "psychologists",
  storage,
  whitelist: ["favorites"],
};

const persistedPsychologistsReducer = persistReducer(
    psychologistsPersistConfig,
    psychologistsReducer
);

export const store = configureStore({
  reducer: {
    psychologists: persistedPsychologistsReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
