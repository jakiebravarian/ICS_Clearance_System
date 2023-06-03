import React from "react";

// import components from student components
import { Header } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu, CreateApproverModal, ApproverSort } from "./AdminComponents";

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

            {/* search section */}
            <div className="row">
                {/* search bar */}
                <div className="search-bar">
                    <input class="search-input" type="text" placeholder="Search.." name="search"/>
                    <button class="search-button" type="submit"><i class="search-icon" className="fa fa-search"></i></button>
                </div>

                {/* sort options */}
                <ApproverSort/>
            </div>
        </div>
    )
}