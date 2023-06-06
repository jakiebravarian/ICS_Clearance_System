import React from "react";
import { useEffect, useState } from "react";
import Pikachu from '../../assets/pikachu.png';
import {useNavigate} from "react-router-dom";

// import other components
import { Header, StudentInfo, ProfileHeader, Application, Footer } from "./StudentComponents";

// import data
import { getCurrentStudent } from "../../data";


export default  function Student() {

    // list of applications
    const [Applications, setApplications] = useState([])
    const [student, setStudent] = useState([]);
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state
    const [isVerified, setVerified] = useState(false);
    const [currentApplication, setCurrentApplication] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
        const upMail1 = localStorage.getItem("upMail");
      
        const fetchData = async () => {
          const studentData = await getCurrentStudent(upMail1);
          console.log(studentData);
          if(studentData.isVerified === "Pending"){
            navigate("/verify");
           }else if(studentData.isVerified === "Rejected"){
            navigate("/reject");
           }
          if (studentData) {
            setStudent(studentData);
            setUserInfo({
              userId: studentData._id,
              name: studentData.firstName + " " + studentData.middleName + " " + studentData.lastName,
              studno: studentData.studentNumber,
              course: studentData.degreeProgram,
              college: studentData.college,
              classification: studentData.userType,
              isVerified: studentData.isVerified,
              hasOpenedApplication: studentData.hasOpenedApplication,
              icon: Pikachu,
            });
             setApplications(studentData.application);
             console.log(userInfo.isVerified);
            if(Applications.length !== 0){
              Applications.forEach((application)=>{
                if(application.status !== "Closed"){
                  setCurrentApplication(application); // Assuming you want to set the current application state here
                }
              })
            }
          }
        };
      
        fetchData();
      }, []);
    
    
    // add to list of applications when user inputs data
    function eventHandler(event,studentSubmission,conditions) {
      event.preventDefault(); // prevent the form from submitting and refreshing the page
      
      console.log('onClick executed');

      if(conditions.bool){
        var newApplication = {
          upMail: student.upMail,
          dateApplied: studentSubmission.dateSubmission,
          status: "Open",
          step: 1, // Set the initial value for the step field
          remarks: [], // Initialize an empty array for remarks
          studentSubmission: {
            remarkSubmission: studentSubmission.remarkSubmission,
            dateSubmission: studentSubmission.dateSubmission,
            stepGivenSubmission: studentSubmission.stepGivenSubmission,
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
      }else{
        var newApplication = {
          studentSubmission: {
            remarkSubmission: studentSubmission.remarkSubmission,
            dateSubmission: studentSubmission.dateSubmission,
            stepGivenSubmission: studentSubmission.stepGivenSubmission,
          },
        };
        resubmitApplication(event,newApplication);
      }
    }

    async function resubmitApplication(event,studentSubmission) {
      currentApplication.updatedStudentSubmission = studentSubmission;
      try {
        const response = await fetch("http://localhost:3001/update-student-submission", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentApplication}),
        });
  
        if (response.ok) {
          console.log("Succesfully resubmitted application!");
          navigate("/student");
        } else {
          console.error("Failed to resubmit application");
        }
      } catch (error) {
        console.error(error);
      }
    }
   
    
    return (
        <div>
            
            <Header data={userInfo}/>

            {/* APPLICATION PROPER */}
            {/* student info */}

            <StudentInfo data={userInfo}/>

            {/* application (either form or list) */}
            <Application data={Applications} onClick={eventHandler} setApplications={setApplications} student={userInfo} currentApplication = {currentApplication}/>
        </div>
    )
}