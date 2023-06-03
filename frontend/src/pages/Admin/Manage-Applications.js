import React from "react";

// import components from student components
import { Header, Footer } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu, StudentSort, StudentAppsList } from "./AdminComponents";

export default function ManageApplications() {
    return (
        <div>
            <Header data={adminInfo} />

            {/* Menu */}
            <div className="admin-menu">
                <Menu option="ManageStudentApps" />
            </div>

            <div className="row student-sort-section">
                {/* text */}
                <div>
                    <p className="roboto-slab section-name-text">Pending Student Account Application Requests</p>
                </div>
                {/* name sort */}
                <StudentSort/>
            </div>

            {/* list of students */}
            <StudentAppsList/>
        </div>
    )
}