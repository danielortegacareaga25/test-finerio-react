import { apiSlice } from "./api";
import { MovementsRespose } from "../../interfaces/movements.interfaces";
import { setMovements } from "../reducers/movements.reducer";

export const mpvementesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovements: builder.mutation<
      MovementsRespose,
      { id: string; offSet: number; max: number }
    >({
      query: ({ id, offSet, max }) => ({
        url: `/users/${id}/movements?deep=true&offset=${offSet}&max=${max}&includeCharges=true&includeDeposits=true&includeDuplicates=true`,
        method: "GET",
      }),
      async onQueryStarted(args, { queryFulfilled, dispatch }) {
        try {
          const data = await queryFulfilled;
          console.log("data", data);
          dispatch(setMovements(data.data.data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMovementsMutation } = mpvementesApiSlice;
