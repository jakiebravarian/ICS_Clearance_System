import React, { useState, useEffect } from "react";
import gif from '../../assets/hourglass.gif';
import '../../assets/styles/Home.css'
import '../../assets/styles/VerifyDeny.css'
import { Footer } from '../ScreenComponents';
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


export default function Verify() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = new Cookies().get("authToken");
    console.log(authToken);
    if (!authToken) {
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  function logout() {
    const cookies = new Cookies();
    cookies.remove("authToken");
    localStorage.removeItem("upMail");
    setIsLoggedIn(false);
    navigate("/");
  }
  
  return (
    <div className="wrapper">
      <div id="page-header">
        <h1 id="page-header-h1">Institute of Computer Science - Clearance Approval System</h1>
      </div>
      <div id="verify-container">
        <h3 id="verify-h3">Wait for your account to be verified.</h3>
        <img src={gif} alt="" id="verify-gif" />
        <p id="verify-p">Please wait for the Administrator to verify your account.</p>
        {isLoggedIn && (
          <a href="/" id="back-button" onClick={logout}>Log Out</a>
        )}
      </div>
    </div>
  );
    
}

