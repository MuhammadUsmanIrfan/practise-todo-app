import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [getCategory, SetgetCategory] = useState({});
  const [todoResponse, setTodoResponse] = useState({});
  const [getTodos, SetgetTodos] = useState({});
  const [deleteTodo, setDeleteTodo] = useState({});
  const [completeTodo, setCompleteTodo] = useState({});
  const navigate = useNavigate();
  const selectedOptionRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");

  const [todoInput, setTodoInput] = useState("")
  const [updateTodoStatus, setUpdateTodoStatus] = useState(false)
  const [updateTodoId, setUpdateTodoId] = useState("")


  useEffect(() => {

    
    if (token) {
      fetch("http://localhost:3000/category/getcategories?page=1&limit=20", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          SetgetCategory(resp);
        })
        .catch((err) => console.error("failed to add category", err.message));

      fetch("http://localhost:3000/todoroutes/gettodos?page=1&limit=20", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          SetgetTodos(resp);
        })
        .catch((err) => console.error("failed to add category", err.message));
    } else {
      navigate("/login");
    }
  }, [deleteTodo, todoResponse, completeTodo]);

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
      fetch("http://localhost:3000/todoroutes/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addTodo),
      })
        .then((resp) => resp.json())
        .then((resp) => setTodoResponse(resp))
        .catch((err) => console.error("failed to add category", err.message));
    } else {
      navigate("/login");
    }
  };

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDeleteTodo = (item) => {
    const data = {
      todoID: item._id,
    };

    console.log(JSON.stringify(data));
    if (token) {
      fetch("http://localhost:3000/todoroutes/deletetodo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => setDeleteTodo(resp))
        .catch((err) => console.error("failed to add category", err.message));
    } else {
      navigate("/login");
    }
  };

  const handleComplete = (e, id) => {
    const data = {
      editTodoID: id,
      value: String(e.target.checked),
    };
    console.log(data);
    if (token) {
      fetch("http://localhost:3000/todoroutes/setcompleted", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((resp) => resp.json())
        .then((resp) => setCompleteTodo(resp))
        .catch((err) => console.error("failed to add category", err.message));
    } else {
      navigate("/login");
    }
  };

  const handleEditTodo = (id, todo)=> {
    setUpdateTodoStatus(true)
    setTodoInput(todo)
    setUpdateTodoId(id)
  }
  
  const handleUpdateTodo =()=>{
    setUpdateTodoStatus(false)
   

    const data = {
      editTodoID : updateTodoId,
      newTodo : todoInput
    }
    if(token)
      {
  
        fetch("http://localhost:3000/todoroutes/edittodo", {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, 
          },
          body: JSON.stringify(data),
        }).then((resp)=>resp.json()).then((resp)=> setDeleteTodo(resp)).catch((err)=>console.error("failed to add category", err.message))
  
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
            {getCategory?.data?.map((item) =>
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
                onChange={(event)=>setTodoInput(event.target.value)}
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
         ( getCategory?.data?.every((item)=>(item.is_deleted == true))) && <p className="text-red-700 my-3 text-center font-bold">**Please create categorie first**</p>
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
