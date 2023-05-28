import React from "react";

// import components from student components
import { Header, StudentInfo, ProfileHeader, Application, Footer } from "./StudentComponents";
import { userInfo } from "../data";

export default function Returned() {
    return(
        <div>
            <Header data={userInfo}/>
        </div>
    )
}