import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const userAccessApi= createApi({
    reducerPath : "userAccess",
    baseQuery : fetchBaseQuery({baseUrl:import.meta.env.VITE_API_URL}),
    endpoints: (builder)=> ({
       
        getAllProducts : builder.query({
            query : ()=> "/products"
        }),

        
        userRegister: builder.mutation({
            query : (userDetails)=>({
                url: `signup`,
                method: "POST",
                header: { "Content-Type": "multipart/form-data" },
                body:userDetails
            })
        }),
    })
})

export const {useUserRegisterMutation} = userAccessApi