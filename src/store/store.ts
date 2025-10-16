import { configureStore } from "@reduxjs/toolkit";
import { matchGamesApi } from "../shared/api/matchGamesApi";

export const store = configureStore({
  reducer: {
    [matchGamesApi.reducerPath]: matchGamesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(matchGamesApi.middleware),
});
