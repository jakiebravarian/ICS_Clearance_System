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

    // for form validation
    const { register, reset, formState: { errors }, control, handleSubmit } = useForm({ mode: 'onChange' });

    const onSubmit = (data) => {
        try {
            console.log(JSON.stringify(data));
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="wrapper">
            <Header data={approverInfo} />

            <div id="approver-content">
                {/* Sidebar */}
                <div id="approver-sidebar">

                    {/* Search By */}
                    <div id="search-by">
                        <p id="sidebar-title">Search by:</p>
                        <div id="option">
                            <input type="radio" value="Student Number" onChange={handleSearch} name="search" id="stud-num" checked={searchOption === "Student Number"} />
                            <label for="stud-num" id="search-option">Student Number</label>
                        </div>
                        <div id="option">
                            <input type="radio" value="Student Name" onChange={handleSearch} name="search" id="stud-name" />
                            <label for="stud-name" id="search-option">Student Name</label>
                        </div>
                        <hr />
                    </div>

                    {/* Filter By */}
                    <div id="filter-by">
                        <p id="sidebar-title">Filter by:</p>
                        <div id="date-filter">
                            <div id="date">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        type="number"
                                        id="month"
                                        placeholder="MM"
                                        {...register("month", {
                                            onChange: handleMonth,
                                            min: {
                                                value: 1,
                                                message: "Month (1-12)"
                                            },
                                            max: {
                                                value: 12,
                                                message: "Month (1-12)"
                                            }
                                        })}
                                    />
                                    {errors.month && <p id="error-message">{errors.month.message}</p>}

                                    <input
                                        type="number"
                                        id="day"
                                        placeholder="DD"
                                        {...register("day", {
                                            onChange: handleDay,
                                            min: {
                                                value: 1,
                                                message: "Day (1-31)"
                                            },
                                            max: {
                                                value: 31,
                                                message: "Day (1-31)"
                                            }
                                        })}
                                    />
                                    {errors.day && <p id="error-message">{errors.day.message}</p>}

                                    <input
                                        type="number"
                                        id="year"
                                        placeholder="YYYY"
                                        {...register("year", {
                                            onChange: handleYear,
                                            min: {
                                                value: 1995,
                                                message: "Year (1995-2023)"
                                            },
                                            max: {
                                                value: 2023,
                                                message: "Year (1995-2023)"
                                            }
                                        })}
                                    />
                                    {errors.year && <p id="error-message">{errors.year.message}</p>}
                                    <button type="submit" class="filter-button" >Apply</button>
                                </form>
                            </div>
                        </div>

                        <div id="adviser-filter">
                            <form onSubmit={handleSubmit(onSubmit)}><input
                                type="text"
                                name="adviser-name"
                                id="adviser-name"
                                placeholder="Adviser Name"
                                {...register("adviserName", {
                                    onChange: handleAdviser
                                })}
                            />
                                {errors.adviserName && <p id="error-message">{errors.adviserName.message}</p>}
                                <button type="submit" class="filter-button" >Apply</button>
                            </form>
                        </div>

                        <div id="status-filter">
                            <form onSubmit={handleSubmit(handleStatus)}>
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
                                <button className="filter-button" type="submit">Apply</button>
                            </form>
                        </div>

                        <div id="step-filter">
                            <form onSubmit={handleSubmit(handleStep)}>
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
                                <button className="filter-button" type="submit">Apply</button>
                            </form>
                        </div>

                        {/* <hr /> */}
                        {/* not working properly */}
                        {/* <button className="filter-button" onClick={() => reset()}>Clear Filters</button> */}
                    </div>

                </div>

                <div id="approver-main">
                    {/* Search Bar & Sort By */}
                    <div id="approver-search-sort">

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