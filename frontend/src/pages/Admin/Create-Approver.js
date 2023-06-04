import React from "react";
import logo from '../../assets/ICS.png';
import '../../assets/styles/Home.css';
import { useState } from 'react';
import { useForm } from "react-hook-form";

export default function CreateApproverAccount() {
    // added use states
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [upMail, setUpMail] = useState("");
    const [password, setPassword] = useState("");

    //fetch from backend
    function handleSignUp() {

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
            {/* Left Side */}
            <div className="container" id="login-container">
                <img src={logo} alt="" id="login-img" />
                <h2 id="login-h2">Institute of Computer Science</h2>
                <h3>CLEARANCE APPROVAL SYSTEM</h3>
            </div>
            {/* Right Side */}

            {/* changed to form to implement reset */}
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h1 id="signup-h1">Create Approver Account</h1>

                {/* First Name Input */}
                <input
                    type="text"
                    id="first-name"
                    placeholder="First Name"
                    {...register("firstName", {
                        onChange: handleFname,
                        required: "Please enter Approver's First Name",
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
                        required: "Please enter Approver's Last Name",
                    })}
                />
                {errors.lastName && <p id="error-message">{errors.lastName.message}</p>}

                {/* UP Mail Input */}
                <input
                    type="email"
                    id="email"
                    placeholder="UP Mail"
                    {...register("email", {
                        onChange: handleUpMail,
                        required: "Please enter Approver's UP Mail",
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
                        required: "Please enter Approver's Password",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {errors.password && <p id="error-message">{errors.password.message}</p>}

                <button type="submit" id="signup-button">Create</button>
            </form>
        </div>
    )

}