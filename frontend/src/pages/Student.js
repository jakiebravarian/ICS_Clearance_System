import React from "react";
import { useEffect, useState } from "react";
import Pikachu from '../assets/pikachu.png';

// import other components
import { Header, StudentInfo, ProfileHeader, Application, Footer } from "./StudentComponents";

// import data
import { userInfo } from '../data.js';

export default function Student() {

    // list of applications
    const [Applications, setApplications] = useState([])
    const [student, setStudent] = useState([])

    useEffect(() => {
        const upMail1 = localStorage.getItem("upMail");
        fetch("http://localhost:3001/get-current-student?"+"upMail="+upMail1)
          .then((response) => response.json())
          .then((body) => {
            setStudent(body);
          });
      }, []);
    
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
            
            <Header data={userInfo}/>

            {/* APPLICATION PROPER */}
            {/* student info */}

            <StudentInfo data={userInfo}/>

            {/* application (either form or list) */}
            <Application data={Applications} eventHandler={eventHandler}/>
        </div>
    )
}