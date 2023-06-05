import React, {useState, useEffect} from "react";
import Modal from 'react-modal';

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


function ApproverSort(prop) {
    const search = prop.search;
    const setApprover = prop.setApprover;

    const changeSortOption = (e) => {
        if(e.target.value === "desc")
        {
            fetch('http://localhost:3001/sort-approver-by-name-desc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    search: search
                })
            })
            .then(response => response.json())
            .then((body) => {
                console.log("desc")
                console.log(body)
                setApprover(body)
            })
            
        }
        else
        {
            fetch('http://localhost:3001/sort-approver-by-name-asc', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                    body: JSON.stringify({
                        search: search
                    })
            })  .then(response => response.json())
                .then((body) => {
                    console.log("asc")
                    console.log(body)
                    setApprover(body) 
                })
        }
    };

    return(
        <div className="row approver-sort">
            <div>
                <p><b>Sort by: </b></p>
            </div>
            <form className="sort-form">
                <input className="sort-radio" name="sort" type="radio" id="name-asc" value="asc" onChange={changeSortOption}></input>
                <label className="radio-label">Name (Ascending)</label>
                <input className="sort-radio" name="sort" type="radio" id="name-desc" value="desc" onChange={changeSortOption} ></input>
                <label className="radio-label">Name (Descending)</label>
            </form>
        </div>
    )
}

function StudentAppsList(props) {

    var studentsList = props.data;
  
    return (
        <div className="column student-apps-list">
            {/* header */}
            <div className="row list-header">
                <div className="row col-labels">
                    <p className="first-col-label">Student number</p>
                    <p>Student name</p>
                </div>
            </div>
            {
                studentsList.map((student, index) => (
                    <div className="row apps-list" key = {index}>
                        <p className="first-col">{student.studentNumber}</p>
                        <p>{student.lastName.toUpperCase()}, {student.firstName} {student.middleName}</p>
                        
                        {/* buttons */}
                        <div className="row admin-buttons">
                            <AssignAdviserModal/>
                            <button className="reject-button">Reject</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function ApproversList(props) {
    var approversList = props.data;

    function deleteApprover(email) {
        fetch('http://localhost:3001/delete-approver', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    upMail: email
                })
        }) .then(response => response.json())
            .then((body) => {
            console.log(body);
          })
    }

    return (
        <div className="column student-apps-list">
            {/* header */}
            <div className="row list-header">
                <div className="row col-labels">
                    <p className="first-col-label">Approver Name</p>
                </div>
            </div>
            {
                approversList.map((approver, index) => (
                    <div className="row apps-list"  key= {index}>
                        <p className="first-col">{approver.lastName.toUpperCase()}, {approver.firstName} {approver.middleName}</p>
                        
                        {/* buttons */}
                        <div className="row admin-buttons">
                            <EditApproverModal data={approver}/>
                            <button className="reject-button" onClick={() => deleteApprover(approver.upMail)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function AssignAdviserModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        studno: ''
    }); // initially empty strings

    // opens the modal when called
    const openModal = () => {
        setIsOpen(true);
    }

    // closes the modal when called
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // send data to backend

        // reset the form data
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            studno: ''
        });

        // close the modal
        setIsOpen(false);
    };

    // resizing of the modal
    const modalStyle = {
        content: {
            width: '40%', // Set your desired width
            height: '50%', // Set your desired height
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "20px"
        },
    };

    return(
        <div className="modal-window">
            <button className="approve-button" onClick={openModal}>Approve</button>
            <Modal style={modalStyle} isOpen={isOpen} onRequestClose={closeModal}>
                <button className="exit-button" onClick={closeModal}>X</button>
                <div className="modal-heading">
                    <p>Assign Adviser</p>
                </div>
                <div className="centered modal-form-div">
                    <form onSubmit={handleSubmit} className="modal-form">
                        <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="Adviser's First Name"/><br></br>
                        <input type="text" name="middleName" value={formData.middleName || ''} onChange={handleChange} placeholder="Adviser's Middle Name"/><br></br>
                        <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Adviser's Last Name"/><br></br>
                        <input type="text" name="studno" value={formData.studno || ''} onChange={handleChange} placeholder="Student number"/><br></br>
                        <button className="assign-button" type="submit">Assign</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

function CreateApproverModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        password: '',
        approverType: ''
    }); // initially empty strings

    // opens the modal when called
    const openModal = () => {
        setIsOpen(true);
    }

    // closes the modal when called
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // send data to backend

        // reset the form data
        setFormData({
            firstName: '',
            middleName: '',
            lastName: '',
            email: '',
            password: '',
            approverType: ''
        });

        // close the modal
        setIsOpen(false);
    };

    // resizing of the modal
    const modalStyle = {
        content: {
            width: '40%', // Set your desired width
            height: '70%', // Set your desired height
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "20px"
        },
    };

    return(
        <div className="modal-window">
            <button className="create-approver-button" onClick={openModal}>Create Approver Account</button>
            <Modal style={modalStyle} isOpen={isOpen} onRequestClose={closeModal}>
                <button className="exit-button" onClick={closeModal}>X</button>
                <div className="modal-heading">
                    <p>Create Approver Account</p>
                </div>
                <div className="centered modal-form-div">
                    <form onSubmit={handleSubmit} className="modal-form">
                        <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name"/><br></br>
                        <input type="text" name="middleName" value={formData.middleName || ''} onChange={handleChange} placeholder="Middle Name"/><br></br>
                        <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name"/><br></br>
                        <input type="text" name="email" value={formData.email || ''} onChange={handleChange} placeholder="Email"/><br></br>
                        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} placeholder="Password"/><br></br>
                         {/* should be a dropdown */}
                         <label for="approver-type" className="approver-type-label">Approver Type:  </label>
                        <select className="approver-type-dropdown" id="approver-type" name="approverType">
                            <option  name="approverType" value="Adviser" onChange={handleChange}>Adviser</option>
                            <option name="approverType" value="Clearance Officer" onChange={handleChange}>Clearance Officer</option>
                        </select>
                        <button className="assign-button" type="submit">Create Account</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}


//TODO auto refresh 
function EditApproverModal(props) {
    let approver = props.data;

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: approver.firstName,
        middleName: approver.middleName,
        lastName: approver.lastName,
        upMail: approver.upMail,
        password: approver.password,
        title: approver.title
    }); 
    
    // opens the modal when called
    const openModal = () => {
        setIsOpen(true);
    }

    // closes the modal when called
    const closeModal = () => {
        setIsOpen(false);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // send data to backend

        // reset the form data
        setFormData({
            firstName: approver.firstName,
            middleName: approver.middleName,
            lastName: approver.lastName,
            upMail: approver.upMail,
            password: approver.password,
            title: approver.title
        });

        // close the modal
        setIsOpen(false);
    };

    function handleSumbitEdit ()  {
        fetch('http://localhost:3001/edit-approver', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    middleName: formData.middleName,
                    upMail: approver.upMail,
                    newUpMail: formData.upMail,
                    password: formData.password,
                    title: formData.approverType
                })
        }) .then(response => response.json())
        .then((body) => {
            console.log(body);
          })
 }
    // resizing of the modal
    const modalStyle = {
        content: {
            width: '40%', // Set your desired width
            height: '70%', // Set your desired height
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "20px"
        },
    };

    return(
        <div className="modal-window">
            <button className="approve-button" onClick={openModal}>Edit</button>
            <Modal style={modalStyle} isOpen={isOpen} onRequestClose={closeModal}>
                <button className="exit-button" onClick={closeModal}>X</button>
                <div className="modal-heading">
                    <p>Edit Approver Account</p>
                </div>
                <div className="centered modal-form-div">
                    <form onSubmit={handleSubmit} className="modal-form">
                        <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} placeholder="First Name"/><br></br>
                        <input type="text" name="middleName" value={formData.middleName || ''} onChange={handleChange} placeholder="Middle Name"/><br></br>
                        <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} placeholder="Last Name"/><br></br>
                        <input type="text" name="upMail" value={formData.upMail || ''} onChange={handleChange} placeholder="UP Mmail"/><br></br>
                        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} placeholder="Password"/><br></br>
                         {/* should be a dropdown */}
                         {/* to fix css */}
                        <label for="approver-type" className="approver-type-label">Approver Type:  </label>
                        <select className="approver-type-dropdown" id="approver-type" name="approverType">
                            <option  name="approverType" value="Adviser" onChange={handleChange}>Adviser</option>
                            <option name="approverType" value="Clearance Officer" onChange={handleChange}>Clearance Officer</option>
                        </select>
                        <button className="assign-button" type="submit" onClick={handleSumbitEdit}>Confirm</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export { Menu, StudentAppsList, AssignAdviserModal, CreateApproverModal, ApproverSort, ApproversList }