<<<<<<< HEAD
import React from "react";

export const noDataLabel = "Chưa có dữ liệu";
const TableData = ({
                       alignClass = "text-left",
                       children,
                   }: {
    alignClass?: "text-left" | "text-center" | "text-right";
=======
import React from 'react';
export const noDataLabel = 'Chưa có dữ liệu';
const TableData = ({
    alignClass = 'text-left',
    children,
}: {
    alignClass?: 'text-left' | 'text-center' | 'text-right';
>>>>>>> 81b386be539aa08eeec739e7538994cf541875cb
    children: React.ReactNode;
}) => {
    return (
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
            <div className={alignClass}>{children}</div>
        </td>
    );
};

export default TableData;
