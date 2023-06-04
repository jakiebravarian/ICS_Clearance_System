import React from 'react';

const Table = ({ data, columns, attributes }) => {

    return (
        <div id="table">
            <table id="approver-table">
                <thead>
                    <tr id="table-header">
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index} id="table-items">
                            {attributes.map((attributes, index) => (
                                <td key={index}>{row[attributes]}</td>
                            ))}

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { Table };