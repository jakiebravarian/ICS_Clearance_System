import React from "react";
import png from '../../assets/rejected-rubber-stamp.png';
import '../../assets/styles/Home.css'
import '../../assets/styles/VerifyDeny.css'
import { Footer } from '../ScreenComponents';

class Reject extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div id="page-header-verify">
                    <h1 id="page-header-h1-verify">Institute of Computer Science - Clearance Approval System</h1>
                    <h1 id="page-header-h1-M-verify">ICS - Clearance Approval System</h1>
                </div>
                <div id="verify-container">
                    <h3 id="verify-h3">Your account application has been rejected.</h3>
                    <img src={png} alt="" id="verify-gif"></img>
                    <a href="/" id="back-button">Back</a>
                </div>
                <Footer data="verify-footer" />
            </div>
        )
    }
}

export default Reject