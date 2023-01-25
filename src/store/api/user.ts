import { apiSlice } from "./api";
import { LoginResponse, MeResponse } from "../../interfaces/auth.interfaces";
import { setCredentials, setUser } from "../reducers/auth.reducer";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: ({ email, password }) => ({
          url: `login`,
          method: "POST",
          body: {
            username: email,
            password,
          },
        }),
        async onQueryStarted(args, { queryFulfilled, dispatch }) {
          try {
            const data = await queryFulfilled;
            dispatch(setCredentials(data.data.access_token));
          } catch (error) {}
        },
      }
    ),
    getMe: builder.mutation<MeResponse, {}>({
      query: () => ({
        url: `me`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          dispatch(setUser(data.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeMutation, useLoginMutation } = usersApiSlice;
