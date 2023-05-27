import React from "react";

// header profile component
function ProfileHeader(props) {
    let name = props.name       // name of logged in user
    let icon = props.icon;      // icon of the logged in user
    let classification = props.classification // classification of the user

    return(
        // renders logged in user's name and icon
        <div className="profile-header row">
            <div className="profile-name">
                {name}
            </div>
            <div className="classification">
                {classification}
            </div>
            <div>
                <img className= "profile-icon-img" src={icon}></img>
            </div>
        </div>
    )
}

export default ProfileHeader;