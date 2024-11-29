import React, { useEffect,  useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { resetToken, jwtTokenValidation } from '../app/slices/userValidateSlice.js'
import { getAllCategoriesApi } from "../app/slices/categoriesSlice.js";
import {setTodoInput,setUpdateTodoStatus,setUpdateTodoId, getAllTodosApi,addTodoApi,setSelectedOption,deleteTodoApi,editTodoApi, setTodocompletedApi} from "../app/slices/TodoSlice.js";

const Todo = () => {
  const token = useSelector((state)=> (state.userValidateReducer.token ))
  const tokenValidateResponse = useSelector((state)=> state.userValidateReducer.tokenValidateResponse)
  const getCategories = useSelector((state)=> state.categoriesReducer.getCategories)
  const todoResponse = useSelector((state)=> state.todoReducer.todoResponse)
  const getTodos = useSelector((state)=> state.todoReducer.getTodos)
  const selectedOption = useSelector((state)=> state.todoReducer.selectedOption)
  const deleteTodo = useSelector((state)=> state.todoReducer.deleteTodo)
  const completeTodo = useSelector((state)=> state.todoReducer.completeTodo)
  const todoInput = useSelector((state)=> state.todoReducer.todoInput)
  const updateTodoStatus = useSelector((state)=> state.todoReducer.updateTodoStatus)
  const updateTodoId = useSelector((state)=> state.todoReducer.updateTodoId)


  const navigate = useNavigate();
  const selectedOptionRef = useRef();
  

  
  const dispatch = useDispatch()
  
  
  // RTK Logic----------
  
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

  }, [tokenValidateResponse, todoResponse, deleteTodo, completeTodo]);
  // ----------


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleForm = async (formData) => {
    formData.content = todoInput
    const addTodo = {
      category: selectedOption
        ? selectedOption
        : selectedOptionRef?.current?.value,
      content: formData.content,
    };

    if (token) {
      console.log({token, data:addTodo})
      dispatch(addTodoApi({token, data:addTodo}))
    } else {
      navigate("/login");
    }
  };

  const handleSelect = (event) => {
     dispatch(setSelectedOption(event.target.value))
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

  const handleEditTodo = (id, todo)=> {
    dispatch(setUpdateTodoStatus(true))
    dispatch(setTodoInput(todo))
    dispatch(setUpdateTodoId(id))
  }
  
  const handleUpdateTodo =()=>{
    dispatch(setUpdateTodoStatus(false))
   
    if(token)
      {
        const formData = {
          token,
          data :{
            editTodoID : updateTodoId,
            newTodo : todoInput
          }
        }
          dispatch(editTodoApi(formData))
      }else{
            navigate("/login")
          } 
  }

  return (
    <>
    
      <div className="container px-4 py-4 md:py-12 md:px-12  h-[calc(100vh-4.5rem)] w-[100%] bg-slate-600 ">
        <h1 className="text-center text-4xl font-bold text-white">Todo Page</h1>
        <div className="px-[45%] mt-10">
          <select
            name="language"
            id="language"
            onChange={handleSelect}
            value={selectedOption}
            ref={selectedOptionRef}
            required
          >
            {getCategories?.data?.map((item) =>
              item.is_deleted != true ? (
                <option value={item?.category_name} key={item._id}>
                  {item?.category_name}
                </option>
              ) : null
            )}
          </select>
        </div>
       
        <form method="post" onSubmit={handleSubmit(handleForm)}>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="w-72">
              <input
                type="text"
                value={todoInput}
                onChange={(event)=>dispatch(setTodoInput(event.target.value))}
                name="content"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="content"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Add
              </button>
            </div>
                {updateTodoStatus &&  <div>
                  <button onClick={handleUpdateTodo} className="block text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Update</button>
                </div>}
               
          </div>
        </form>
        
        {
         ( getCategories?.data?.every((item)=>(item.is_deleted == true))) && <p className="text-red-700 my-3 text-center font-bold">**Please create categorie first**</p>
        }
        
        <div className="categories mt-10">
          <ul className="flex flex-wrap gap-4 ">
            {getTodos?.data?.map((item) =>
              (item.is_completed == false ) ? (
                <div
                  key={item._id}
                  className="w-fit flex items-center justify-center gap-3 border border-gray-400 rounded-md p-2 hover:bg-slate-700"
                >
                  <p className="bg-gray-800 opacity-50 text-white p-2 rounded-md w-fit">
                    {item.category[0]?.category_name}
                  </p>
                  <li className="list-none block text-xl text-white bg-slate-950  p-2 rounded-md w-fit">
                    {item.todo}
                  </li>{" "}
                  <button
                    className="bg-red-600 px-3 rounded-md text-white font-medium text-xl hover:bg-red-800 py-2"
                    onClick={() => handleDeleteTodo(item)}
                  >
                    Delete
                  </button>
                  <button className='bg-yellow-600 min-w-fit px-3 rounded-md text-white font-medium text-xl hover:bg-yellow-800 py-2' onClick={()=>handleEditTodo(item._id, item.todo)}>
                          Edit Todo
                      </button>
                  <input
                    type="checkbox"
                    name="is_completed"
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

export default Todo;
