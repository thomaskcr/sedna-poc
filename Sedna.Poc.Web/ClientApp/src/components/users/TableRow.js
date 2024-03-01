import React from 'react';
import { useNavigate } from "react-router-dom";

export const TableRow = ({ columns, data }) => {
    
    /*  purpose: render a table row
        input: row data and columns
        return: a table row
     */
    return (
        <tr key={data.id}>
            {columns.map(column => (
                <td key={column.key}>
                    {data[column.key]}
                </td>
            ))}
        </tr>
    );
};