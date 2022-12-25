import React from "react";

const Select = ({ setStatus }) => {
    return (
        <select
            className="w-[200px] h-14 px-6 border-2 border-gray-400 outline-none rounded-md text-lg text-gray-500 dark:text-gray-400"
            onChange={(e) => setStatus(e.target.value)}
        >
            <option value="" disabled selected hidden>
                Choose status
            </option>
            <option value={""}>All</option>
            <option value={false}>Todo</option>
            <option value={true}>Completed</option>
        </select>
    );
};

export default Select;
