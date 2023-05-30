import React from "react";

// import components from student components
import { Header } from "./StudentComponents";
import { adminInfo } from "../data";
import { Menu } from "./AdminComponents";

export default function ManageAccounts() {
    return(
        <div>
            <Header data={adminInfo}/>

            {/* Menu */}
            <Menu option="ManageStudentApps"/>
        </div>
    )
}