import React from "react";

// header profile component
function ProfileHeader(props) {
    let name = props.name       // name of logged in user
    let icon = props.icon;      // icon of the logged in user

    return(
        // renders logged in user's name and icon
        <div className="row">
            <h5>{name}</h5>
            <img src={icon}></img>
        </div>
    )
}

export default ProfileHeader;