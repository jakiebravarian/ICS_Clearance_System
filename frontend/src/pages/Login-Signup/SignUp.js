import React from "react";
import logo from '../../assets/ICS.png';
import '../../assets/styles/Home.css'
import { useState } from 'react';
import { useForm } from "react-hook-form";

export default function SignUp() {
    // added use states
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
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
    function handleSignUp() {
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
                college: college,
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

    // for form validation
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        // console.log(JSON.stringify(data));
        try {
            handleSignUp();
            reset()
        } catch (error) {
            console.log(error)
        }

    };

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
            <form className="form" id="form-signup" onSubmit={handleSubmit(onSubmit)}>
                <h1 id="signup-h1">Create an Account</h1>

                {/* First Name Input */}
                <input
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    {...register("firstName", {
                        onChange: handleFname,
                        required: "Please enter your First Name",
                    })}
                />
                {errors.firstName && <p id="error-message">{errors.firstName.message}</p>}

                {/* Middle Name Input */}
                <input
                    type="text"
                    id="middle-name"
                    placeholder="Middle Name (Optional)"
                    {...register("middleName", {
                        onChange: handleMname,
                    })}
                />
                {errors.middleName && <p id="error-message">{errors.middleName.message}</p>}

                {/* Last Name Input */}
                <input
                    type="text"
                    id="last-name"
                    placeholder="Last Name"
                    {...register("lastName", {
                        onChange: handleLname,
                        required: "Please enter your Last Name",
                    })}
                />
                {errors.lastName && <p id="error-message">{errors.lastName.message}</p>}

                {/* Student Number Input */}
                <input
                    type="text"
                    id="student-number"
                    placeholder="Student Number (e.g. 2023-12345)"
                    {...register("studentNumber", {
                        onChange: handleStudentNum,
                        required: "Please enter your Student Number",
                        pattern: {
                            value: /[0-9]+-[0-9]+/i,
                            message: "Invalid Student Number"
                        },
                        minLength: {
                            value: 10,
                            message: "Student Number must be exactly 10 characters"
                        },
                        maxLength: {
                            value: 10,
                            message: "Student Number must be exactly 10 characters"
                        }

                    })}
                />
                {errors.studentNumber && <p id="error-message">{errors.studentNumber.message}</p>}

                {/* Degree Program Input */}
                <input
                    type="text"
                    id="degree-program"
                    placeholder="Degree Program (e.g. BS Computer Science)"
                    {...register("degreeProgram", {
                        onChange: handleDegProg,
                        required: "Please enter your Degree Program",
                    })}
                />
                {errors.degreeProgram && <p id="error-message">{errors.degreeProgram.message}</p>}

                {/* College Input */}
                <input
                    type="text"
                    id="college"
                    placeholder="College (e.g. College of Arts and Sciences)"
                    {...register("college", {
                        onChange: handleCollege,
                        required: "Please enter your College",
                    })}
                />
                {errors.college && <p id="error-message">{errors.college.message}</p>}

                {/* UP Mail Input */}
                <input
                    type="email"
                    id="email"
                    placeholder="UP Mail"
                    {...register("email", {
                        onChange: handleUpMail,
                        required: "Please enter your UP Mail",
                        pattern: {
                            value: /^([a-z0-9]+)@up\.edu\.ph$/i,
                            message: "Invalid UP Mail"
                        }
                    })}
                />
                {errors.email && <p id="error-message">{errors.email.message}</p>}

                {/* Password Input */}
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                        onChange: handlepassword,
                        required: "Please enter your Password",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {errors.password && <p id="error-message">{errors.password.message}</p>}

                <button type="submit" id="signup-button">Sign Up</button>
            </form>
        </div>
    )
}