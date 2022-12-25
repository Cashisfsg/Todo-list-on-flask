import React, { useState, memo } from "react";
import TableHeader from "../components/TableHeader";
import TodoItem from "../components/TodoItem";
import axios from "../axios/axios";

const TodoList = ({ todos, setTodos, editTodo }) => {
    const [filteredTodos, setFilteredTodos] = useState(todos);

    const toogleTodo = async (id) => {
        const todo = todos.find((todo) => todo.id === id);

        await axios.patch("todos", {
            id: todo.id,
            completed: !todo.completed,
        });

        setTodos({ type: "toogleTodo", payload: id });
    };

    const deleteTodo = async (id) => {
        await axios.delete("/todos", { data: { id: id } });
        setTodos({ type: "deleteTodo", payload: id });
    };

    return (
        <table className="min-w-full text-lg text-left text-gray-500 dark:text-gray-400">
            <TableHeader />
            <tbody>
                {todos.map((todo, i) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        index={i}
                        toogleTodo={toogleTodo}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default memo(TodoList);
