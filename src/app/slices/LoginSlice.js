import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checkLogin: false,
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setCheckLoginTrue: (state) => {
      state.checkLogin = true
    },
  },
})

export const { setCheckLoginTrue } = loginSlice.actions

export default loginSlice.reducer