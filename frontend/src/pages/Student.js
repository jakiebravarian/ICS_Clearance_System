import React from "react";
// import { useEffect, useState } from "react";

// import other components
import ProfileHeader from "./StudentComponents";

export default function Student() {
    return (
        <div>
            {/* header */}
            <div className="header row">
                <h1 className="header-text">Institute of Computer Science - Clearance Approval System</h1>
            </div>
                
            <ProfileHeader name="Alexandra Siocon" classification="Student" icon="https://cdn.fansshare.com/image/pikachu/pikachu-wallpaper-540621355.jpg"/>
        </div>
    )
}