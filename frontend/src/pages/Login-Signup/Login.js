import React from "react";
import logo from '../../assets/ICS.png';
import '../../assets/styles/Home.css'
import '../../assets/styles/LoginSignup.css'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Footer } from '../ScreenComponents';

export default function Login() {
    // added use states
    const [upMail, setUpMail] = useState("");
    const [password, setPassword] = useState("")

    //fetch from backend
    //incomplete, kulang pa yung sa cookies banda
    function handleLogin() {
        // fetch('http://localhost:3001/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         upMail: upMail,
        //         password: password
        //     })
        // })
        //     .then(console.log);
    }

    //functions that handle changes on each input
    const handleUpMail = (e) => {
        setUpMail(e.target.value);
    }

    const handlePassword = (e) => {
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
            handleLogin();
            reset();
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="wrapper">
            {/* Navigation Menu */}
            <div className="navbar" id="navbar-login">
                <a href="/">Home</a>
                <a href="/signup">Sign Up</a>
                <div className="dropdown">
                    <button className="dropbtn">Log in
                        <i className="fa fa-angle-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="/login">Student</a>
                        <a href="/login-approver">Approver</a>
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
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h1 id="login-h1">Welcome Back, Student!</h1>

                {/* UP Mail Input */}
                <input
                    type="email"
                    id="email-login"
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
                    id="password-login"
                    placeholder="Password"
                    {...register("password", {
                        onChange: handlePassword,
                        required: "Please enter your Password",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    })}
                />
                {errors.password && <p id="error-message">{errors.password.message}</p>}

                <button type="submit" id="login-button">Login</button>

                <p id="login-p">Don’t have an account yet? <span><a href="/signup" id="signup-link">Sign up</a></span></p>
            </form>
            <Footer data="login-footer" />
        </div>
    )
}