import React, { useState, useEffect, memo } from "react";
import useFetch from "../hooks/useFetch";
import TableHeader from "../components/TableHeader";
import TodoItem from "../components/TodoItem";
import axios from "../axios/axios";

const TodoList = ({ todos, setTodos, editTodo }) => {
    // const { isLoading, error } = useFetch("/todos");

    const [filteredTodos, setFilteredTodos] = useState(todos);

    // useEffect(() => {
    //     setFilteredTodos(todos);
    // }, []);
    console.log("Todos: ", todos);
    // console.log("Filtered Todos: ", filteredTodos);
    const toogleTodo = async (id) => {
        const todo = todos.find((todo) => todo.id === id);

        await axios.patch("todos", {
            id: todo.id,
            completed: !todo.completed,
        });

        setTodos((todos) =>
            todos.map((todo) => {
                if (todo?.id === id) {
                    return { ...todo, completed: !todo.completed };
                } else return todo;
            })
        );
    };

    const deleteTodo = async (id) => {
        await axios.delete("/todos", { data: { id: id } });
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
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
