import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import authReducer from "./reducers/auth.reducer";
import movementsReducer from "./reducers/movements.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  movements: movementsReducer,
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    movements: movementsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
