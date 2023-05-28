import React from "react";
import { useEffect, useState } from "react";

// import other components
import { ProfileHeader, Application, Footer } from "./StudentComponents";

export default function Student() {
    // list of applications
    const [Applications, setApplications] = useState([
        // sample initial data
        // {
        //     "dateApplied": "May 29, 2023",
        //     "status": "Pending"
        // }

    ])

    // add to list of applications when user inputs data
    function eventHandler() {
        // get user inputs
        var dateApplied = document.getElementById("date-applied").value;

        // create a new application object
        var newApplication = {
            "dateApplied": dateApplied,
            "status": "Pending"
        }

        // add new application to the list of applications
        setApplications([...Applications, newApplication]);
    }

    return (
        <div className="wrapper">
            {/* header */}
            <div className="header">
                <h1 className="header-text">Institute of Computer Science - Clearance Approval System</h1>
            </div>
                
            {/* profile indicator */}
            <ProfileHeader name="Alexandra Siocon" classification="Student" icon="https://cdn.fansshare.com/image/pikachu/pikachu-wallpaper-540621355.jpg"/>

            {/* APPLICATION PROPER */}
            {/* student info */}

            <p className="student-info-text">Student info</p>
            <div className="student-info-box">
                {/* info container */}
                <div className="info-container">
                    {/* name */}
                    <div id="name-container">
                        Alexandra Siocon
                    </div>
                    {/* Student number */}
                    <div id="studno-container">
                        2020-12345
                    </div>
                    {/* course */}
                    <div id="course-container">
                        BSCS
                    </div>
                    {/* college */}
                    <div id="college-container">
                        CAS
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

            {/* application (either form or list) */}
            <Application data={Applications} eventHandler={eventHandler}/>

            {/* footer */}
            <Footer/>
        </div>
    )
}