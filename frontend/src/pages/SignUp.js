import React from "react";
import logo from '../assets/ICS.png';
import '../assets/styles/Home.css'

class SignUp extends React.Component {

    render() {
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
                <div className="form">
                    <h1 id="signup-h1">Create an Account</h1>
                    <input type="text" placeholder="First Name" id="first-name" required={true} /> <br />
                    <input type="text" placeholder="Middle Name" id="middle-name" /> <br />
                    <input type="text" placeholder="Last Name" id="last-name" required={true} /> <br />
                    <input type="text" placeholder="Student Number" id="student-number" required={true} /> <br />
                    <input type="text" placeholder="Degree Program" id="degree-program" /> <br />
                    <input type="text" placeholder="College" id="college" required={true} /> <br />
                    <input type="text" placeholder="UP Mail" id="email" required={true} /> <br />
                    <input type="password" placeholder="Password" id="password" required={true} /> <br />
                    <button id="signup-button">Sign Up</button>
                </div>
            </div>
        )
    }
}

export default SignUp