import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  password: false,
  user: false
}

export const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    checkPassword: (state) => {
      state.password = true
    },
    checkPassword2: (state) => {
      state.password = false
    },
    checkUser: (state) => {
      state.user = true
    },
    checkUser2: (state) => {
      state.user = false
    },
    
  },
})


export const {  checkPassword, checkUser,checkPassword2, checkUser2 } = signUpSlice.actions

export default signUpSlice.reducer