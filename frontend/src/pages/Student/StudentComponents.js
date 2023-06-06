import React from "react";
import { useState, useEffect } from "react";
import { Document, Page, Text, View, PDFViewer } from '@react-pdf/renderer';
import { styles } from './pdfStyles';

// header profile component
function ProfileHeader(props) {
    let name = props.name       // name of logged in user
    let icon = props.icon;      // icon of the logged in user
    let classification = props.classification // classification of the user

    

    return(
        // renders logged in user's name and icon
        <div className="profile-header">
            <div className="profile-name">
                {name}
            </div>
            <div className="classification">
                {classification}
            </div>
            <div>
                <img className="profile-icon-img" src={icon}></img>
            </div>
        </div>
    )
}

// renders header on the page
function Header(props) {
    let userInfo = props.data;

    return (
        <div id="page-header">
            <h1 id="page-header-h1">Institute of Computer Science - Clearance Approval System</h1>
            {/* profile indicator */}
            <ProfileHeader name={userInfo.userName} classification={userInfo.classification} icon={userInfo.icon} />
        </div>
    )
}

// renders student info
function StudentInfo(props) {
    let studentInfo = props.data;
    console.log(studentInfo);
    return (
        <div>
            <p className="student-info-text">Student info</p>
            <div className="student-info-box row">
                {/* name */}
                <div id="name-container">
                    Name: {studentInfo.name}
                </div>

                {/* student number */}
                <div id="studno-container">
                    Student number: {studentInfo.studno}
                </div>

                {/* course */}
                <div id="course-container">
                    Course: {studentInfo.course}
                </div>

                {/* college */}
                <div id="college-container">
                    College: {studentInfo.college}
                </div>
            </div>
        </div>
    )
}

// renders form on the homepage
function Form({ onClick }) {
    const handleSubmit = (event) => {
        event.preventDefault();

        // Retrieve form input values
        const githubLink = document.getElementById("github-link-input").value;
        const dateApplied = new Date().toLocaleDateString();
        const remarkValue = document.getElementById("remarks-input").value;
        const studentSubmission = {
            dateSubmission: dateApplied,
        }
        if (remarkValue.length === 0) {
            studentSubmission.remarkSubmission = githubLink;
            studentSubmission.stepGivenSubmission = 1;
        } else {
            studentSubmission.remarkSubmission = remarkValue;
            studentSubmission.stepGivenSubmission = 2;
        }
        console.log(studentSubmission);
        // Call the onClick event handler and pass the values as parameters
        onClick(event, studentSubmission);
    };
    return (
        <div>
            {/*form */}
            <form action="">
                <div className="form-section">
                    {/* first row */}
                    <form>
                        <div className="row input-divs">
                            <div className="github-link-div">
                                <label htmlFor="github-link-input">Github link</label><br />
                                <input placeholder="github.com/username" id="github-link-input" /><br></br>
                            </div>
                            <div className="remarks-div">
                                <label htmlFor="remarks-input">Remarks</label><br />
                                <input placeholder="Write your remarks here" id="remarks-input" /><br></br>
                            </div>
                        </div>
                        {/* button */}
                        <div className="centered">
                            <button type='submit' className='button' onClick={handleSubmit}>SUBMIT APPLICATION</button>
                        </div>
                    </form>
                </div>
            </form>
            <br></br>
        </div>
    )
}

// renders either a form or a list of applications
// application component: returns a form if there are no applications yet
function Application(props) {
    const [applications, setApplications] = useState(props.data);
    const [allClosed, setAllApplicationsClosed] = useState(false);

    useEffect(() => {
        const upMail1 = localStorage.getItem("upMail");

        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/get-current-applications?upMail=" + upMail1
                );
                if (response.ok) {
                    const data = await response.json();
                    setApplications(data);
                    const allClosed = data.every((app) => app.status === "Closed");
                    setAllApplicationsClosed(allClosed);
                    console.log(allClosed);
                } else {
                    console.error("Failed to fetch applications");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    });

    if (applications.length === 0) {
        return (
            <div>
                <div>
                    <p className="form-prompt">
                        No applications yet. To start one, please fill out the form below.
                    </p>
                </div>
                <Form onClick={props.onClick} />
            </div>
        );
    }

    if (allClosed) {
        return (
            <div>
                <div>
                    <p className="form-prompt">
                        You only have closed applications. To start a new application, please fill out the form below.
                    </p>
                </div>
                <Form onClick={props.onClick} />
            </div>
        );
    }

    async function closeApplication(application) {
        try {
            const applicationId = application._id;
            const response = await fetch("http://localhost:3001/close-application", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ applicationId }),
            });
            
            if (response.ok) {
                console.log("Application closed successfully");
                const updatedApplications = applications.map(app => {
                    if (app.id === applicationId) {
                        return { ...app, status: "Closed" };
                    }
                    return app;
                });

                setApplications(updatedApplications);
            } else {
                console.error("Failed to close application");
            }
        } catch (error) {
            console.error(error);
        }
    }

    // if there are applications show status and date
    return (
        <div className="apps-container">
            <div className="row label">
                <p className="date-label">Date applied</p>
                <p className="status-label">Status</p>
            </div>
            {
                applications.map((application, index) => {
                    return (
                      <div className="row" key={index}>
                        {/* date applied */}
                        <p className="date-label">{application.studentSubmission.dateSubmission}</p>
                        {/* status */}
                        <p className="status-value">{application.status}</p>
                  
                        {/* if status is returned, add a view remarks button */}
                        {application.status === "Pending" ? (
                          // when user clicks view remarks, goes to /returned
                        <form action={`/returned/${application._id}`}>
                            <button type="submit" className="view-remarks-button">
                              View remarks
                            </button>
                          </form>
                        ) : (
                          <p></p>
                        )}
                  
                        {/* if status is cleared, no buttons will be shown */}
                        {application.status === "Closed" ? (
                          <p id="closed-text">Closed</p>
                        ) : (
                        <button className="app-button" onClick={() => closeApplication(application)}>Close application</button>
                        )}
                        {application.status === 'Cleared' ? (
                          <form action={`/pdf-generator`}>
                             <button className="print-button">
                                Print PDF
                             </button>   
                          </form>
                         
                        ):(
                          <p></p>
                        )}
                      </div>
                    );
                })
            }
        </div>
    )
}

export function PDFGenerator() {
    const dateGenerated = new Date().toLocaleDateString();
    const application = {
        name: 'John Doe',
        studentNumber: '12345',
        academicAdviser: 'Jane Smith',
        clearanceOfficer: 'John Smith',
    };

    const handlePrintPDF = () => {
        window.print();
    };

    return (
        <div>
            <button className="print-button" onClick={handlePrintPDF}>
                Print PDF
            </button>
            <PDFViewer width="100%" height="700px">
                <Document>
                    <Page style={styles.page}>
                        <View style={styles.header}>
                            <Text style={styles.title}>University of the Philippines Los Baños</Text>
                            <Text style={styles.subtitle}>College of Arts and Sciences</Text>
                            <Text style={styles.subtitle}>Institute of Computer Science</Text>
                            <Text>{dateGenerated}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>
                                This document certifies that {application.name}, {application.studentNumber} has satisfied
                                the clearance requirements of the institute.
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <Text>Verified:</Text>
                            <Text>Academic Adviser: {application.academicAdviser}</Text>
                            <Text>Clearance Officer: {application.clearanceOfficer}</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </div>
    );
}

function Footer() {
    return (
        <div className="footer">
            <p>All rights reserved. 2023</p>
        </div>
    )
}

export { Header, StudentInfo, Form, ProfileHeader, Application, Footer };