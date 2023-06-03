import React from "react";

// import components from student components
import { Header } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu, CreateApproverModal } from "./AdminComponents";

export default function ManageApprovers() {
    return (
        <div>
            <Header data={adminInfo} />

            {/* Menu */}
            <div className="admin-menu">
                <Menu option="ManageApprovers" />
            </div>

            {/* heading */}
            <div className="row student-sort-section">
                {/* text */}
                <div>
                    <p className="roboto-slab section-name-text">Approver Accounts</p>
                </div>

                {/* add approver button */}
                <div className="create-approver-div">
                    <CreateApproverModal/>
                </div>
                
            </div>
        </div>
    )
}