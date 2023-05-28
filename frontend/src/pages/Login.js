import React from "react";
import logo from '../assets/ICS.png';
import '../assets/styles/Home.css'
import { useState } from "react";

// class Login extends React.Component {

//     render() {
//         return (
//             <div className="wrapper">
//                 {/* Navigation Menu */}
//                 <div className="navbar">
//                     <a href="/">Home</a>
//                     <a href="/signup">Sign Up</a>
//                     <div class="dropdown">
//                         <button class="dropbtn">Log in
//                             <i class="fa fa-angle-down"></i>
//                         </button>
//                         <div class="dropdown-content">
//                             <a href="/login">Student</a>
//                             <a href="/login-approver">Approver</a>
//                             {/* <a href="#">Admin</a> */}
//                         </div>
//                     </div>
//                 </div>
//                 {/* Left Side */}
//                 <div className="container" id="login-container">
//                     <img src={logo} alt="" id="login-img" />
//                     <h2 id="login-h2">Institute of Computer Science</h2>
//                     <h3>CLEARANCE APPROVAL SYSTEM</h3>
//                 </div>
//                 {/* Right Side */}
//                 <div className="form">
//                     <h1 id="login-h1">Welcome Back, Student!</h1>
//                     <input type="text" placeholder="UP Mail" id="email-login" required={true} /> <br />
//                     <input type="password" placeholder="Password" id="password-login" required={true} /> <br />
//                     <button id="login-button">Login</button>
//                     <p id="login-p">Don’t have an account yet? <span><a href="/signup" id="signup-link">Sign up</a></span></p>
//                 </div>
//             </div>
//         )
//     }
// }

export default function Login(){
    const [upMail, setUpMail] = useState("");
    const [password, setPassword] = useState("")

    const handleUpMail = (e) => {
        setUpMail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    } 

    //incomplete, kulang pa yung sa cookies banda
    function handleLogin(){
        fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            upMail: upMail,
            password: password
          })
        })
          .then(console.log);

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
            <form className="form">
                <h1 id="login-h1">Welcome Back, Student!</h1>
                <input type="text" placeholder="UP Mail" id="email-login" required={true} onChange={handleUpMail}/> <br />
                <input type="password" placeholder="Password" id="password-login" required={true} onChange={handlePassword} /> <br />
                <button onClick={handleLogin()} id="login-button">Login</button>
                <p id="login-p">Don’t have an account yet? <span><a href="/signup" id="signup-link">Sign up</a></span></p>
            </form>
        </div>
    )
}