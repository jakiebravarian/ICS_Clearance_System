import React from "react";

// import components from student components
import { Header, StudentInfo, ProfileHeader, Application, Footer, Form } from "./StudentComponents";
import {getCurrentStudent, remarks } from "../../data";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Pikachu from '../../assets/pikachu.png';
import {useNavigate} from 'react-router-dom';


export default function Returned() {
    // const userInfo = StudentUserInfo();
    const { appId } = useParams();
    console.log(appId);

    // Use the appId parameter as needed
    
    const [student, setStudent] = useState([]);
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state
    const [Applications, setApplications] = useState([])
    const [currentApplication, setCurrentApplication] = useState();
    const [remarkss, setRemarks] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const upMail1 = localStorage.getItem("upMail");
      
        const fetchData = async () => {
          const studentData = await getCurrentStudent(upMail1);
          if (studentData) {
            setStudent(studentData);
            console.log(studentData);
            const currentApp = studentData.application.find(app => app._id   === appId);
             setCurrentApplication(currentApp);
             setRemarks(currentApp.remarks[currentApp.remarks.length - 1]);
            
            setUserInfo({
                userId: studentData._id,
              name: studentData.firstName + " " + studentData.middleName + " " + studentData.lastName,
              studno: studentData.studentNumber,
              course: studentData.degreeProgram,
              college: studentData.college,
              classification: studentData.userType,
              hasOpenedApplication: studentData.hasOpenedApplication,
              icon: Pikachu,
            });
             setApplications(studentData.application);

             
             setRemarks(currentApp.remarks[currentApp.remarks.length - 1]);

          }
        };  

        fetchData();
      }, []);

      async function resubmitApplication(event,studentSubmission,step,bool) {
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
    
    return(
        <div>
            {/* header */}
            <Header data={userInfo}/>

            {/* remarks */}
            <div>
                <p className="form-prompt">Returned application; please see remarks:</p>
            </div>

            <div className="remarks">
                Remarks: {remarkss.remark }    Date of Remarks: { remarkss.dateRemark } Commenter: {remarks.commenter} stepGivenRemark: { remarkss.stepGivenRemark}
            
            </div>
            {/* form */}
            <Form onClick={resubmitApplication} currentApplication = {currentApplication} userInfo = {userInfo}/>
        </div>
    )
}