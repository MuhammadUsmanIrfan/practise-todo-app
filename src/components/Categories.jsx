import React, { useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' 
import { useUserValidateMutation } from '../app/apis/userAccess'
import { useSelector, useDispatch } from 'react-redux'
import { validateTheUser } from '../app/slices/userValidateSlice'
import { getAllCategories, addCategoriesResponse,delteCategoriesResponse,setEditCategoryBtn,setPrevCategory,setcategory_name,editCategoriesResponse} from '../app/slices/categoriesSlice'
import { useGetCategoriesMutation,useAddCategoriesApiMutation,useDeleteCategoriesApiMutation,useEditCategoriesApiMutation } from '../app/apis/categoriesApi'

const Categories = () => {
  
  const token = useSelector((state)=> (state.userValidateReducer.token ))
  const userValidateResponse = useSelector((state)=> state.userValidateReducer.userValidateResponse)
  const getCategory = useSelector((state)=> state.categoriesReducer.getCategories)
  const addCategory = useSelector((state)=> state.categoriesReducer.addCategory)
  const deleteCategory = useSelector((state)=> state.categoriesReducer.deleteCategory)
  const editCategory = useSelector((state)=> state.categoriesReducer.editCategory)
  const editCategoryBtn = useSelector((state)=> state.categoriesReducer.editCategoryBtn)
  const PrevCategory = useSelector((state)=> state.categoriesReducer.PrevCategory)
  const category_name = useSelector((state)=> state.categoriesReducer.category_name)

  /**
   * Here 👇 We getting all the APIs
   */
  const [userValidate] = useUserValidateMutation()
  const [getCategories] = useGetCategoriesMutation()
  const [addCategoriesApi] = useAddCategoriesApiMutation()
  const [deleteCategoriesApi] = useDeleteCategoriesApiMutation()
  const [editCategoriesApi] = useEditCategoriesApiMutation()
  // --------------***--------------


  const dispatch = useDispatch()
 
  const navigate = useNavigate()
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()


  useEffect(()=>{
    console.log("Categoires useEffect runs")
    if(token)
    {
      const validatingTheToken = async()=> {
        try {
        const validateToken = await  userValidate(token)
        dispatch(validateTheUser(validateToken.data))
        getCategories(token).then((resp)=>dispatch(getAllCategories(resp.data))).catch((err)=>console.error(err))

        } catch (err) {
          console.error(err)  
        }
          
      }
      
      validatingTheToken()
      // userValidate(token).then((resp)=>dispatch(validateTheUser(resp.data))).catch((err)=>console.error(err))
     

    } else{

    navigate("/login")
  }
  },[deleteCategory, addCategory, editCategory])
  
  const handleForm = async()=>{
    
    if (token) {     
        const addcategoryParametters = {
          token, formData:{category_name}
        }
        const addCategoriesApiResponse =  await addCategoriesApi(addcategoryParametters)
        dispatch(addCategoriesResponse(addCategoriesApiResponse))

          }else{
            navigate("/login")
          }       
  }

  const handleDelete=async (category_name)=>{
  
      
      if(token)
      {
        const data = {
          token,
          category_name,
        }
       
         const deleteCategoriesResponse= await deleteCategoriesApi(data)
         dispatch(delteCategoriesResponse(deleteCategoriesResponse))
        // fetch("http://localhost:3000/category/deletecategory", {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`, 
        //   },
        //   body: JSON.stringify(data),
        // }).then((resp)=>resp.json()).then((resp)=> setDeletecategory(resp)).catch((err)=>console.error("failed to add category", err.message))

      }else{
            navigate("/login")
          }   
  }

  const handleEditCategoryBtn =(category_name)=>{
   dispatch(setEditCategoryBtn(true))
   dispatch(setcategory_name(category_name))
   dispatch(setPrevCategory(category_name))
  }

  const handleUpdateBtn =async ()=>{
    dispatch(setEditCategoryBtn(false))
     
    const data = {
       category_name:PrevCategory,
       new_name:category_name,
    }
  
    if(token)
    {
      data.token =token
      const resp = await editCategoriesApi(data)
      dispatch(editCategoriesResponse(resp))

      dispatch(setcategory_name(""))
    }else{
          navigate("/login")
        } 

  }

  return (
    <>
      <div className='container px-4 py-4 md:py-12 md:px-12  h-[calc(100vh-4.5rem)]  bg-slate-600'>
      <h1 className='text-center text-4xl font-bold text-white'>Categories</h1>
            <h2 className='text-center text-xl font-bold text-white mt-10'>Add Category</h2>
            <form method="post" onSubmit={handleSubmit(handleForm)}>
          <div className='flex items-center justify-center gap-4 mt-8'>

            <div className="w-72">
                <input type="text" value={category_name} onChange={(event)=>dispatch(setcategory_name(event.target.value))} name='category_name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Category name' required/>
            </div>

            <div>
            <button type="submit" className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
            </div>
            {
              editCategoryBtn && <div>
              <button onClick={handleUpdateBtn} className="block text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Update</button>
          </div>
            }
            
          </div>
          </form>

          <div className='categories mt-10'>
             <ul className='flex flex-wrap gap-4 justify-center'>
              

                { getCategory?.data?.map(element => (
                    (element.is_deleted != true) ?  
                    <div className='w-fit flex items-center space-x-3 border border-gray-400 rounded-md p-2 hover:bg-slate-700' key={element._id}>
                      <li className='list-none block text-xl text-white bg-slate-950 w-[100%] p-2 rounded-md'>
                          {element.category_name}
                      </li> 
                      <button 
                          className='bg-red-600 px-3 rounded-md text-white font-medium text-xl hover:bg-red-800 py-2' 
                          onClick={() => handleDelete(element.category_name)}
                      >
                          Delete
                      </button>
                      <button 
                          className='bg-yellow-600 min-w-fit px-3 rounded-md text-white font-medium text-xl hover:bg-yellow-800 py-2'
                          onClick={()=>handleEditCategoryBtn(element.category_name)} 
                      >
                          Edit Category
                      </button>
                  </div> :null

                ))
                }
               
             </ul>
            </div>
      </div>
    </>
  )
}

export default Categories
