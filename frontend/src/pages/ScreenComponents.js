import React from "react";

// header profile component
function ProfileHeader(props) {
    let name = props.name       // name of logged in user
    let icon = props.icon;      // icon of the logged in user
    let classification = props.classification // classification of the user

    return (
        // renders logged in user's name and icon
        <div id="profile-header">
            <div id="profile-text">
                <div id="profile-name">
                    {name}
                </div>
                <div id="classification">
                    {classification}
                </div>
            </div>
            <div>
                <img id="profile-icon-img" src={icon} alt=""></img>
            </div>
        </div>
    )
}

// renders header on the page
function Header(props) {
    let userInfo = props.data;

    return (
        <div id="page-header-user">
            <h1 id="page-header-h1">Institute of Computer Science - Clearance Approval System</h1>
            <h1 id="page-header-h1-M">ICS - Clearance Approval System</h1>
            {/* profile indicator */}
            <ProfileHeader name={userInfo.name} classification={userInfo.classification} icon={userInfo.icon} />
        </div>
    )
}

function Footer(props) {
    let footerID = props.data;
    return (
        <footer className="footer" id={footerID}>
            <p>© Copyright 2023 All Rights Reserved</p>
        </footer>
    )
}

export { Header, ProfileHeader, Footer };