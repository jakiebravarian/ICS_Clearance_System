import React from "react";

// import components from student components
import { Header } from "../Student/StudentComponents";
import { adminInfo } from "../data";
import { Menu } from "./AdminComponents";

export default function ManageApprovers() {
    return(
        <div>
            <Header data={adminInfo}/>

            {/* Menu */}
            <Menu option="ManageApprovers"/>
        </div>
    )
}