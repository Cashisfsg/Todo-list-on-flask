import React from "react";

const TableHeader = () => {
    return (
        <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-double border-b-4">
            <tr width="100%">
                <th scope="col" className="py-3 px-6 w-1/12">
                    #
                </th>
                <th scope="col" className="py-3 px-6 w-5/12">
                    Task Name
                </th>
                <th scope="col" className="py-3 px-6 text-center w-2/12">
                    Status
                </th>
                <th scope="col" className="py-3 px-6 text-center w-2/12">
                    Edit
                </th>
                <th scope="col" className="py-3 px-6 text-center w-2/12">
                    Remove
                </th>
            </tr>
        </thead>
    );
};

export default TableHeader;
