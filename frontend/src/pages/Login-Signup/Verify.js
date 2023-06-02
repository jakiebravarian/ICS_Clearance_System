import React from "react";
import gif from '../../assets/hourglass.gif';
import '../../assets/styles/Home.css'
import '../../assets/styles/VerifyDeny.css'
import { Footer } from '../ScreenComponents';

class Verify extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div id="page-header">
                    <h1 id="page-header-h1">Institute of Computer Science - Clearance Approval System</h1>
                    <h1 id="page-header-h1-M">ICS - Clearance Approval System</h1>
                </div>
                <div id="verify-container">
                    <h3 id="verify-h3">Wait for your account to be verified.</h3>
                    <img src={gif} alt="" id="verify-gif"></img>
                    <p id="verify-p">Your account is still under review.</p>
                    <p id="verify-p">Please wait for the Administrator to verify your account.</p>
                    <a href="/" id="back-button">Back</a>
                </div>
                <Footer data="verify-footer" />
            </div>
        )
    }
}

export default Verify