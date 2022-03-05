import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { moviesService } from "../services/movies.service";
import { personsService } from "../services/persons.service";
import filterReducer from "./filters";

export const store = configureStore({
  reducer: {
    [moviesService.reducerPath]: moviesService.reducer,
    [personsService.reducerPath]: personsService.reducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      moviesService.middleware,
      personsService.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
