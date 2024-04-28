import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

const initialState: UserState = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    userSliceData: (state, action: PayloadAction<UserState>) => {
      (state.id = action.payload.id),
        (state.first_name = action.payload.first_name),
        (state.last_name = action.payload.last_name);
        (state.email = action.payload.email),
        (state.phone = action.payload.phone);
    },
  },
});

// Action creators are generated for each case reducer function
export const { userSliceData } = userSlice.actions;

export default userSlice.reducer;
