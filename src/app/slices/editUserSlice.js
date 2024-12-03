import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const base_URL = import.meta.env.VITE_API_URL

export const getQrCodeApi = createAsyncThunk("getQrCodeApi", async(fromdata)=>{
  const resp = await fetch(`${base_URL}getqrcode`, {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${fromdata.token}`, 
     },
    
   })
   return await resp.json()
 })
export const setUserAuth = createAsyncThunk("setUserAuth", async(fromdata)=>{
  const resp = await fetch(`${base_URL}setusergoogleauth`, {
     method: 'PATCH',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${fromdata.token}`, 
     },
     body:JSON.stringify({user_value: fromdata.data.user_value })
   })
   return await resp.json()
 })

const initialState = {
  qrCodeResponse: {},
  setUserAuthResponse : {},
  userEditDetailsResponse: {}
}
  
export const editUserSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers:(builder)=>{
   
     builder.addCase(getQrCodeApi.fulfilled, (state, action)=>{
      
      state.qrCodeResponse = action.payload
    });
     builder.addCase(setUserAuth.fulfilled, (state, action)=>{
      
      state.setUserAuthResponse = action.payload
    });
    
},
  reducers: {
    
    // setcategory_name: (state , action) => {   
    //   state.category_name = action.payload
    // },
    setUserEditDetailsResponse: (state , action) => {   
      state.userEditDetailsResponse = action.payload
    },
    
  },
})

export const {setUserEditDetailsResponse } = editUserSlice.actions

export default editUserSlice.reducer