import React from "react";

// import components from student components
import { Header, Footer } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu } from "./AdminComponents";

export default function ManageApplications() {
    return (
        <div>
            <Header data={adminInfo} />

            {/* Menu */}
            <Menu option="ManageStudentApps" />

            
        </div>
    )
}