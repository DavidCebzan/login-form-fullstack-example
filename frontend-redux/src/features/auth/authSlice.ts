import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type User = {
  name: string;
};

type AuthSlice = {
  user: User | null;
  token: string | null;
};

const initialState: AuthSlice = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthSlice>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    resetCredentials: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, resetCredentials } = authSlice.actions;

// todo
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
