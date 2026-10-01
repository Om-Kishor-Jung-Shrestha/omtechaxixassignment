import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  UserResponseDto,
} from "@/features/auth/types/auth.types";

interface AuthState {
  user: UserResponseDto | null;
  isAuthenticated: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  initialized: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (
      state,
      action: PayloadAction<UserResponseDto>
    ) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setInitialized: (state) => {
      state.initialized = true;
    },
  },
});

export const {
  setUser,
  clearAuth,
  setInitialized,
} = authSlice.actions;

export default authSlice.reducer;