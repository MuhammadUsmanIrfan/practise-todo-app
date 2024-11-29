import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const jwtTokenValidation = createAsyncThunk("jwtTokenValidation", async(token)=>{
 const resp = await fetch("http://localhost:3000/validate", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, 
    },
  })
return await resp.json()
})

const initialState = {
  token: [localStorage.getItem("auth_token")],
  tokenValidateResponse : "",
}


export const userValidateSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers:(builder)=>{
    
      builder.addCase(jwtTokenValidation.fulfilled, (state, action)=>{
        state.tokenValidateResponse = action.payload
        state.token = localStorage.getItem("auth_token")
      });
      builder.addCase(jwtTokenValidation.rejected, (state, action)=>{
        state.tokenValidateResponse = action.payload
        state.token = localStorage.setItem("auth_token", "")
      })      
  },
  reducers: {
    setToken:  (state, action) => {
      state.token  = localStorage.getItem("auth_token")
    },
    resetToken:  (state, action) => {
      state.token  = ""
      localStorage.setItem("auth_token", "")
    },
    
  },
})

export const { setUserValidateResponse, setToken, resetToken} = userValidateSlice.actions

export default userValidateSlice.reducer
