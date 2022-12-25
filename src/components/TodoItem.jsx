import React from "react";

import { MdDeleteForever } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";

const TodoItem = ({
    todo,
    index,
    toogleTodo,
    editTodo,
    deleteTodo,
    ...props
}) => {
    return (
        <tr
            key={todo?.id}
            className={
                index % 2
                    ? "bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                    : "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700"
            }
        >
            <td className="py-4 px-6">{todo?.id}</td>
            <td className="w-5/12 py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {todo?.title}
            </td>
            <td className="py-4 px-6 text-center">
                <span
                    className={
                        todo?.completed
                            ? "py-2 px-4 border-2 border-solid rounded-md border-green-400 text-green-400 cursor-pointer"
                            : "py-2 px-4 border-2 border-solid rounded-md border-orange-400 text-orange-400 cursor-pointer"
                    }
                    onClick={() => toogleTodo(todo?.id)}
                >
                    {todo?.completed ? "Completed" : "Todo"}
                </span>
            </td>
            <td className="py-4 px-6">
                <RiEdit2Fill
                    className="cursor-pointer mx-auto"
                    size={"28px"}
                    onClick={() => editTodo(todo?.id)}
                />
            </td>
            <td className="py-4 px-6">
                <MdDeleteForever
                    className="cursor-pointer mx-auto"
                    size={"28px"}
                    onClick={() => deleteTodo(todo?.id)}
                />
            </td>
        </tr>
    );
};

export default TodoItem;
