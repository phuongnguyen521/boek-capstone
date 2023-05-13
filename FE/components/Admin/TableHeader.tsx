<<<<<<< HEAD
import React from "react";
=======
import React from 'react';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb

const TableHeader = ({ label }: { label: string }) => {
    return (
        <th className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
            <span className="text-left font-semibold">{label}</span>
        </th>
    );
};

export default TableHeader;
