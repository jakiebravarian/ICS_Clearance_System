import React from "react";
// import { useEffect, useState } from "react";

// import other components
import ProfileHeader from "./StudentComponents";

export default function Student() {
    return (
        <div>
            {/* header */}
            <div className="header row">
                <h3 className="centered">Institute of Computer Science - Clearance Approval System</h3>
                
                {/* profile */}
                <ProfileHeader name="Alexanda Siocon" icon="https://img.freepik.com/free-icon/pikachu_318-196537.jpg"/>
            </div>
        </div>
    )
}