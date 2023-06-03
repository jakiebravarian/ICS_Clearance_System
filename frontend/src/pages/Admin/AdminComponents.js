import React, {useState} from "react";
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

function StudentSort() {
    return(
        <div className="row student-sort">
            <div>
                <p><b>Sort by: </b></p>
            </div>
            <form className="sort-form">
                <input class="sort-radio" name="sort" type="radio" id="studno-sort-input"></input>
                <label class="radio-label" for="studno-sort-input">Student number</label>
                <input class="sort-radio" name="sort" type="radio" id="studname-sort-input"></input>
                <label class="radio-label" for="studname-sort-input">Student name</label>
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
                studentsList.map((student) => (
                    <div className="row apps-list">
                        <p className="first-col">{student.studentNumber}</p>
                        <p>{student.studentName}</p>
                        
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
            <button class="approve-button" onClick={openModal}>Approve</button>
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
            <button class="create-approver-button" onClick={openModal}>Create Approver Account</button>
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
                        <input type="password" name="email" value={formData.password || ''} onChange={handleChange} placeholder="Password"/><br></br>
                        <input type="text" name="email" value={formData.approverType || ''} onChange={handleChange} placeholder="Approver Type"/><br></br>
                        <button className="assign-button" type="submit">Create Account</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export { Menu, StudentSort, StudentAppsList, AssignAdviserModal, CreateApproverModal }