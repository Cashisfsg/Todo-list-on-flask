import React, { useState, useEffect } from "react";
import Search from "./Search";
import Select from "./Select";

const Filters = ({ setFilteredTodos }) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (search) {
            setFilteredTodos((todos) =>
                todos.filter((todo) =>
                    todo?.title.toLowerCase().includes(search.toLowerCase())
                )
            );
        }
        if (status) {
            setFilteredTodos((todos) =>
                todos.filter((todo) => todo?.completed === JSON.parse(status))
            );
        }
    }, [search, status]);

    return (
        <div className="flex gap-6">
            <Search search={search} setSearch={setSearch} />
            <Select status={status} setStatus={setStatus} />
        </div>
    );
};

export default Filters;
