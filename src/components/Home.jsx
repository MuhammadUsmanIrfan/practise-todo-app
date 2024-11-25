import React, { useEffect, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { TiTick } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(()=>{
    
    const token = localStorage.getItem("auth_token")

    if(token)
    {
      const response = fetch("http://localhost:3000/validate", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
        },
    }).then((response)=> response.json()).then((data)=>{
      setUserDetails(data)
      setLoading(false)
    }).catch((err)=>{
      setLoading(true)
      console.log(err)
    });
    } else{
      navigate("/login")
    }
   
  },[])

  return (
    <>
      <div className='container px-4 py-4 md:py-12 md:px-12  min-h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600'>
      <h1 className='text-center text-4xl font-bold text-white'>Home Page</h1>
       <hr className='my-12'/>
       <div className='flex justify-between bg-slate-500 rounded-xl flex-wrap'>
          <div className='pl-5 pt-3'>
              <h1 className='text-2xl font-bold text-white underline underline-offset-4'>Personal Details</h1>
                <p className='text-2xl font-medium text-white my-4'>First name: <span className='text-slate-950 text-xl'>{userDetails?.data?.first_name }</span></p>
                <p className='text-2xl font-medium text-white my-4'>Last name: <span className='text-slate-950 text-xl'>{userDetails?.data?.last_name }</span></p>

                <p className='text-2xl font-medium text-white my-4'>Email: <span className='text-slate-950 text-xl'>{userDetails?.data?.email}</span></p>

                <p className='text-2xl font-medium text-white my-4 flex items-center'>Account verified: 
                  {(userDetails?.data?.is_verified) ? <span className='text-slate-950 text-xl px-3 flex items-end gap-2'>verified <TiTick className="bg-green-500 text-white rounded-full text-2xl"/></span> : <span className='text-slate-950 text-xl px-3 flex items-end gap-2'>not verified <ImCross className='bg-red-500 text-white rounded-full text-2xl'/></span>} 
                </p>
                <p className='text-2xl font-medium text-white my-4'>phone_num: <span className='text-slate-950 text-xl'>{userDetails?.data?.phone_num?.number}</span></p>

                <p className='text-2xl font-medium text-white my-4 flex items-center'>Phone number verified: 
                  {(userDetails?.data?.phone_num?.number_verified) ? <span className='text-slate-950 text-xl px-3 flex items-end gap-2'>verified <TiTick className="bg-green-500 text-white rounded-full text-2xl"/></span> : <span className='text-slate-950 text-xl px-3 flex items-end gap-2'>not verified <ImCross className='bg-red-500 text-white rounded-full text-2xl'/></span>} 
                </p>
          </div>
            <div className='w-36 h-36 pr-5 pt-3 bg-slate-500 rounded-lg'>
            {(userDetails?.data?.profile_image) ?<img src={`http://localhost:3000/${userDetails?.data?.profile_image}`} className="h-full w-full rounded-lg" alt="User Avatar" /> : <img src="placeholder.jpg" className="h-full w-full rounded-lg" alt="User Avatar" />}
            </div>
          </div>
          <hr className='my-12'/>
          <div className='container-edit-details'>
            <div>
                  <button className='bg-green-700 py-2 px-4 rounded-lg text-white font-semibold'>Get verfication Link</button>
            </div>
            <div className="mb-5">
              <label htmlFor="phone_num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Mobile Number</label>
              <input type="number" id="phone_num" name='phone_num' className="no-spinner shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
        </div>
          </div>
      </div>
    </>
  )
}

export default Home
