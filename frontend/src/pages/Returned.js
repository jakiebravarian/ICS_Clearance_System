import React from "react";

// import components from student components
import { Header, StudentInfo, ProfileHeader, Application, Footer, Form } from "./StudentComponents";
import {getCurrentStudent, remarks } from "../data";
import { useEffect, useState } from "react";
import Pikachu from '../assets/pikachu.png';



export default function Returned() {
    // const userInfo = StudentUserInfo();
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