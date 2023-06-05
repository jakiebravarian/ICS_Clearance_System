import React from 'react';

const Table = (props) => {

    let studentNumber = props.studentNumber;
    let studentName = props.studentName;
    let step = props.step;
    let status = props.status
    let date = props.date
    const data = [
        {
            studentNumber: '2023-12345',
            studentName: 'John Doe',
            step: '1',
            status: 'In Progress',
            date: '2023-05-30',
        },
        {
            studentNumber: '2021-45698',
            studentName: 'Jane Smith',
            step: '2',
            status: 'Completed',
            date: '2023-05-31',
        },
    ];

    return (
        <div id="table">
            <table id="approver-table">
                <thead>
                    <tr id="table-header">
                        <th>Student Number</th>
                        <th>Student Name</th>
                        <th>Step</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Application</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} id="table-items">
                            <td>{item.studentNumber}</td>
                            <td>{item.studentName}</td>
                            <td>{item.step}</td>
                            <td>{item.status}</td>
                            <td>{item.date}</td>
                            <td><button id="view-button">View</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export { Table };