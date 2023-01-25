import { createSlice } from "@reduxjs/toolkit";
import { Movement } from "../../interfaces/movements.interfaces";
import { RootState } from "../index";

interface movementState {
  movements: Movement[];
  offSet: number;
  max: number;
  moreItems: boolean;
}

const initialState: movementState = {
  movements: [],
  offSet: 0,
  max: 10,
  moreItems: true,
};

const movementSlice = createSlice({
  name: "movement",
  initialState: initialState,
  reducers: {
    setMovements: (state, { payload }) => {
      const movements = payload;
      state.movements = [...state.movements, ...movements];
      state.offSet = state.movements.length;
      state.max = state.movements.length + 10;
      state.moreItems = movements.length ? true : false;
    },
  },
});

export const { setMovements } = movementSlice.actions;

export default movementSlice.reducer;

export const selectMovements = (state: RootState) => state.movements;
