import React from "react";
import { useEffect, useState } from "react";
import Pikachu from '../assets/pikachu.png';

// import other components
import { Header, StudentInfo, ProfileHeader, Application, Footer } from "./StudentComponents";

// import data
import { getCurrentStudent } from "../data";


export default  function Student() {

    // list of applications
    const [Applications, setApplications] = useState([])
    const [student, setStudent] = useState([]);
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state

    useEffect(() => {
        const upMail1 = localStorage.getItem("upMail");
      
        const fetchData = async () => {
          const studentData = await getCurrentStudent(upMail1);
          console.log(studentData.firstName);
          if (studentData) {
            setStudent(studentData);
      
            setUserInfo({
                userId: studentData._id,
              name: studentData.firstName + " " + studentData.middleName + " " + studentData.lastName,
              studno: studentData.studentNumber,
              course: studentData.course,
              college: studentData.college,
              classification: studentData.userType,
              icon: Pikachu,
            });
          }
        };
      
        fetchData();
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