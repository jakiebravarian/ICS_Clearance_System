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

    return (
        <div className="row admin-menu">
            {/* option 1 */}
            <div className="manage-application-button">
                <form action="/manage-applications">
                    <button type="submit" className={manageApps}>Manage Student Account Applications</button>
                </form>
            </div>

            {/* option 2 */}
            <div  className="manage-approver-button">
                <form action="/manage-approvers">
                    <button type="submit" className={manageApprovers}>Manage Approver Accounts</button>
                </form>
            </div>
        </div>
    )
}


function ApproverSort(prop) {
    let search = prop.search;
    let setApprover = prop.setApprover;

    const changeSortOption = (e) => {
        if(e.target.value === "desc")
        {
            fetch(`http://localhost:3001/sort-approver-by-name-desc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
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
            fetch(`http://localhost:3001/sort-approver-by-name-asc`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },body: JSON.stringify({
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
    console.log(studentsList);
    
    async function rejected(student) {
        console.log(student);
        try {
          const response = await fetch("http://localhost:3001/reject-student", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ student}),
          });
    
          if (response.ok) {
            console.log("Succesfully resubmitted application!");
            props.setBoolRes(!props.boolRes);
          } else {
            console.error("Failed to resubmit application");
          }
        } catch (error) {
          console.error(error);
        }
      }
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
                            <AssignAdviserModal student = {student} boolRes = {props.boolRes} setBoolRes = {props.setBoolRes}/>
                            <button className="reject-button" onClick={() => rejected(student)}>Reject</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function ApproversList(props) {
    let approversList = props.data;
    let setApprover = props.setApprover;
    console.log("app list")
    console.log(approversList)
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
            props.setChangedApprov(!props.changedApprov); 
          })
    }

    return (
        <div className="column student-apps-list">
            {/* header */}
            <div className="row list-header">
                <div className="row col-labels-approver">
                    <p className="first-col-label">Approver Name</p>
                    {/* <p className="second-label-approver">Approver Type</p> */}
                </div>
            </div>
            {
                approversList.map((approver, index) => (
                    <div className="row apps-list"  key= {index}>
                        <p className="first-col">{approver.lastName.toUpperCase()}, {approver.firstName} {approver.middleName}</p>
                        {/* buttons */}
                        <div className="row admin-buttons">
                            <button className="approver-type"><b>Type: </b> {approver.title}</button>
                            <EditApproverModal data={approversList[index]} setApprover={setApprover} list={approversList}/>
                            <button className="reject-button" onClick={() => deleteApprover(approver.upMail)}>Delete</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

function AssignAdviserModal(prop) {
    let student = prop.student;
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [formData, setFormData] = useState("")


    useEffect(() => {
        // Fetch data from the backend API endpoint
        fetch('http://localhost:3001/get-approver', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
            .then((body) => {
                setOptions(body) 
            })
        .catch(error => {
            console.error('Error fetching dropdown values:', error);
        });
    }, []);
    
    // opens the modal when called
    const openModal = () => {
        setIsOpen(true);
    }

    // closes the modal when called
    const closeModal = () => {
        setIsOpen(false);
    }


    //get id of selected
    const handleChange = (e) => {
        const selectedOption = e.target.value;      
        setFormData(selectedOption);
      };

    const handleSubmit = (event) => {
        event.preventDefault();

        // send data to backend

        // reset the form data
        setFormData("");

        // close the modal
        setIsOpen(false);
    };

    // resizing of the modal
    const modalStyle = {
        content: {
            width: '40%', // Set your desired width
            height: '30%', // Set your desired height
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "20px"
        },
    };

    function handleAsssign(){
     
        fetch('http://localhost:3001/assign-adviser', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    adviserId: formData,
                    studentNumber: student.studentNumber

                })
        }) .then(response => response.json())
            .then((body) => {
            console.log(body);
            prop.setBoolRes(!prop.boolRes);
        }) 
    }

    return(
        <div className="modal-window">
            <button className="approve-button" onClick={openModal}>Approve</button>
            <Modal style={modalStyle} isOpen={isOpen} onRequestClose={closeModal}>
                <button className="exit-button" onClick={closeModal}>X</button>
                <div className="modal-heading">
                    <p>Assign Adviser to {student.studentNumber}</p>
                </div>
                <div className="centered modal-form-div">
                    <form onSubmit={handleSubmit} className="modal-form">
                        <select className="d" onChange={handleChange}>
                        <option value="" disabled selected>Select Adviser</option>
                        {options.map(option => (
                            <option key={option._id} value={option._id}>
                            {option.lastName.toUpperCase()}, {option.firstName} {option.middleName}
                            </option>
                        ))}
                        </select>
                        <button className="assign-button" type="submit" onClick={handleAsssign}>Assign</button>
                    </form>
                     
                </div>
            </Modal>
        </div>
    )
}

function CreateApproverModal(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        upMail: '',
        password: '',
        title: 'Adviser'
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
            upMail: '',
            password: '',
            title: ''
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

    function createApprover () {
        fetch('http://localhost:3001/create-approver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName,
                upMail: formData.upMail,
                password:formData.password,
                userType: "Approver",
                title: formData.title
            })
        }).then(response => response.json())
            .then((body) => {
            props.setChangedApprov(!props.changedApprov); 
            console.log(body);
    }) 
    }
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
                        <input type="text" name="upMail" value={formData.upMail || ''} onChange={handleChange} placeholder="Email"/><br></br>
                        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} placeholder="Password"/><br></br>
                         {/* should be a dropdown */}
                         <label className="approver-type-label">Approver Type:  </label>
                        <select className="approver-type-dropdown" id="approver-type" name="approverType">
                            <option  name="title" value="Adviser" onChange={handleChange}>Adviser</option>
                            <option name="title" value="Clearance Officer" onChange={handleChange}>Clearance Officer</option>
                        </select>
                        <button className="assign-button" type="submit" onClick={createApprover}>Create Account</button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}


//TODO auto refresh 
function EditApproverModal(props) {
    let approver = props.data;
    let approversList = props.list;
    let setApprover = props.setApprover;

    console.log("approvers list edit")
    console.log(approversList)

    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState([]); 

    useEffect(()=>{
        setFormData(approver);
    },[props.data])
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

    const deleteObject = (upMail) => {
        const updatedData = approversList.filter((obj) => obj.upMail !== upMail);
        setApprover(updatedData);
      };

    function handleSumbitEdit ()  {

        deleteObject(approver.upMail);

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
            setApprover((prevData) => [...prevData, body]);
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

    return (
        <div className="modal-window">
            <button className="approve-button" onClick={openModal}>Edit</button>
            <Modal style={modalStyle} isOpen={isOpen} onRequestClose={closeModal}>
                <button className="exit-button" onClick={closeModal}>X</button>
                <div className="modal-heading">
                    <p>Edit Approver Account</p>
                </div>
                <div className="centered modal-form-div">
                    <form className="modal-form" onSubmit={handleSubmit}>
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