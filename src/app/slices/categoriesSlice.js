import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  getCategories: {},
  addCategory: {},
  deleteCategory: {},
  editCategory: {},
  editCategoryBtn: false,
  PrevCategory: "",
  category_name: ""
}

export const categoriesSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getAllCategories: (state , action) => {
      state.getCategories = action?.payload
    },
    addCategoriesResponse: (state , action) => {
      state.addCategory = action.payload
    },
    delteCategoriesResponse: (state , action) => {
      state.deleteCategory = action.payload
    },
    editCategoriesResponse: (state , action) => {
      state.editCategory = action.payload
    },
    setEditCategoryBtn: (state , action) => {   
      state.editCategoryBtn = action.payload
    },
    setPrevCategory: (state , action) => {   
      state.PrevCategory = action.payload
    },
    setcategory_name: (state , action) => {   
      state.category_name = action.payload
    },
    
  },
})

export const { getAllCategories , addCategoriesResponse,delteCategoriesResponse, setEditCategoryBtn, setPrevCategory,setcategory_name,editCategoriesResponse} = categoriesSlice.actions

export default categoriesSlice.reducer