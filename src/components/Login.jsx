import React, { useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' 
import { setCheckLoginTrue,setCheckGooleAuth,OtpVerification } from '../app/slices/LoginSlice'
import { setUserValidateResponse, setToken, resetToken } from '../app/slices/userValidateSlice'
import { useUserLoginMutation } from '../app/apis/userAccess'


const Login = () => {

  const loginStatus = useSelector((state)=> state.loginReducer.checkLogin)
  const checkGooleAuth = useSelector((state)=> state.loginReducer.checkGooleAuth)
  const OtpVerificationResponse = useSelector((state)=> state.loginReducer.OtpVerificationResponse)

  // const token = useSelector((state) => state.userValidateReducer.token);


  const dispatch = useDispatch();
  const [userLogin] = useUserLoginMutation()

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    if (tokenFromUrl) {
      
      localStorage.setItem('auth_token', tokenFromUrl);
      navigate("/")
      // location.reload()

    }
  }, []);

  const handleForm =async(data)=>{

      const userLoginResponse = await userLogin(data)
      
      if(userLoginResponse?.data?.status == 200)
      {
        dispatch(setCheckLoginTrue(false))
        localStorage.setItem("auth_token", userLoginResponse?.data.auth_token);
        dispatch(setToken( userLoginResponse?.data.auth_token))
        if(userLoginResponse?.data?.data.google_auth)
        {
          dispatch(setCheckGooleAuth(true))

        } else {
          dispatch(setCheckGooleAuth(false))
          navigate("/")
          // location.reload()
        }
      }else{
        dispatch(setCheckLoginTrue(true))
      }

     
  }

  const handleCode =async(data)=>{

      // alert(data.code)
      const token = localStorage.getItem("auth_token")
      const fromData = {
          token,
          data : {
            code: data.code
          }
      }
      dispatch(OtpVerification(fromData))
      console.log(OtpVerificationResponse)
      if(OtpVerificationResponse?.status == 200)
      {
        navigate("/")
        // location.reload()
      } else
      {
        dispatch(setCheckLoginTrue())
      }
      // const userLoginResponse = await userLogin(data)
      // console.log(userLoginResponse)
      // if(userLoginResponse?.data.status == 200)
      // {
      //   localStorage.setItem("auth_token", userLoginResponse?.data.auth_token);
      //   navigate("/")
      //   location.reload()
      // }else{
      //   dispatch(setCheckLoginTrue())
      // }
  }

  
  
  return (
    <>
    <div className='container px-4 py-4 md:py-12 md:px-12  min-h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600'>
    <h1 className='text-center text-2xl font-bold text-white'>Login Page</h1>
    
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit(handleCode)}> 
    {checkGooleAuth && 
      <>
      <div className="mb-5">
          <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter code to login</label>
          <input type="number" id="code" name='code' {...register("code")} className="no-spinner bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
         {loginStatus && <p className='text-red-900 font-medium my-2'>***Worng OTP Please Enter Again***</p>} 
      </div>
      
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Proceed to login</button>
      </>
    }
    </form>
      {(!checkGooleAuth) ? 
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit(handleForm)}>
      
      {loginStatus && <h2 className='text-red-900 text-center mt-4 font-bold'>***Email or Password worng***</h2>}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" name='email' {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" autoComplete="on" name='password' {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
          
      </form>
      : null}
      {(!checkGooleAuth) ? 
      <div className="max-w-sm mx-auto mt-2">
      <button className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" ><a href="http://localhost:3000/loginwithgoogle" >Login with Google</a></button>
      </div>
      : null}
    </div>
  </>
  )
}

export default Login
