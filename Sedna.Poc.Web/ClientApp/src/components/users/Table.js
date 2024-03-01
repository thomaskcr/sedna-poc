import React from 'react';
import {TableRow} from "./TableRow.js"

export const Table = ({ columns, data }) => {
    
    /*  purpose: render a table 
        input: table data and columns
        return: a table
     */
    return (
        <table className="table table-sm ml-3 text-center table-striped" style={{border: "2px solid black"}}>
            <thead style={{ borderTop: '1px solid black' }}>
            <tr>
                {columns.map(column => (
                    <th className="font-weight-bold" key={column.key} style={column.style}>{column.header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => <TableRow key={index} columns={columns}  data={item}/>)}
            </tbody>
        </table>
    )
};
