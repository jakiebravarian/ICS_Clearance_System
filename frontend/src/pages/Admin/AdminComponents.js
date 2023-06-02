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

export { Menu }