import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useReducer,
} from "react";
import useFetch from "./hooks/useFetch";
import Input from "./components/Input";
import Filters from "./components/Filters";
import TodoList from "./components/TodoList";

import axios from "./axios/axios";

function App() {
    const [todos, setTodos] = useReducer((todos, action) => {
        console.log(action);
        switch (action.type) {
            case "setTodos":
                return [...todos, ...action.payload];
            case "addTodo": {
                return [...todos, action.payload];
            }
            case "toogleTodo": {
                return todos.map((todo) => {
                    if (todo?.id === action.payload) {
                        return { ...todo, completed: !todo.completed };
                    } else return todo;
                });
            }
            case "submitTodo": {
                console.log("Submit: ", action.payload);
                return todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return todo;
                    }
                });
            }
            case "deleteTodo": {
                return todos.filter((todo) => todo.id !== action.payload);
            }
            default: {
                return todos;
            }
        }
    }, []);

    const { isLoading, error } = useFetch("/todos", setTodos);

    const [editedTodoID, setEditedTodoID] = useState(null);
    const [title, setTitle] = useState("");

    const inputRef = useRef(null);

    useEffect(() => {
        if (editedTodoID) {
            inputRef.current.focus();
        }
    }, [editedTodoID]);

    const handleTodo = () => {
        if (!title.length) return;
        if (editedTodoID) {
            submitTodo();
        } else {
            addTodo();
        }
        setTitle("");
    };

    const addTodo = async () => {
        const response = await axios.post("/todos", { title: title });
        const data = response.data;
        setTodos({ type: "addTodo", payload: data });
    };

    const editTodo = useCallback(
        (id) => {
            setEditedTodoID(id);
            setTitle(todos.find((todo) => todo.id === id)?.title ?? "");
        },
        [todos]
    );

    const submitTodo = async () => {
        const response = await axios.patch("/todos", {
            id: editedTodoID,
            title: title,
        });
        const data = await response.data;
        setTodos({ type: "submitTodo", payload: data });
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
                <Input title={title} setTitle={setTitle} ref={inputRef} />
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
