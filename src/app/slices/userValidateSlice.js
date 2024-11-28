import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  token: [localStorage.getItem("auth_token")],
  userValidateResponse : "",
}

export const userValidateSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    validateTheUser:  (state, action) => {
      state.userValidateResponse  = action.payload
    },
  },
})

export const { validateTheUser } = userValidateSlice.actions

export default userValidateSlice.reducer
