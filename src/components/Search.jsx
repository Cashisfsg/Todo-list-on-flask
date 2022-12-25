import React from "react";

const Search = ({ search, setSearch, ...props }) => {
    return (
        <>
            <input
                className="w-[200px] h-14 px-6 border-2 border-gray-400 outline-none rounded-md text-lg text-gray-500 dark:text-gray-400"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </>
    );
};

export default Search;
