import React from "react";

// header profile component
function ProfileHeader(props) {
    let name = props.name       // name of logged in user
    let icon = props.icon;      // icon of the logged in user
    let classification = props.classification // classification of the user

    return(
        // renders logged in user's name and icon
        <div className="profile-header row">
            <div className="profile-name">
                {name}
            </div>
            <div className="classification">
                {classification}
            </div>
            <div>
                <img className= "profile-icon-img" src={icon}></img>
            </div>
        </div>
    )
}

// application component: returns a form if there are no applications yet
function Application(props, {eventHandler}) {
    let applications = props.data;
    
    // gets the number of applications
    let appCount = applications.length;

    // if there are no opened applications yet
    if (appCount === 0) { 
        return(
            <div>
                {/* prompt */}
                <div>
                    <p className="form-prompt">No applications yet. To start one, please fill out the form below.</p>
                </div>

                {/*form */}
                <form>
                    <div className="form-section">
                        {/* first row */}
                        <div className="row">
                            <div>
                                <label for="first-name">First name</label><br/>
                                <input id="first-name"/><br></br>
                            </div>
                            <div>
                                <label for="middle-name">Middle name</label><br/>
                                <input id="middle-name"/><br></br>
                            </div>
                            <div>
                                <label for="Last-name">Last name</label><br/>
                                <input id="last-name"/><br></br>
                            </div>
                        </div>

                        {/* second row */}
                        <div className="row">
                            <div>
                                <label for="student-number">Student number</label><br/>
                                <input id="student-number"/><br></br>
                            </div>
                            <div>
                                <label for="degree-program">Degree program</label><br/>
                                <input id="degree-program"/><br></br>
                            </div>
                            <div>
                                <label for="college">College</label><br/>
                                <input id="college"/><br></br>
                            </div>
                        </div>

                        {/* third row */}
                        <div className="row">
                            <div>
                                <label for="github-link">Github link</label><br/>
                                <input id="github-link"/><br></br>
                            </div>
                            <div>
                                <label for="github-link">Date applied</label><br/>
                                <input id="date-applied"/><br></br>
                            </div>
                            <div>
                                <label for="remarks">Remarks</label><br/>
                                <input id="remarks"/><br></br>
                            </div>
                        </div>
                        {/* button */}
                        <div className="centered">
                            <button onClick={() => eventHandler()} type='submit' className='button'>SUBMIT APPLICATION</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <div className="apps-container">
            <div className="row label">
                <p className="date-label">Date applied</p>
                <p className="status-label">Status</p>
            </div>
            {
                applications.map((application) => {
                    console.log(application)
                    return(
                        <div className="row">
                            {/* date applied */}
                            <p className="date-label">{application.dateApplied}</p>
                            {/* status */}
                            <p className="status-value">{application.status}</p>
                            <button className="app-button"> Close application </button>
                        </div>
                    )
                })
            }
        </div>
    )
}

function Footer() {
    return(
        <div className="footer">
            <p>All rights reserved. 2023</p>
        </div>
    )
}

export { ProfileHeader, Application, Footer };