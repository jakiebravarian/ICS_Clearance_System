import React from "react";
import logo from '../assets/ICS.png';
import '../assets/styles/Home.css'
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function Login() {
    // added use states
    const [upMail, setUpMail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (isLoggedIn) {
        navigate("/verify");
      }
    }, [isLoggedIn, navigate]);
  
    const handleUpMail = (e) => {
      setUpMail(e.target.value);
    };
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
  
    function handleLogin(e) {
      e.preventDefault();
      fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          upMail: upMail,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((body) => {
          if (body.success) {
            setIsLoggedIn(true);
            // successful log in. store the token as a cookie
            const cookies = new Cookies();
            cookies.set("authToken", body.token, {
              path: "localhost:3001/",
              age: 60 * 60,
              sameSite: false,
            });
  
            localStorage.setItem("upMail", body.upMail);
            console.log(body.upMail);
            // Check the adviser attribute
            navigate("/verify");
          } else {
            alert("Log in failed");
          }
        });
    }
        // setPassword(e.target.value);
    // }

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

                <button onClick={handleLogin} id="login-button">Login</button>
          <p id="login-p">Don’t have an account yet? <span><a href="/signup" id="signup-link">Sign up</a></span></p>
        </form>
      </div>
    )
  
}