import React from "react";
import { useEffect, useState } from "react";
import Pikachu from '../../assets/pikachu.png';

// import other components
import { Header, StudentInfo, ProfileHeader, Application, Footer } from "./StudentComponents";

// import data
import { userInfo } from '../../data.js';

export default function Student() {

    // list of applications
    const [Applications, setApplications] = useState([
        // sample initial data
        // uncomment the status to see what it renders to the screen

        //  pending
        // {
        //     "dateApplied": "May 29, 2023",
        //     "status": "Pending"
        // },

        // returned
        // {
        //     "dateApplied": "May 29, 2023",
        //     "status": "Returned"
        // },

        // cleared
        // {
        //     "dateApplied": "May 29, 2023",
        //     "status": "Cleared"
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
        <div>

            <Header data={userInfo} />

            {/* APPLICATION PROPER */}
            {/* student info */}

            <StudentInfo data={userInfo} />

            {/* application (either form or list) */}
            <Application data={Applications} eventHandler={eventHandler} />
        </div>
    )
}