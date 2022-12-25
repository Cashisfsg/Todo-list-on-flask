import React, { useState, useCallback } from "react";
import useFetch from "./hooks/useFetch";
import Input from "./components/Input";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";

import axios from "./axios/axios";

function App() {
    const [todos, setTodos] = useState([]);
    const { isLoading, error } = useFetch("/todos", setTodos);

    const [editedTodoID, setEditedTodoID] = useState(null);
    const [title, setTitle] = useState("");

    const handleTodo = () => {
        if (!title.length) return;
        if (editedTodoID) {
            submitTodo();
            console.log("Submit Todo");
        } else {
            addTodo();
        }
        setTitle("");
    };

    const addTodo = async () => {
        const response = await axios.post("/todos", { title: title });

        const data = response.data;

        setTodos((todos) => [...todos, data]);
    };

    const editTodo = useCallback((id) => {
        setEditedTodoID(id);
        console.log("ID: ", id);
        console.log("ID: ", id);
        console.log("Todos: ", todos);
        // setTitle(todos.find((todo) => todo.id === id)?.title ?? "");
        setTitle(todos.find((todo) => todo.id === id)?.title);
    }, []);

    const submitTodo = async () => {
        const response = await axios.patch("/todos", {
            id: editedTodoID,
            title: title,
        });

        const data = response.data;

        setTodos((todos) =>
            todos.map((todo) => (todo?.id !== editedTodoID ? todo : data))
        );
        setEditedTodoID(null);
    };

    return (
        <div>
            <h1 className="text-center text-5xl mb-5">Todo list</h1>
            <section className="flex flex-col gap-2 w-full px-10 mb-5">
                <div className="flex justify-between">
                    <button
                        className="h-14 px-6 outline-none border-2 rounded-md border-gray-500 text-lg text-gray-500 dark:text-gray-400"
                        onClick={handleTodo}
                    >
                        {editedTodoID ? "Save changes" : "Add Todo"}
                    </button>
                    <Filters setFilteredTodos={() => {}} />
                </div>
                <Input title={title} setTitle={setTitle} />
            </section>
            {!isLoading && (
                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    editTodo={editTodo}
                />
            )}
        </div>
    );
}

export default App;
