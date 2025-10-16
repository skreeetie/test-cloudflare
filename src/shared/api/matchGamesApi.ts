import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export type MatchGame = {
  id: number;
  left: string;
  right: string;
};

type MatchGameOptional = {
  id: number;
  left?: string;
  right?: string;
};

const API_BASE_URL = import.meta.env.API_BASE_URL || "";

export const matchGamesApi = createApi({
  reducerPath: "matchGames",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/` }),
  tagTypes: ["MatchGames"],
  endpoints: (builder) => ({
    getMatchGames: builder.query<MatchGame[], void>({
      query: () => "matchgame",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "MatchGames" as const,
                id,
              })),
              { type: "MatchGames", id: "LIST" },
            ]
          : [{ type: "MatchGames", id: "LIST" }],
    }),
    addMatchGame: builder.mutation<MatchGame, MatchGame>({
      query: (newGame) => ({
        url: "matchgame",
        method: "POST",
        body: newGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
    deleteMatchGame: builder.mutation<MatchGame, number>({
      query: (id) => ({
        url: `matchgame/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
    updateMatchGame: builder.mutation<MatchGame, MatchGameOptional>({
      query: (newGame) => ({
        url: "matchgame",
        method: "PATCH",
        body: newGame,
      }),
      invalidatesTags: [{ type: "MatchGames", id: "LIST" }],
    }),
  }),
});

export const {
  useGetMatchGamesQuery,
  useAddMatchGameMutation,
  useDeleteMatchGameMutation,
  useUpdateMatchGameMutation,
} = matchGamesApi;
