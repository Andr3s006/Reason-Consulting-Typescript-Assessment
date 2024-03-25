import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../lib/applicationTypes";

export type UserSlice = {
  user: User | null;
}

const initialState: UserSlice = {
  user: {
    id: "user-1",
    name: "Nate Filer",
    email: "taxpayer@example.com",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const {
  setUser,
} = userSlice.actions;

// Selectors

export const selectCurrentUser = ({ user }: RootState) => user.user;

export default userSlice;
