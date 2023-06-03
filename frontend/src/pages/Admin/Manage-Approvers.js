import React from "react";

// import components from student components
import { Header } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu } from "./AdminComponents";

export default function ManageApprovers() {
    return (
        <div>
            <Header data={adminInfo} />

            {/* Menu */}
            <div className="admin-menu">
                <Menu option="ManageApprovers" />
            </div>
        </div>
    )
}