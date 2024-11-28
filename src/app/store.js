import { configureStore } from '@reduxjs/toolkit'
import  signUpReducer from "./slices/signUpSlice"
import loginReducer from "./slices/LoginSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { userAccessApi } from './apis/userAccess';

export const store = configureStore({
  
  reducer: {
    signUpReducer : signUpReducer,
    loginReducer :  loginReducer,
    [userAccessApi.reducerPath] : userAccessApi.reducer
  },


  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(userAccessApi.middleware),
})

setupListeners(store.dispatch)