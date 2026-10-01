import { combineReducers } from "@reduxjs/toolkit";

import { baseApi } from "@/services/base-api";

import authReducer from "./slices/auth/auth.slice";

export const rootReducer = combineReducers({
  auth: authReducer,

  [baseApi.reducerPath]: baseApi.reducer,
});