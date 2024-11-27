import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux'
import {  checkPassword, checkUser, checkPassword2, checkUser2} from "../app/slices/signUpSlice"
import { useUserRegisterMutation } from '../app/apis/userAccess'


  const SignUp = () => {

  
  const password = useSelector((state) => state.signUpReducer.password)
  const user = useSelector((state) => state.signUpReducer.user)
  const dispatch = useDispatch()

  const navigate = useNavigate();
 
  const [userRegister] = useUserRegisterMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  
  async function handleForm(data){
      
    if(data.password !== data.r_password)
    {
      dispatch(checkPassword())
    }else{
      
      dispatch(checkPassword2())
      const formData = new FormData();
        
      
      formData.append('first_name', data.first_name);
      formData.append('last_name', data.last_name);
      formData.append('email', data.email);
      formData.append('file', data.file[0]);  
      formData.append('password', data.password);
      formData.append('phone_num', data.phone_num);
      
      const userRegisterResponse = await userRegister(formData)


      
      
      if(userRegisterResponse?.data.status === 201)
        {

          navigate("/login")
          dispatch(checkUser2())
          
        } else{
          dispatch(checkUser())
        }
    }


  }
  
  return (
    <>
    <div className='container px-4 py-4 md:py-12 md:px-12  min-h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600'>
    <h1 className='text-center text-2xl font-bold text-white'>SignUp Page</h1>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(handleForm)} method='POST' encType="multipart/form-data">

        {user && <h2 className='text-red-900 text-center mt-4 font-bold'>***This user is already registerd***</h2>}

      <div className='flex gap-12 mt-5'>

        <div className="mb-5">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
          <input type="first_name" id="first_name"{...register("first_name")} name='first_name' className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>

        <div className="mb-5">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
          <input type="last_name" id="last_name" name='last_name' {...register("last_name")}className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
        </div>
  

        <div className="mb-5">
          <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Image</label>
          <input type="file" id="file"name='file' {...register("file")}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" name='email' {...register("email")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>

        <div className="mb-5">
          <label htmlFor="phone_num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Mobile Number</label>
          <input type="number" id="phone_num" name='phone_num' {...register("phone_num")}className="no-spinner shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>

        <div className='md:flex gap-12'>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" autoComplete='on' id="password" name='password' {...register("password")} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          {password && <span className='text-red-900'>*Password not matching*</span>}
          
        </div>

        <div className="mb-5">
          <label htmlFor="r_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
          <input type="password" autoComplete='on' id="r_password" name='r_password' {...register("r_password")}className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          {password && <span className='text-red-900'>*Password not matching*</span>}
        </div>

        </div>
        
        <div className='flex justify-between '>

            <button type="submit" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
            
            <button className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"><a target='_blank' href="http://localhost:3000/loginwithgoogle">Sign up with Google</a></button>

        </div>

      </form>
    </div>
  </>
  )
}

export default SignUp
