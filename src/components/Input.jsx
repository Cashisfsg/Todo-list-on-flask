import React, { forwardRef } from "react";

const Input = forwardRef(({ title, setTitle }, ref) => (
    <input
        className="w-full px-3 h-14 border-2 text-xl outline-none rounded-md border-gray-500 text-gray-500 dark:text-gray-400"
        type={"text"}
        ref={ref}
        value={title}
        maxLength={40}
        onChange={(e) => setTitle(e.target.value)}
    />
));

export default Input;
