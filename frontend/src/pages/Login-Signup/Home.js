import React from "react";
import logo from '../../assets/ICS.png';
import '../../assets/styles/Home.css'
import { Footer } from '../ScreenComponents';

class Home extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <header className="navbar">
                    <a href="/">Home</a>
                    <a href="/signup" id="signup">Sign Up</a>
                    <div class="dropdown">
                        <button class="dropbtn">Log in
                            <i class="fa fa-angle-down"></i>
                        </button>
                        <div class="dropdown-content">
                            <a href="/login">Student</a>
                            <a href="/login-approver">Approver</a>
                        </div>
                    </div>
                </header>
                <div className="container">
                    <img id="ics-logo" src={logo} alt="" />
                    <div className="box">
                        <h2>Institute of Computer Science</h2>
                        <h3>CLEARANCE APPROVAL SYSTEM</h3>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home