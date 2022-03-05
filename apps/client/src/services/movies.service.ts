import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../types/movie.dto";

export const moviesService = createApi({
  reducerPath: "moviesService",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    getMovies: builder.query<
      Movie[],
      { start_year: number | undefined; end_year: number | undefined }
    >({
      query: ({ start_year, end_year }) =>
        `/movie?start_year=${start_year}&end_year=${end_year}`,
      providesTags: ["Movie"],
    }),
  }),
});

export const { useGetMoviesQuery } = moviesService;
