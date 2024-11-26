import React, { useState,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' 

const EditUserDetails = () => {

  const [userDetails, setUserDetails] = useState({})
  const [token, setToken] = useState(localStorage.getItem("auth_token"))

  const [toggleChangPassord , setToggleChangPassord] = useState(false)
  const [checkPassword , setCheckPassword] = useState(false)
  const [checkOldPassword , setCheckOldPassword] = useState(false)
  

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(()=>{
    
    if(token)
      {
        const response = fetch("http://localhost:3000/validate", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, 
          },
      }).then((response)=> response.json()).then((data)=>{
        if(data.status == 200)
        {
          setUserDetails(data)
          
        } else{
          navigate("/login")
        }
      }).catch((err)=>{
          console.error(err)
      });
      } else{
        navigate("/login")
      }
  },[])



  const handleForm =async (data)=>{

    const formData = new FormData();
          
    formData.append('first_name', (data.first_name) ? data.first_name: "");
    formData.append('last_name', (data.last_name) ? data.last_name: "");
    formData.append('number', (data.number) ? data.number: null);
    formData.append('file', (data.file[0]) ? data.file[0] : null);  
    
    if(token)
    {
    const userSubmitData = await fetch("http://localhost:3000/edituserdetails",{
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
      body:formData,
    })
    const userEditDetailsResponse = await userSubmitData.json()
   
    if(userEditDetailsResponse.status == 201)
    {
      location.reload()
    }

    } else {
      navigate("/login")
    }

  }


  const handleChangePassword =async (data)=>{
 
   if(data.new_password == data.r_password)
    {
      setCheckPassword(false)
      const formData = {
        old_password : data.old_password,
        new_password : data.new_password
      }
          
    if(token)
    {
    const userSubmitData = await fetch("http://localhost:3000/changeuserpassowrd",{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body:JSON.stringify(formData),
    })
    const userEditDetailsResponse = await userSubmitData.json()
   
    console.log(userEditDetailsResponse.status)
    if(userEditDetailsResponse.status == 200)
    {
      localStorage.setItem("auth_token", "")
      location.reload()
    } else
    {
      setCheckOldPassword(true)
    }

    } else {
      navigate("/login")
    }


    }else 
    {
      setCheckPassword(true)
      
    }    

  }

  return (
    <>

      <div className='container px-4 py-4 md:py-12 md:px-12  min-h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600 relative'>
      <div className='bg-slate-700 min-h-[100vh] w-[12%] absolute left-0 top-0'>
              <p onClick={()=>setToggleChangPassord(false)} className='cursor-pointer py-3 px-2 font-medium hover:underline text-yellow-500'>Change user details</p>
              <p onClick={()=>setToggleChangPassord(true)} className='cursor-pointer py-3 px-2 font-medium hover:underline text-yellow-500'>Change Password</p>              
      </div>
      
        {
          toggleChangPassord ? <>
            <h1 className='text-center text-4xl font-bold text-white'>Change Password</h1>
            <form className="max-w-sm mx-auto " onSubmit={handleSubmit(handleChangePassword)} method='POST'>

            
              <div className="mb-5 mt-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">old password</label>
                <input autoComplete='new-password' type="password" id="password" name='old_password' {...register("old_password")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                {checkOldPassword && <span className='text-red-900'>*wrong password*</span>}
                               
              </div>

              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">new password</label>
                <input autoComplete='new-password' type="password" id="new_password" name='new_password' {...register("new_password")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                {checkPassword && <span className='text-red-900'>*Password not matching*</span>}
                
              </div>

              <div className="mb-5">
                <label htmlFor="r_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                <input autoComplete='new-password' type="password" id="r_password" name='r_password' {...register("r_password")}className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                {checkPassword && <span className='text-red-900'>*Password not matching*</span>}
              </div>
        
  
            <div className='flex justify-center '>
                <button type="submit" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change password</button>
            </div>

          </form>
          </> :<>
          <h1 className='text-center text-4xl font-bold text-white'>Edit User Details</h1>
          <form className="max-w-sm mx-auto " onSubmit={handleSubmit(handleForm)} method='POST' encType="multipart/form-data">
    
          <div className='w-36 h-36 bg-slate-300 rounded-md absolute right-10'>
          {(String(userDetails?.data?.profile_image).startsWith("https")) ? <img src={`${userDetails?.data?.profile_image}`} className="h-full w-full rounded-md" alt="User Avatar" /> : (userDetails?.data?.profile_image) ? <img src={`http://localhost:3000/${userDetails?.data?.profile_image}`} className="h-full w-full rounded-md" alt="User Avatar" /> :<img src="placeholder.jpg" className="h-full w-full rounded-md" alt="User Avatar" /> }
          </div>
       
          <div className='flex gap-12 mt-5'>
            <div className="mb-5">
              <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
              <input type="first_name" id="first_name"{...register("first_name")}  name='first_name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>

            <div className="mb-5">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
              <input type="last_name" id="last_name" name='last_name' {...register("last_name")}className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"/>
            </div>
          </div>

          {((userDetails?.data?.phone_num?.number == 0) || (userDetails?.data?.phone_num?.number_verified == false)) ?  <div className="mb-5">
          <label htmlFor="phone_num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Mobile Number</label>
          <input type="number" id="phone_num" name='phone_num' {...register("number")}className="no-spinner shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
        </div> : null}
         
          <div className="mb-5">
            <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
            <input type="file" id="file"name='file' {...register("file")}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
          </div>
        
          <div className='flex justify-between '>

              <button type="submit" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update details</button>

          </div>

      </form>

          </>

        }
      
      </div>
    </>
  )
}

export default EditUserDetails
