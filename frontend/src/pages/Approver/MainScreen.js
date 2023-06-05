import React from "react";
import Select from 'react-select';
import '../../assets/styles/Home.css';
import '../../assets/styles/ApproverMainScreen.css';
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Header, Footer } from '../ScreenComponents';
import { step, status, date, name, colourStyles } from './ApproverDropdownValues';
import { Table } from './Table.js';
import ApproverIcon from '../../assets/approver.png';

// import data
import { getCurrentStudent } from "../../data";

export default function MainScreen() {
    // use states for input
    const [searchOption, setSearchOption] = useState('Student Number');
    const [adviserValue, setAdviserValue] = useState('');
    const [dateFilterValue, setDateFilterValue] = useState('');
    const [stepValue, setStepValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [searchBar, setSearchBar] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    // use states for userInfo and current pending applications
    const upMail1 = localStorage.getItem("upMail");
    const [userInfo, setUserInfo] = useState({}); // Define userInfo state
    const [currentPendingApplications, setCurrentPendingApplications] = useState([]); // List of applications

    // Fetch all pending applications
    const fetchPendingApplications = () => {
        fetch(`http://localhost:3001/get-all-pending-applications?upMail=${upMail1}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response if needed
                console.log(data);
                // Update the state or perform any other actions
                setCurrentPendingApplications(data);
                console.log(currentPendingApplications);
            })
            .catch(error => {
                // Handle errors if needed
                console.error(error);
            });
        console.log(JSON.stringify(currentPendingApplications));
    };


    useEffect(() => {
        // Fetch user data
        const fetchData = async () => {
            const userData = await getCurrentStudent(upMail1);
            if (userData) {
                setUserInfo({
                    userId: userData._id,
                    name: userData.firstName + " " + userData.middleName + " " + userData.lastName,
                    studno: userData.studentNumber,
                    course: userData.degreeProgram,
                    college: userData.college,
                    classification: userData.userType,
                    icon: ApproverIcon,
                });
            }
        };

        fetchData();

        fetchPendingApplications();

    }, []);

    //functions that handle changes on each input
    const handleSearch = (e) => {
        setSearchOption(e.target.value);
    }

    const handleDateFilter = (e) => {
        setDateFilterValue(e.target.value);
    }

    const handleAdviser = (e) => {
        setAdviserValue(e.target.value);
    }

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value)
    }

    // for form validation
    const { reset, formState: { errors }, control, handleSubmit } = useForm({ mode: 'onChange' });

    const { formState: { errors: errors2 }, control: control2, handleSubmit: handleSubmit2 } = useForm({ mode: 'onChange' });

    const { reset: reset3, control: control3, handleSubmit: handleSubmit3 } = useForm({ mode: 'onChange' });

    // for value of isDisbled or disabled in filter input
    const filterValue = (inputName) => {
        if (dateFilterValue.length > 0) {
            return inputName !== "date";
        } else if (adviserValue.length > 0) {
            return inputName !== "adviser";
        } else if (statusValue.length > 0) {
            return inputName !== "status";
        } else if (stepValue.length > 0) {
            return inputName !== "step";
        }
        return false;
    };

    // for value of isDisbled or disabled in sort input
    const sortValue = (inputName) => {
        if (dateValue.length > 0) {
            return inputName !== "date";
        } else if (nameValue.length > 0) {
            return inputName !== "name";
        }
        return false;
    };

    const onSubmit = (data) => {
        // Extract the filter values from the form data
        const { dateFilter, "adviser-name": adviserName, status, step } = data;

        // Filter the applications based on the selected filters
        let filteredApplications = currentPendingApplications;

        // Apply the date filter if a value is provided
        if (dateFilter) {
            filteredApplications = filteredApplications.filter(
                (application) => application.studentSubmission.dateSubmission === dateFilter
            );
        }

        // Apply the adviser name filter if a value is provided
        if (adviserName) {
            filteredApplications = filteredApplications.filter(
                (application) =>
                    application.student.adviser &&
                    application.student.adviser.fullName
                        .toLowerCase()
                        .includes(adviserName.toLowerCase())
            );
        }

        // Apply the status filter if a value is selected
        if (status) {
            filteredApplications = filteredApplications.filter(
                (application) => application.status === status
            );
        }

        // Apply the step filter if a value is selected
        if (step) {
            filteredApplications = filteredApplications.filter(
                (application) => application.step === step
            );
        }

        // Update the state with the filtered applications
        setCurrentPendingApplications(filteredApplications);

    };


    //  Retrieves the value of a nested attribute from an object.
    const getObjectValue = (object, attribute) => {
        const attributes = attribute.split('.');
        let value = object;

        for (const attr of attributes) {
            if (value && value[attr] !== undefined) {
                value = value[attr];
            } else {
                value = undefined;
                break;
            }
        }
        return value;
    };


    //  Handles the search functionality based on the selected search option and the provided search input.
    const onSearch = (data) => {
        const { search } = data;
        let searchAttribute = '';

        if (searchOption === 'Student Number') {
            searchAttribute = 'student.studentNumber';
        } else if (searchOption === 'Student Name') {
            searchAttribute = 'student';
        }

        let filteredApplications = [];

        if (searchAttribute && Array.isArray(currentPendingApplications)) {
            filteredApplications = currentPendingApplications.filter((application) => {
                if (searchAttribute === 'student') {
                    const { firstName, middleName, lastName } = application.student;
                    const fullName = `${lastName}, ${firstName}, ${middleName}`;
                    return fullName.toLowerCase().includes(search.toLowerCase());
                } else {
                    const attributeValue = getObjectValue(application, searchAttribute);
                    return attributeValue && attributeValue.includes(search);
                }
            });
        }

        setCurrentPendingApplications(filteredApplications);
    };


    // Handles the sorting functionality based on the selected sorting options.
    const onSort = (data) => {
        const { date, name } = data;
        let sortedApplications = [...currentPendingApplications];

        if (date.value === 'Ascending') {
            sortedApplications.sort((a, b) => {
                const dateA = new Date(a.studentSubmission.dateSubmission.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$2/$1/$3'));
                const dateB = new Date(b.studentSubmission.dateSubmission.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$2/$1/$3'));
                return dateA - dateB;
            });
        } else if (date.value === 'Descending') {
            sortedApplications.sort((a, b) => {
                const dateA = new Date(a.studentSubmission.dateSubmission.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$2/$1/$3'));
                const dateB = new Date(b.studentSubmission.dateSubmission.replace(/(\d{1,2})\/(\d{1,2})\/(\d{4})/, '$2/$1/$3'));
                return dateB - dateA;
            });
        } else if (name.value === 'Ascending') {
            sortedApplications.sort((a, b) => {
                return a.student.lastName.localeCompare(b.student.lastName);
            });
        } else if (name.value === 'Descending') {
            sortedApplications.sort((a, b) => {
                return b.student.lastName.localeCompare(a.student.lastName);
            });
        }

        setCurrentPendingApplications(sortedApplications);
    };

    // parameters for table
    const attributeName = ['student.studentNumber', 'student.fullName', 'step', 'status', 'studentSubmission.dateSubmission']

    const columns = ['Student Number', 'Student Name (LN, FN, MN)', 'Step', 'Status', 'Date', 'Application']

    return (
        <div className="wrapper">
            <Header data={userInfo} />

            <div id="approver-content">
                {/* Sidebar */}
                <div id="approver-sidebar">

                    {/* Search By */}
                    <div id="search-by">
                        <p id="sidebar-title">Search by:</p>
                        <div className="option">
                            <input type="radio" value="Student Number" onChange={handleSearch} name="search" id="stud-num" checked={searchOption === "Student Number"} />
                            <label htmlFor="stud-num" id="search-option">Student Number</label>
                        </div>
                        <div className="option">
                            <input type="radio" value="Student Name" onChange={handleSearch} name="search" id="stud-name" />
                            <label htmlFor="stud-name" id="search-option">Student Name</label>
                        </div>
                        <hr />
                    </div>

                    {/* Filter By */}
                    <div id="filter-by">
                        <p id="sidebar-title">Filter by:</p>
                        <form key={1} onSubmit={handleSubmit(onSubmit)}>
                            <div className="filters">
                                {/* Month */}
                                <Controller
                                    render={({ field }) =>
                                        <input type="text" id="dateFilter" placeholder="MM/DD/YYYY" disabled={filterValue("date")} {...field} />}
                                    name="dateFilter"
                                    control={control}
                                    rules={{
                                        onChange: handleDateFilter,
                                    }}
                                    defaultValue=""
                                />
                                {errors.dateFilter && <p id="error-message">{errors.dateFilter.message}</p>}
                            </div>

                            {/* Adviser Name */}
                            <div className="filters">
                                <Controller
                                    render={({ field }) =>
                                        <input type="text" id="adviser-name" placeholder="Adviser Name" disabled={filterValue("adviser")}{...field} />}
                                    name="adviser-name"
                                    control={control}
                                    rules={{
                                        onChange: handleAdviser
                                    }}
                                    defaultValue=""
                                />
                                {errors.adviserName && <p id="error-message">{errors.adviserName.message}</p>}
                            </div>

                            {/* Status */}
                            <div className="filters">
                                {<Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (

                                        <Select
                                            className="filter-dropdown"
                                            options={status}
                                            isDisabled={filterValue("status")}
                                            {...field}
                                            placeholder="Status"
                                            styles={colourStyles}
                                            value={field.value}
                                            onChange={value => (field.onChange(value), setStatusValue(value.value))}
                                        />

                                    )}
                                />}
                            </div>

                            {/* Step */}
                            <div className="filters">
                                {<Controller
                                    name="step"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            className="filter-dropdown"
                                            options={step}
                                            isDisabled={filterValue("step")}
                                            {...field}
                                            placeholder="Step"
                                            styles={colourStyles}
                                            value={field.value}
                                            onChange={value => (field.onChange(value), setStepValue(value.value))}
                                        />
                                    )}
                                />}
                            </div>

                            {/* Reset & Apply Buttons */}
                            <button className="filter-button" id="reset-btn" onClick={() => {
                                reset();
                                setDateFilterValue('');
                                setAdviserValue('');
                                setStatusValue('');
                                setStepValue('');
                                fetchPendingApplications();
                            }} >Reset Filters</button>
                            <button className="filter-button" type="submit">Apply Filters</button>
                        </form>
                    </div>

                </div>

                <div id="approver-main">
                    {/* Search Bar & Sort By */}
                    <div id="approver-search-sort">

                        {/* Search Bar */}
                        <form className="approver-search-bar" id="search-bar" key={2} onSubmit={handleSubmit2(onSearch)}>
                            <Controller
                                render={({ field }) =>
                                    <input type="text" id="search" placeholder="Search (Student Number or LN, FN, MN)" {...field} />}
                                name="search"
                                control={control2}
                                rules={{
                                    onChange: handleSearchBar
                                }}
                                defaultValue=""
                            />
                            {errors2.search && <p id="error-message">{errors2.search.message}</p>}

                            <button id="search-btn" type="submit"><i className="fa fa-search" /></button>
                        </form>

                        {/* Sort By */}
                        <form className="approver-search-bar" key={3} onSubmit={handleSubmit3(onSort)}>
                            <p id="sidebar-title"> Sort by: </p>
                            {/* Date */}
                            {<Controller
                                name="date"
                                control={control3}
                                defaultValue=""
                                render={({ field }) => (
                                    <div style={{ width: '170px', padding: 8 }}>
                                        <Select
                                            className="filter-dropdown"
                                            options={date}
                                            isDisabled={sortValue("date")}
                                            {...field}
                                            placeholder="Date"
                                            styles={colourStyles}
                                            value={field.value}
                                            onChange={value => (field.onChange(value), setDateValue(value.value))}
                                        />
                                    </div>
                                )}
                            />}

                            {/* Name */}
                            {<Controller
                                name="name"
                                control={control3}
                                defaultValue=""
                                render={({ field }) => (
                                    <div style={{ width: '180px' }}>
                                        <Select
                                            className="filter-dropdown"
                                            options={name}
                                            isDisabled={sortValue("name")}
                                            {...field}
                                            placeholder="Name"
                                            styles={colourStyles}
                                            value={field.value}
                                            onChange={value => (field.onChange(value), setNameValue(value.value))}
                                        />
                                    </div>
                                )}
                            />}

                            {/* Reset & Apply */}
                            <button className="sort-button" id="reset-btn" onClick={() => {
                                reset3();
                                setDateValue('');
                                setNameValue('');
                                fetchPendingApplications();
                            }} >Reset</button>
                            <button className="sort-button" type="submit">Apply</button>
                        </form>

                    </div>

                    {/* Table of Students */}
                    <div id="approver-list">
                        <Table data={currentPendingApplications} columns={columns} attributes={attributeName} id={"approver"} purpose={"view"} />
                    </div>
                </div>
            </div>

            <Footer id="approver-footer" />
        </div >
    )
}