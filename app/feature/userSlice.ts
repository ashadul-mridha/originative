import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id: string;
  name: string;
  phone: string;
}

const initialState: UserState = {
  id: "",
  name: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    userSliceData: (state, action: PayloadAction<UserState>) => {
      (state.id = action.payload.id),
        (state.name = action.payload.name),
        (state.phone = action.payload.phone);
    },
  },
});

// Action creators are generated for each case reducer function
export const { userSliceData } = userSlice.actions;

export default userSlice.reducer;
