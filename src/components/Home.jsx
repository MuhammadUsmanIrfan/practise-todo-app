import React, { useEffect, useState } from 'react'

const Home = () => {
  
  const [userDetails, setUserDetails] = useState({})
  const [loading, setLoading] = useState(true)


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
    }
   
  },[])

  return (
    <>
      <div className='container px-4 py-4 md:py-12 md:px-12  h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600'>
      <h1 className='text-center text-2xl font-bold'>Home Page</h1>
      </div>
    </>
  )
}

export default Home
