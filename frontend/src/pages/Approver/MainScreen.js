import React from "react";
import Select from 'react-select'
import '../../assets/styles/Home.css'
import '../../assets/styles/ApproverMainScreen.css'
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Header, Footer } from '../ScreenComponents';
import { approverInfo } from '../../data.js';
import { Table } from './Table.js';

export default function MainScreen() {
    // use states
    const [searchOption, setSearchOption] = useState('Student Number');
    const [adviserValue, setAdviserValue] = useState('');
    const [monthValue, setMonthValue] = useState('');
    const [dayValue, setDayValue] = useState('');
    const [yearValue, setYearValue] = useState('');
    const [stepValue, setStepValue] = useState('');
    const [statusValue, setStatusValue] = useState('');
    const [searchBar, setSearchBar] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [nameValue, setNameValue] = useState('');

    const upMail1 = localStorage.getItem("upMail");
    const [currentPendingApplications, setCurrentPendingApplications] = useState([]);
   
    // Fetch all pending applications
    useEffect(() => {
        console.log(upMail1);
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
              setCurrentPendingApplications([...currentPendingApplications, ...data]);
              console.log(currentPendingApplications);
            })
            .catch(error => {
              // Handle errors if needed
              console.error(error);
            });
        };
      
        fetchPendingApplications();
      }, []);
      

    //   fetchPendingApplications();

    // values for dropdown menu
    let step = [
        { label: "1 - Pre Adviser", value: "1" },
        { label: "2 - Adviser", value: "2" },
        { label: "3 - Clearance Officer", value: "3" },
    ];

    let status = [
        { label: "Open", value: "Open" },
        { label: "Pending", value: "Pending" },
        { label: "Closed", value: "Closed" },
        { label: "Cleared", value: "Cleared" },
    ];

    let date = [
        { label: "Date: Ascending", value: "Ascending" },
        { label: "Date: Descending", value: "Descending" },
    ]

    let name = [
        { label: "Name: Ascending", value: "Ascending" },
        { label: "Name: Descending", value: "Descending" },
    ]

    // styling for Dropdown menu
    const colourStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white', fontSize: 14, borderColor: 'black' }),
        option: (styles) => {
            return {
                ...styles,
                fontSize: 14,
                color: 'black',
            };
        },
    };

    //functions that handle changes on each input
    const handleSearch = (e) => {
        setSearchOption(e.target.value);
    }

    const handleMonth = (e) => {
        setMonthValue(e.target.value);
    }

    const handleDay = (e) => {
        setDayValue(e.target.value);
    }

    const handleYear = (e) => {
        setYearValue(e.target.value);
    }

    const handleAdviser = (e) => {
        setAdviserValue(e.target.value);
    }

    const handleStep = (e) => {
        setStepValue(e.step.value);
    }

    const handleStatus = (e) => {
        setStatusValue(e.status.value);
    }

    const handleSearchBar = (e) => {
        setSearchBar(e.target.value)
    }

    const handleDate = (e) => {
        setDateValue(e.date.value);
    }

    const handleName = (e) => {
        setNameValue(e.name.value);
    }

    // for form validation
    const { reset, formState: { errors }, control, handleSubmit } = useForm({ mode: 'onChange' });

    const { reset: reset2, formState: { errors: errors2 }, control: control2, handleSubmit: handleSubmit2 } = useForm({ mode: 'onChange' });

    const { reset: reset3, formState: { errors: errors3 }, control: control3, handleSubmit: handleSubmit3 } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        try {
            handleStep(data);
            handleStatus(data);
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    };

    const onSearch = (data) => {
        try {
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    const onSort = (data) => {
        try {
            handleDate(data);
            handleName(data);
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="wrapper">
            <Header data={approverInfo} />

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
                                <Controller
                                    render={({ field }) =>
                                        <input type="number" id="month" placeholder="MM" {...field} />}
                                    name="month"
                                    control={control}
                                    rules={{
                                        onChange: handleMonth,
                                        min: {
                                            value: 1,
                                            message: "Month (1-12)"
                                        },
                                        max: {
                                            value: 12,
                                            message: "Month (1-12)"
                                        }
                                    }}
                                    defaultValue=""
                                />
                                {errors.month && <p id="error-message">{errors.month.message}</p>}

                                <Controller
                                    render={({ field }) =>
                                        <input type="number" id="day" placeholder="DD" {...field} />}
                                    name="day"
                                    control={control}
                                    rules={{
                                        onChange: handleDay,
                                        min: {
                                            value: 1,
                                            message: "Day (1-31)"
                                        },
                                        max: {
                                            value: 31,
                                            message: "Day (1-31)"
                                        }
                                    }}
                                    defaultValue=""
                                />
                                {errors.day && <p id="error-message">{errors.day.message}</p>}

                                <Controller
                                    render={({ field }) =>
                                        <input type="number" id="year" placeholder="YYYY" {...field} />}
                                    name="year"
                                    control={control}
                                    rules={{
                                        onChange: handleYear,
                                        min: {
                                            value: 1995,
                                            message: "Year (1995-2023)"
                                        },
                                        max: {
                                            value: 2023,
                                            message: "Year (1995-2023)"
                                        }
                                    }}
                                    defaultValue=""
                                />
                                {errors.year && <p id="error-message">{errors.year.message}</p>}
                            </div>

                            <div className="filters">
                                <Controller
                                    render={({ field }) =>
                                        <input type="text" id="adviser-name" placeholder="Adviser Name" {...field} />}
                                    name="adviser-name"
                                    control={control}
                                    rules={{
                                        onChange: handleAdviser
                                    }}
                                    defaultValue=""
                                />
                                {errors.adviserName && <p id="error-message">{errors.adviserName.message}</p>}
                            </div>

                            <div className="filters">
                                {<Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (

                                        <Select
                                            className="filter-dropdown"
                                            options={status}
                                            {...field}
                                            placeholder="Status"
                                            styles={colourStyles}
                                        />

                                    )}
                                />}
                            </div>

                            <div className="filters">
                                {<Controller
                                    name="step"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            className="filter-dropdown"
                                            options={step}
                                            {...field}
                                            placeholder="Step"
                                            styles={colourStyles}
                                        />
                                    )}
                                />}
                            </div>
                            <button className="filter-button" id="reset-btn" onClick={reset} >Reset Filters</button>
                            <button className="filter-button" type="submit">Apply Filters</button>
                        </form>
                    </div>

                </div>

                <div id="approver-main">
                    {/* Search Bar & Sort By */}
                    <div id="approver-search-sort">
                        <form className="search-bar" key={2} onSubmit={handleSubmit2(onSearch)}>
                            <Controller
                                render={({ field }) =>
                                    <input type="text" id="search" placeholder="Search" {...field} />}
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


                        <form className="search-bar" key={3} onSubmit={handleSubmit3(onSort)}>

                            <p id="sidebar-title"> Sort by: </p>

                            {<Controller
                                name="date"
                                control={control3}
                                defaultValue=""
                                render={({ field }) => (
                                    <div style={{ width: '170px', padding: 8 }}>
                                        <Select
                                            className="filter-dropdown"
                                            options={date}
                                            {...field}
                                            placeholder="Date"
                                            styles={colourStyles}
                                        />
                                    </div>
                                )}
                            />}

                            {<Controller
                                name="name"
                                control={control3}
                                defaultValue=""
                                render={({ field }) => (
                                    <div style={{ width: '170px' }}>
                                        <Select
                                            className="filter-dropdown"
                                            options={name}
                                            {...field}
                                            placeholder="Name"
                                            styles={colourStyles}
                                        />
                                    </div>
                                )}
                            />}

                            <button className="sort-button" id="reset-btn" onClick={reset3} >Reset</button>
                            <button className="sort-button" type="submit">Apply</button>
                        </form>

                    </div>

                    {/* Table of Students */}
                    <div id="approver-list">
                        <Table />
                    </div>
                </div>
            </div>

            <Footer id="approver-footer" />
        </div >
    )
}