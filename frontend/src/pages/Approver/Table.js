import React from 'react';

// data = data/rows of table ----------------------------------------
// e.g.
// const approverRemark = [
//     {
//         date: '06-01-2023',
//         step: '1',
//         commenter: 'Juan H. Dela Cruz',
//         remark: 'ngi'
//     },
//     {
//         date: '06-05-2023',
//         step: '3',
//         commenter: 'Juan H. Dela Cruz',
//         remark: 'yuck'
//     },
// ];

// columns = table headers ------------------------------------------
// e.g.
// const approverRemarkColumns = ['Date', 'Step', 'Commenter', 'Remark']

// attributes = attributes of data ----------------------------------
// e.g.
// const approverRemarkAttributes = ['date', 'step', 'commenter', 'remark']

// id = for creating specific ids of table, header, data ------------
// e.g.
// id={"approver-remark"}

const Table = ({ data, columns, attributes, id }) => {
    const getColumnValue = (rowData, columnPath) => {
        const pathArray = columnPath.split('.');
        let value = rowData;
        for (const path of pathArray) {
            value = value[path];
            if (value === undefined) {
                break;
            }
        }
        return value;
    };

    // Calculate the student's full name
    const getStudentFullName = (student) => {
        return `${student.firstName} ${student.middleName} ${student.lastName}`;
    };

    // Calculate the adviser's full name based on the student's adviser object
    const getAdviserFullName = (student) => {
        if (student.adviser) {
            const { firstName, middleName, lastName } = student.adviser;
            return `${getStudentFullName(student)} (Adviser: ${firstName} ${middleName} ${lastName})`;
        }
        return getStudentFullName(student);
    };

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
                        {attributes.map((attribute, index) => {
                            if (attribute === 'student.adviser.fullName' || attribute === 'student.fullName') {
                                return (
                                    <td key={index}>{getAdviserFullName(row.student)}</td>
                                );
                            }
                            return (
                                <td key={index}>{getColumnValue(row, attribute)}</td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export { Table };