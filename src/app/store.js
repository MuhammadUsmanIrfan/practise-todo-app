import { configureStore } from '@reduxjs/toolkit'
import  signUpReducer from "./slices/signUpSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAccessApi } from './apis/userAccess';

export const store = configureStore({
  
  reducer: {
    signUpReducer : signUpReducer,
    [userAccessApi.reducerPath] : userAccessApi.reducer
  },


  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userAccessApi.middleware),
})

setupListeners(store.dispatch)