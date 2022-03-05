import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { PersonRelation, PersonRelationMovie } from "../types/person.dto";

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

export const getMovieByPerson = async (
  person_id: number
): Promise<PersonRelationMovie[] | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/person/${person_id}`
  );

  if (response.status !== 200) {
    return null;
  }

  const data = response.json();
  return data;
};

export const { useGetPeopleQuery } = personsService;
