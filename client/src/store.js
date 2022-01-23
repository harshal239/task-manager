import { configureStore } from "@reduxjs/toolkit";
import { TaskApi } from "./services/TaskApi";

export const store = configureStore({
  reducer: {
    [TaskApi.reducerPath]: TaskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TaskApi.middleware),
});
