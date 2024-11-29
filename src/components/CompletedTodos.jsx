import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { resetToken, jwtTokenValidation } from '../app/slices/userValidateSlice.js'
import { getAllCategoriesApi } from "../app/slices/categoriesSlice.js";
import { getAllTodosApi, deleteTodoApi, setTodocompletedApi} from "../app/slices/TodoSlice.js";



const CompletedTodos = () => {


  const token = useSelector((state)=> (state.userValidateReducer.token ))
  const tokenValidateResponse = useSelector((state)=> state.userValidateReducer.tokenValidateResponse)
  const getTodos = useSelector((state)=> state.todoReducer.getTodos)
  const todoResponse = useSelector((state)=> state.todoReducer.todoResponse)
  const completeTodo = useSelector((state)=> state.todoReducer.completeTodo)
  const deleteTodo = useSelector((state)=> state.todoReducer.deleteTodo)
  // const getCategory = useSelector((state)=> state.categoriesReducer.getCategories)
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(jwtTokenValidation(token))
  },[ token])

  useEffect(() => {
   
      if(tokenValidateResponse?.error?.status == 400 || tokenValidateResponse.success === false)
      {
        dispatch(resetToken())
        navigate("/login")
      }else{ 
        dispatch(getAllCategoriesApi(token))
        dispatch(getAllTodosApi(token))
      }

  }, [todoResponse, completeTodo, deleteTodo]);

  
  const handleComplete = (e, id) => {
   
    if (token) {
        const formData = {
          token,
          data : {
            editTodoID: id,
            value: String(e.target.checked)}
        }
        dispatch(setTodocompletedApi(formData))
    } else {
      navigate("/login");
    }
  };

  const handleDeleteTodo = (item) => {
    
    if (token) {
      const formData = {
        token,
        data : {
          todoID: item._id,
        }
      }
  
      dispatch(deleteTodoApi(formData))
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="container px-4 py-4 md:py-12 md:px-12 h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600">
        <h1 className="text-center text-2xl font-bold text-white">
          Completed Todos Page
        </h1>
        <div className="categories mt-10">
          <ul className="flex flex-wrap gap-4 ">
            {getTodos?.data?.map((item) =>
              item.is_completed == true ? (
                <div
                  key={item._id}
                  className="w-fit flex items-center justify-center gap-3 border border-gray-400 rounded-md p-2 hover:bg-slate-700"
                >
                  <p className="bg-gray-800 opacity-50 text-white p-2 rounded-md w-fit">
                    {item.category[0].category_name}
                  </p>
                  <li className="list-none block text-xl text-white bg-slate-950  p-2 rounded-md w-fit">
                    {item.todo}
                  </li>{" "}
                  <button
                    className="bg-red-600 px-3 rounded-md text-white font-medium text-xl hover:bg-red-800 py-2"
                    onClick={() => handleDeleteTodo(item)}
                  >
                    Delete
                  </button>{" "}
                  <input
                    type="checkbox"
                    name="is_completed"
                    checked
                    onChange={(event) => handleComplete(event, item._id)}
                  />
                </div>
              ) : null
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CompletedTodos;
