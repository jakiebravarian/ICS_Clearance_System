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
          if (studentData) {
            setStudent(studentData);
            setUserInfo({
                userId: studentData._id,
              name: studentData.firstName + " " + studentData.middleName + " " + studentData.lastName,
              studno: studentData.studentNumber,
              course: studentData.degreeProgram,
              college: studentData.college,
              classification: studentData.userType,
              icon: Pikachu,
            });
             setApplications(studentData.application);
          }
        };
      
        fetchData();
      }, []);
    
    
    // add to list of applications when user inputs data
    function eventHandler(event,githubLink,dateApplied) {
      event.preventDefault(); // prevent the form from submitting and refreshing the page
      
      console.log('onClick executed');

      var newApplication = {
        upMail: student.upMail,
        dateApplied: dateApplied,
        status: "Pending",
        step: 1, // Set the initial value for the step field
        remarks: [], // Initialize an empty array for remarks
        studentSubmission: {
          remarkSubmission: githubLink,
          dateSubmission: dateApplied,
          stepGivenSubmission: 1,
        },
      };
    
      // Make a POST request to the backend API endpoint
      fetch("http://localhost:3001/submit-application", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApplication),
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response if needed
          console.log(data);
          // Update the state or perform any other actions
          setApplications([...Applications, data]);
        })
        .catch(error => {
          // Handle errors if needed
          console.error(error);
        });
    }
    
    return (
        <div>
            
            <Header data={userInfo}/>

            {/* APPLICATION PROPER */}
            {/* student info */}

            <StudentInfo data={userInfo}/>

            {/* application (either form or list) */}
            <Application data={Applications} onClick={eventHandler} setApplications={setApplications} student={userInfo}/>
        </div>
    )
}