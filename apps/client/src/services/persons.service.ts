import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PersonRelation } from "../types/person.dto";

export const personsService = createApi({
  reducerPath: "personsService",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: ["Person"],
  endpoints: (builder) => ({
    getPeople: builder.query<
      PersonRelation[],
      { movie_id: number | undefined }
    >({
      query: ({ movie_id }) => `/person?movie_id=${movie_id}`,
      providesTags: ["Person"],
    }),
  }),
});

export const { useGetPeopleQuery } = personsService;
