import React from "react";
import { Link } from "react-router-dom";

const Table = ({ data = [], columns, attributes, id, purpose }) => {
    const getColumnValue = (rowData, columnPath) => {
        const pathArray = columnPath.split(".");
        let value = rowData;
        for (const path of pathArray) {
            value = value[path];
            if (value === undefined) {
                break;
            }
        }
        return value;
    };

    const getStudentFullName = (student) => {
        return `${student.lastName}, ${student.firstName}, ${student.middleName}`;
    };

    const getAdviserFullName = (student) => {
        if (student.adviser) {
            const { firstName, middleName, lastName } = student.adviser;
            return `${getStudentFullName(student)} (Adviser: ${lastName}, ${firstName}, ${middleName} )`;
        }
        return getStudentFullName(student);
    };

    return (
        <table className="table" id={`${id}-table`}>
            <thead>
                <tr className="table-header" id={`${id}-table-header`}>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => {
                    return (
                        <tr
                            className="table-items"
                            key={rowIndex}
                            id={`${id}-table-items`}
                        >
                            {attributes.map((attribute, attrIndex) => {
                                if (
                                    attribute === "student.adviser.fullName" ||
                                    attribute === "student.fullName"
                                ) {
                                    return (
                                        <td key={attrIndex}>
                                            {getAdviserFullName(row.student)}
                                        </td>
                                    );
                                } else {
                                    return (
                                        <td key={attrIndex}>
                                            {getColumnValue(row, attribute)}
                                        </td>
                                    );
                                }
                            })}
                            {purpose === "view" && (
                                <td>
                                    <Link to={`/view/${row._id}`} id="view-button">
                                        View
                                    </Link>
                                </td>
                            )}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export { Table };
