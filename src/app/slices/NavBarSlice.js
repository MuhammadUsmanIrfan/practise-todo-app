import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    toggle: true,
    userDetails:{},
    showEdit: false
}

export const NavBarSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setToggle: (state , action) => {
      state.toggle = action.payload
    },
    setUserDetails: (state , action) => {
      state.userDetails = action.payload
    },
    setShowEdit: (state , action) => {
      state.showEdit = action.payload
    },
  },
})

export const { setToggle,  setShowEdit,setUserDetails  } = NavBarSlice.actions

export default NavBarSlice.reducer