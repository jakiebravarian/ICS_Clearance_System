import React from 'react';

const Table = ({ data, columns, attributes, id }) => {

    return (
        <table className="table" id={id + "-table"}>
            <thead>
                <tr className="table-header" id={id + "-table-header"}>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr className="table-items" key={index} id={id + "-table-items"}>
                        {attributes.map((attributes, index) => (
                            <td key={index}>{row[attributes]}</td>
                        ))}

                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export { Table };