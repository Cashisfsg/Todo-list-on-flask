import React, { useState } from "react";

const Input = ({ title, setTitle }) => {
    return (
        <input
            className="w-full px-3 h-14 border-2 text-xl outline-none rounded-md border-gray-500 text-gray-500 dark:text-gray-400"
            type={"text"}
            value={title}
            maxLength={40}
            onChange={(e) => setTitle(e.target.value)}
        />
    );
};

export default Input;
