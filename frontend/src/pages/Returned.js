import React from "react";

// import components from student components
import { Header, StudentInfo, ProfileHeader, Application, Footer, Form } from "./StudentComponents";
import { userInfo, remarks } from "../data";

export default function Returned() {
    return(
        <div>
            {/* header */}
            <Header data={userInfo}/>

            {/* remarks */}
            <div>
                <p className="form-prompt">Returned application; please see remarks:</p>
            </div>

            <div className="remarks">
                Remarks: {remarks.remarks}
            </div>

            {/* form */}
            <Form/>

            {/* footer */}
            <Footer/>
        </div>
    )
}