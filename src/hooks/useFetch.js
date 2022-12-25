import { useState, useLayoutEffect } from "react";

import axios from "../axios/axios";

const useFetch = (query, setData) => {
    // const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.get(query);
            // console.log("Response: ", response);
            const data = await response.data;
            setData(data);
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
