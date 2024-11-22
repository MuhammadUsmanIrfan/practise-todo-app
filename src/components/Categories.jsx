import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' 

const Categories = () => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [categoryResponse , setCategoryResponse] = useState({})
  const [getCategory , SetgetCategory] = useState({})
  const [deletecategory, setDeletecategory] = useState({})

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleForm = async(formData)=>{
    
    if (token) {
     
            fetch("http://localhost:3000/category/addcategory", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
              },
              body: JSON.stringify(formData),
            }).then((resp)=>resp.json()).then((resp)=> setCategoryResponse(resp)).catch((err)=>console.error("failed to add category", err.message))

          } else{
            navigate("/login")
          }       
    
  }

  useEffect(()=>{

    if(token)
    {
    fetch("http://localhost:3000/category/getcategories?page=1&limit=20", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
     
    }).then((resp)=>resp.json()).then((resp)=>{SetgetCategory(resp)}).catch((err)=>console.error("failed to add category", err.message))


  } else{
   
    navigate("/login")
  }
  },[categoryResponse,deletecategory])

  const handleDelete=(category_name)=>{
  
      const data = {
        category_name
      }
     
      if(token)
      {

        fetch("http://localhost:3000/category/deletecategory", {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(data),
        }).then((resp)=>resp.json()).then((resp)=> setDeletecategory(resp)).catch((err)=>console.error("failed to add category", err.message))

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
                <input type="text" {...register("category_name")} name='category_name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Category name' required/>
            </div>

            <div>
            <button type="submit" className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add</button>
            </div>
          </div>
          </form>

          <div className='categories mt-10'>
             <ul className='flex flex-wrap gap-4 justify-center'>
              
                { getCategory?.data?.map(element => (
                    (element.is_deleted != true) ?  
                    <div className='w-[25%] flex items-center gap-3' key={element._id}>
                    <li className='list-none block text-xl text-white bg-slate-950 w-[100%] p-2 rounded-md'>{element.category_name}</li> <button className='bg-red-600 px-3 rounded-md text-white font-medium text-xl hover:bg-red-800 py-2' onClick={()=>handleDelete(element.category_name)}>Delete</button>
                    </div> : null

                ))
                }
               
             </ul>
            </div>
      </div>
    </>
  )
}

export default Categories
