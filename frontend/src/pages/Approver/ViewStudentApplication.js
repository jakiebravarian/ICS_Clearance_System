import React from "react";
import '../../assets/styles/Home.css';
import '../../assets/styles/ViewStudentApplication.css';
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Header, Footer } from '../ScreenComponents';
import { approverInfo } from '../../data.js';
import { Table } from "./Table";

export default function ViewStudentApplication() {
    // use states
    const [remarks, setRemarks] = useState('');

    //functions that handle changes on each input
    const handleRemarks = (e) => {
        setRemarks(e.target.value);
    }

    // data for student information
    const studentInformation = [
        {
            studentName: "Brabante, Jakie Ashley, Cacho",
            studentNumber: "20XX-XXXXX",
            degreeProgram: "BS Computer Science",
            college: "CAS"
        }
    ]

    const studentInformationAttributes = ['studentName', 'studentNumber', 'degreeProgram', 'college']

    const studentInformationColumns = ['Name (LN, FN, MN)', 'Student Number', 'Degree Program', 'College']

    // data for student information
    const applicationInformation = [
        {
            adviserName: "Dela Cruz, Juan, Hernandez",
            status: "Pending",
            currentStep: "2"
        }
    ]

    const applicationInformationAttributes = ['adviserName', 'status', 'currentStep']

    const applicationInformationColumns = ['Academic Adviser (LN, FN, MN)', 'Status', 'Current Step']


    // data for student remark
    const studentRemark = [
        {
            date: '06-01-2023',
            step: '1',
            remark: 'https://github.com/CMSC100-UV4L/san-agustin_bautista_brabante_pena_project'
        },
    ];

    const studentRemarkAttributes = ['date', 'step', 'remark']

    const studentRemarkColumns = ['Date', 'Step', 'Link/Remark']

    // data for approver remark
    const approverRemark = [
        {
            date: '06-01-2023',
            step: '1',
            commenter: 'Juan H. Dela Cruz',
            remark: 'ngi'
        },
        {
            date: '06-05-2023',
            step: '3',
            commenter: 'Juan H. Dela Cruz',
            remark: 'yuck'
        },
    ];

    const approverRemarkAttributes = ['date', 'step', 'commenter', 'remark']

    const approverRemarkColumns = ['Date', 'Step', 'Commenter', 'Remark']

    // for form validation
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        try {
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrapper">
            <Header data={approverInfo} />
            <div className="content">
                <div className="student-information">
                    <h3 className="section-title">Student Information</h3>
                    <Table className="information-table" data={studentInformation} columns={studentInformationColumns} attributes={studentInformationAttributes} id={"student-information"} />
                </div>
                <div className="application-information">
                    <h3 className="section-title">Application Information</h3>
                    <Table className="information-table" data={applicationInformation} columns={applicationInformationColumns} attributes={applicationInformationAttributes} id={"application-information"} />
                    <div className="remarks-student">
                        <p className="header-title">Submission / Remarks of Student</p>
                        <Table className="remarks-table" data={studentRemark} columns={studentRemarkColumns} attributes={studentRemarkAttributes} id={"student-remark"} />
                    </div>
                    <div className="remarks-approver">
                        <p className="header-title">Remarks of Adviser / Clearance Officer</p>
                        <Table className="remarks-table" data={approverRemark} columns={approverRemarkColumns} attributes={approverRemarkAttributes} id={"approver-remark"} />
                    </div>
                </div>
                <div className="approve-return">
                    <h3 className="section-title">Approve/Return Application</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            id="remark"
                            placeholder="Write your remarks here. Write N/A if you want to approve the student's application."
                            {...register("remark", {
                                onChange: handleRemarks,
                                required: "Please enter your remarks returning the student's application. Write N/A if you want to approve the student's application.",
                            })}
                        />
                        {errors.remark && <p id="error-message">{errors.remark.message}</p>}

                        <div className="buttons">
                            <button type="submit" className="filter-button" id="approve-btn">Approve</button>
                            <button type="submit" className="filter-button" id="return-btn">Return</button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer id="view-footer" />
        </div >
    )
}