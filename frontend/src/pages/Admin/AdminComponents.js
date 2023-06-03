import React from "react";

// renders a menu with 2 options
function Menu(props) {
    let currentOption = props.option;
    var manageApps = "blue-background";
    var manageApprovers = "blue-background";

    // if the current page manages students's apps, change the first buttons background to white
    if (currentOption === "ManageStudentApps") {
        manageApps = "white-background";
    }
    else {
        manageApprovers = "white-background";
    }

    return(
        <div className="row admin-menu">
            {/* option 1 */}
            <div>
                <form action="/manage-applications">
                    <button type="submit" className={manageApps}>Manage Student Account Applications</button>
                </form>
            </div>

            {/* option 2 */}
            <div>
                <form action="/manage-approvers">
                    <button type="submit" className={manageApprovers}>Manage Approver Accounts</button>
                </form>
            </div>
        </div>
    )
}

function StudentSort() {
    return(
        <div className="row student-sort">
            <div>
                <p><b>Sort by: </b></p>
            </div>
            <form className="sort-form">
                <input class="sort-radio" name="sort" type="radio" id="studno-sort-input"></input>
                <label class="radio-label" for="studno-sort-input">Student number</label>
                <input class="sort-radio" name="sort" type="radio" id="studnum-sort-input"></input>
                <label class="radio-label" for="studnum-sort-input">Student number</label>
            </form>
        </div>
    )
}

function StudentAppsList() {
    return (
        <div className="column student-apps-list">
            {/* header */}
            <div className="row list-header">
                <div className="row col-labels">
                    <p className="first-col-label">Student number</p>
                    <p>Student name</p>
                </div>
            </div>
        </div>
    )
}

export { Menu, StudentSort, StudentAppsList }