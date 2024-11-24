import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompletedTodos = () => {
  const [getTodos, SetgetTodos] = useState({});
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [todoResponse, setTodoResponse] = useState({});
  const [getCategory, SetgetCategory] = useState({});
  const [completeTodo, setCompleteTodo] = useState({});
  const [deleteTodo, setDeleteTodo] = useState({});
  const navigate = useNavigate();

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
  }, [todoResponse, completeTodo, deleteTodo]);

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
