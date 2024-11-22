import { useState } from "react";

const useValidate = ()=>{

    const setUserDetails = {}
    const token = localStorage.getItem("auth_token")

    if (token) {
      fetch("http://localhost:3000/validate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
        .then((response) => response.json())
        .then((data) => {

          return data
          
        })
        .catch((err) => {
          console.error("Validation error:", err.message);

        });

    } else {
      console.error("invalid token")
    }
    
   
}

export default useValidate