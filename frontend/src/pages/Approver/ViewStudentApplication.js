import React from "react";
import '../../assets/styles/Home.css';
import '../../assets/styles/ViewStudentApplication.css';
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Header, Footer } from '../ScreenComponents';
import { Table } from "./Table";
import ApproverIcon from '../../assets/approver.png';

import { useParams, useNavigate } from 'react-router-dom';

// import data
import { getCurrentStudent } from "../../data";

export default function ViewStudentApplication() {
    // use states
    const [remarks, setRemarks] = useState('');

    const navigate = useNavigate();

    // use states for userInfo and current student
    const upMail1 = localStorage.getItem("upMail");
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state
    const [currentApplication, setCurrentApplication] = useState([]);

    const { appId } = useParams(); // Get the value from the URL path

    const fetchCurrentApplication = () => {
        fetch(`http://localhost:3001/get-current-application?applicationId=${appId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response if needed
                console.log(data);
                // Update the state or perform any other actions
                setCurrentApplication([data]);
            })
            .catch(error => {
                // Handle errors if needed
                console.error(error);
            });
    };

    useEffect(() => {
        // Fetch user data
        const fetchData = async () => {
            const userData = await getCurrentStudent(upMail1);
            if (userData) {
                setUserInfo({
                    userId: userData._id,
                    name: userData.firstName + " " + userData.middleName + " " + userData.lastName,
                    studno: userData.studentNumber,
                    course: userData.degreeProgram,
                    college: userData.college,
                    classification: userData.userType,
                    icon: ApproverIcon,
                });
            }
        };

        fetchData();



        fetchCurrentApplication();

    }, []);

    async function approveApplication() {
        try {
            const response = await fetch("http://localhost:3001/approve-application-at-current-step", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appId }),
            });

            if (response.ok) {
                console.log("Application approved successfully");
                alert("Application approved successfully!")
                navigate("/approver", { replace: true });
            } else {
                console.error("Failed to approve application");
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function returnApplication(remarkSubmission) {
        try {
            const response = await fetch("http://localhost:3001/return-application-at-current-step", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appId: appId, remarkSubmission: remarkSubmission }),

            });

            if (response.ok) {
                console.log("Application returned to previous step successfully");
                alert("Application returned to previous step successfully!");
                navigate("/approver", { replace: true });
            } else {
                console.error("Failed to return application");
            }
        } catch (error) {
            console.error(error);
        }
    }

    //functions that handle changes on each input
    const handleRemarks = (e) => {
        setRemarks(e.target.value);
    }

    // for student info table
    const studentInformationAttributes = ['student.fullName', 'student.studentNumber', 'student.degreeProgram', 'student.college']
    const studentInformationColumns = ['Name (LN, FN, MN)', 'Student Number', 'Degree Program', 'College']

    // for application info table
    const applicationInformationAttributes = ['student.fullName', 'status', 'step']
    const applicationInformationColumns = ['Academic Adviser (LN, FN, MN)', 'Status', 'Current Step']

    // for student remark/s table
    const studentRemarkAttributes = ['studentSubmission.dateSubmission', 'studentSubmission.stepGivenSubmission', 'studentSubmission.remarkSubmission']
    const studentRemarkColumns = ['Date', 'Step', 'Link/Remark']

    // for approver remark/s table
    const approverRemarkAttributes = ['dateRemark', 'stepGivenRemark', 'dateRemark', 'remark'];
    const approverRemarkColumns = ['Date', 'Step', 'Commenter', 'Remark'];

    // for form validation
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        try {
            const remarkSubmission = {
                remark: data.remark,
                dateRemark: new Date().toLocaleDateString(),
                commenter: userInfo.userId,
                stepGivenRemark: currentApplication[0].step,
            };

            returnApplication(remarkSubmission);
            fetchCurrentApplication();

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrapper">
            <Header data={userInfo} />
            <div className="content">
                <div className="student-information">
                    <h3 className="section-title">Student Information</h3>
                    {currentApplication && (
                        <Table className="information-table" data={currentApplication} columns={studentInformationColumns} attributes={studentInformationAttributes} id="student-information" />
                    )}
                </div>
                <div className="application-information">
                    <h3 className="section-title">Application Information</h3>
                    {currentApplication && (
                        <Table className="information-table" data={currentApplication} columns={applicationInformationColumns} attributes={applicationInformationAttributes} id="application-information" />
                    )}
                    <div className="remarks-student">
                        <p className="header-title">Submission / Remarks of Student</p>
                        <Table className="remarks-table" data={currentApplication} columns={studentRemarkColumns} attributes={studentRemarkAttributes} id={"student-remark"} />
                    </div>
                    <div className="remarks-approver">
                        <p className="header-title">Remarks of Adviser / Clearance Officer</p>
                        {currentApplication.length > 0 && (
                            <Table className="information-table" data={currentApplication[0]["remarks"]} columns={approverRemarkColumns} attributes={approverRemarkAttributes} id="approver-remark" />
                        )}
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
                            <button type="submit" className="filter-button" id="approve-btn" onClick={handleSubmit(approveApplication)}>Approve</button>
                            <button type="submit" className="filter-button" id="return-btn">Return</button>
                        </div>

                    </form>
                </div>
            </div>
            <Footer id="view-footer" />
        </div >
    )
}