import React from "react";

// import components from student components
import { Header, StudentInfo, ProfileHeader, Application, Footer, Form } from "./StudentComponents";
import {getCurrentStudent, remarks } from "../data";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Pikachu from '../assets/pikachu.png';



export default function Returned() {
    // const userInfo = StudentUserInfo();
    const { appId } = useParams();

    // Use the appId parameter as needed
    
    const [student, setStudent] = useState([]);
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state
    const [Applications, setApplications] = useState([])
    const [currentApplication, setCurrentApplication] = useState()
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
    
    return(
        <div>
            {/* header */}
            <Header data={userInfo}/>

            {/* remarks */}
            <div>
                <p className="form-prompt">Returned application; please see remarks:</p>
            </div>

            <div className="remarks">
                Remarks: {remarks.remarks}
            </div>

            {/* form */}
            <Form/>
        </div>
    )
}