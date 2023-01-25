import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Me } from "../../interfaces/auth.interfaces";

interface authState {
  user: Me | null;
  isLoading: boolean;
  error: unknown;
  token: string | null;
}

const initialState: authState = {
  user: null,
  isLoading: false,
  error: undefined,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
