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

            {/* sorting section */}
            <div className="row student-sort-section">
                {/* text */}
                <div>
                    <p className="roboto-slab section-name-text">Approver Accounts</p>
                </div>

                {/* create approver button */}
                <div>
                    
                </div>
                {/* name sort */}
                
            </div>
        </div>
    )
}