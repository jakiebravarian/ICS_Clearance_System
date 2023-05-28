import React from "react";
import logo from '../assets/ICS.png';
import '../assets/styles/Home.css'
import { useState } from 'react';

export default function SignUp(){
    // added use states
    const [firstName, setFirstName] = useState("");
    const [middleName,setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("")
    const [studentNum, setStudentNum] = useState("");
    const [degreeProgram, setDegreeProgram] = useState("");
    const [upMail, setUpMail] = useState("");
    const [password, setPassword] = useState("");
    
    //other attributes in database; initally null; student signup usertype is default student
    const userType = "Student";
    const adviser = null;
    const application = null;
    
    //fetch from backend
    function handleSignUp(){
        fetch('http://localhost:3001/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            upMail: upMail,
            password: password,
            studentNumber: studentNum,
            college: college   ,
            degreeProgram: degreeProgram,
            userType: userType,
            adviser: adviser,
            application: application,
          })
        })
          .then(console.log);

    }

    //functions that handle changes on each input
    const handleFname = (e) => {
        setFirstName(e.target.value);
    }

    const handleMname = (e) => {
        setMiddleName(e.target.value);
    }

    const handleLname = (e) => {
        setLastName(e.target.value);
    }

    const handleStudentNum = (e) => {
        setStudentNum(e.target.value);
    }

    const handleDegProg = (e) => {
        setDegreeProgram(e.target.value);
    }
    
    const handleCollege = (e) => {
        setCollege(e.target.value);
    }

    const handleUpMail = (e) => {
        setUpMail(e.target.value);
    }

    const handlepassword = (e) => {
        setPassword(e.target.value);
    } 
    return (
        <div className="wrapper">
            {/* Navigation Menu */}
            <div className="navbar">
                <a href="/">Home</a>
                <a href="/signup">Sign Up</a>
                <div class="dropdown">
                    <button class="dropbtn">Log in
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <div class="dropdown-content">
                        <a href="/login">Student</a>
                        <a href="/login-approver">Approver</a>
                        {/* <a href="#">Admin</a> */}
                    </div>
                </div>
            </div>
            {/* Left Side */}
            <div className="container" id="login-container">
                <img src={logo} alt="" id="login-img" />
                <h2 id="login-h2">Institute of Computer Science</h2>
                <h3>CLEARANCE APPROVAL SYSTEM</h3>
            </div>
            {/* Right Side */}
            {/* changed to form to implement reset */}
            <form className="form">
                <h1 id="signup-h1">Create an Account</h1>
                <input type="text" placeholder="First Name" id="first-name" required={true} onChange={handleFname} /> <br />
                <input type="text" placeholder="Middle Name" id="middle-name" onChange={handleMname}/> <br />
                <input type="text" placeholder="Last Name" id="last-name" required={true} onChange={handleLname} /> <br />
                <input type="text" placeholder="Student Number" id="student-number" required={true} onChange={handleStudentNum} /> <br />
                <input type="text" placeholder="Degree Program" id="degree-program" onChange={handleDegProg}/> <br />
                <input type="text" placeholder="College" id="college" required={true} onChange={handleCollege}  /> <br />
                <input type="text" placeholder="UP Mail" id="email" required={true} onChange={handleUpMail}/> <br />
                <input type="password" placeholder="Password" id="password" required={true} onChange={handlepassword}/> <br />
                <button type="reset"id="signup-button" onClick={()=> {handleSignUp()}}>Sign Up</button>
            </form>
        </div>
    )
}