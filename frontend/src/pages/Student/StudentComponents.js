import React from "react";
import {useState,useEffect} from "react";

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
                <img className= "profile-icon-img" src={icon}></img>
            </div>
        </div>
    )
}

// renders header on the page
function Header(props) {
    let userInfo = props.data;

    return(
        <div id="page-header">
            <h1 id="page-header-h1">Institute of Computer Science - Clearance Approval System</h1>
            {/* profile indicator */}
            <ProfileHeader name={userInfo.name} classification={userInfo.classification} icon={userInfo.icon}/>
        </div>
    )
}

// renders student info
function StudentInfo(props) {
    let studentInfo = props.data; 
    
    return(
        <div>
            <p className="student-info-text">Student info</p>
            <div className="student-info-box">
                {/* info container */}
                <div className="info-container">
                    {/* name */}
                    <div id="name-container">
                        {studentInfo.name}
                    </div>
                    {/* Student number */}
                    <div id="studno-container">
                        {studentInfo.studno}
                    </div>
                    {/* course */}
                    <div id="course-container">
                        {studentInfo.course}
                    </div>
                    {/* college */}
                    <div id="college-container">
                        {studentInfo.college}
                    </div>
                </div>
                
                {/* labels */}
                <div className="row labels">
                    <p id="name-label">Name</p>
                    <p id="studno-label">Student number</p>
                    <p id="course-label">Course</p>
                    <p id="college-label">College</p>
                </div>
            </div>
        </div>
    )
}

// renders form on the homepage
function Form({onClick}) {
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Retrieve form input values
        const githubLink = document.getElementById("github-link").value;
        const dateApplied = document.getElementById("date-applied").value;
        const remarkValue = document.getElementById("remarks").value;
        const studentSubmission = {
          dateSubmission: dateApplied,
        }
        if(remarkValue.length === 0){
          studentSubmission.remarkSubmission = githubLink;
          studentSubmission.stepGivenSubmission = 1;
        }else{
          studentSubmission.remarkSubmission = remarkValue;
          studentSubmission.stepGivenSubmission = 2;
        }
        console.log(studentSubmission);
        // Call the onClick event handler and pass the values as parameters
        onClick(event,studentSubmission);
      };
    return(
        <div>
            {/*form */}
            <form action="">
                <div className="form-section">
                    {/* first row */}
                    <div className="row">
                        <div>
                            <label htmlFor="first-name">First name</label><br/>
                            <input placeholder="Juan" id="first-name"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="middle-name">Middle name</label><br/>
                            <input placeholder="Martinez" id="middle-name"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="Last-name">Last name</label><br/>
                            <input placeholder="dela Cruz" id="last-name"/><br></br>
                        </div>
                    </div>

                    {/* second row */}
                    <div className="row">
                        <div>
                            <label htmlFor="student-number">Student number</label><br/>
                            <input placeholder="20xx-xxxx" id="student-number"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="degree-program">Degree program</label><br/>
                            <input placeholder="e.g. BSCS" id="degree-program"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="college">College</label><br/>
                            <input placeholder="e.g. CAS" id="college"/><br></br>
                        </div>
                    </div>

                    {/* third row */}
                    <div className="row">
                        <div>
                            <label htmlFor="github-link">Github link</label><br/>
                            <input placeholder="github.com/username" id="github-link"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="date-applied">Date applied</label><br/>
                            <input id="date-applied"/><br></br>
                        </div>
                        <div>
                            <label htmlFor="remarks">Remarks</label><br/>
                            <input placeholder="Skip if not a returned application" id="remarks"/><br></br>
                        </div>
                    </div>
                    {/* button */}
                    <div className="centered">
                        <button type='submit' className='button' onClick={handleSubmit}>SUBMIT APPLICATION</button>
                    </div>
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
    const [allClosed,setAllApplicationsClosed]=useState(false);
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

    if(allClosed){
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
    return(
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
                        {application.status === "Returned" ? (
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
                      </div>
                    );
                  })
            }
        </div>
    )
}

function Footer() {
    return(
        <div className="footer">
            <p>All rights reserved. 2023</p>
        </div>
    )
}

export { Header, StudentInfo, Form, ProfileHeader, Application, Footer };