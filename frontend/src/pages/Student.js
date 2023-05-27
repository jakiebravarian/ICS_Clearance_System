import React from "react";
// import { useEffect, useState } from "react";

// import other components
import ProfileHeader from "./StudentComponents";

export default function Student() {
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


        </div>
    )
}