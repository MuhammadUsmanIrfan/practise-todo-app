import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const base_URL = import.meta.env.VITE_API_URL

const initialState = {
    checkLogin: false,
    checkGooleAuth: false,
    OtpVerificationResponse: {}
}

export const OtpVerification = createAsyncThunk("OtpVerification", async(fromdata)=>{

  
  const resp = await fetch(`${base_URL}otpverification`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${fromdata.token}`, 
     },
     body:JSON.stringify({"user_otp": String(fromdata.data.code) })
   })
   return await resp.json()
 })


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers:(builder)=>{
   
    builder.addCase(OtpVerification.fulfilled, (state, action)=>{
     
     state.OtpVerificationResponse = action.payload
   });
   
   
},
  reducers: {
    setCheckLoginTrue: (state, action) => {
      state.checkLogin = action.payload
    },
    setCheckGooleAuth: (state, action) => {
      state.checkGooleAuth = action.payload
    },

  },
})

export const { setCheckLoginTrue,setCheckGooleAuth } = loginSlice.actions

export default loginSlice.reducer