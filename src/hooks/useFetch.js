import { useState, useLayoutEffect } from "react";

import axios from "../axios/axios";

const useFetch = (query, setData) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.get(query);
            const data = await response.data;
            setData({ type: "setTodos", payload: data });
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useLayoutEffect(() => {
        const controller = new AbortController();
        fetchData();

        return () => {
            controller.abort();
        };
    }, [query]);

    return { isLoading, error };
};

export default useFetch;
