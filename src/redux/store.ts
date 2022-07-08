import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userProgressReducer, {UserProgressSliceState} from "./features/UserProgress/userProgressSlice";
import appReducer, {AppSliceState} from "./features/App/appSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {REGISTER} from "redux-persist/es/constants";
import {FLUSH, PAUSE, PERSIST, persistStore, PURGE, REHYDRATE} from "reduxjs-toolkit-persist";

export interface AppState {
  app: AppSliceState,
  userProgress: UserProgressSliceState
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  app: appReducer,
  userProgress: userProgressReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]},
      })
})

export const persistor = persistStore(store);

export default store;
