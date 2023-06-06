import React from "react";
import { useState, useEffect } from "react";
import { studentApps } from "../../data";

// import components from student components
import { Header, Footer } from "../ScreenComponents";
import { adminInfo } from "../../data";
import { Menu, StudentAppsList, AssignAdviserModal } from "./AdminComponents";

export default function ManageApplications() {
    const [sortBy, setSortBy] = useState("");
    const [result, setResult] = useState([]);
    const [boolRes, setBoolRes] = useState(false);

    
    // Fetch data from API on component mount
    useEffect(() => {
        fetchData();
    }, [boolRes]);

    //Display default
    const fetchData = async () => {
        try {
            fetch('http://localhost:3001/get-student', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  .then(response => response.json())
                .then((body) => {
                    setResult(body) 
                })
        } catch (error) {
        console.error('Error fetching data:', error);
        }
  };
    
    const changeSortOption = (e) => {
        setSortBy(e.target.value);

        if(e.target.value === "number")
        {
            fetch('http://localhost:3001/sort-student-by-sn', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            })
            .then(response => response.json())
            .then((body) => {
                console.log(body)
                setResult(body)
            })

        }
        else
        {
            fetch('http://localhost:3001/sort-student-by-name', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  .then(response => response.json())
                .then((body) => {
                    console.log(body)
                    setResult(body) 
                })
        }
    };

    return (
        <div>
            <Header data={adminInfo} />

            {/* Menu */}
            <div className="admin-menu">
                <Menu option="ManageStudentApps" />
            </div>

            <div className="row student-sort-section">
                {/* text */}
                <div>
                    <p className="roboto-slab section-name-text">Pending Student Account Application Requests</p>
                </div>
                {/* name sort */}
                {/* <StudentSort/> */}
                <div className="row student-sort">
                    <div>
                        <p><b>Sort by: </b></p>
                    </div>
                    <form className="sort-form">
                        {/* added value to each radio button */}
                        <input className="sort-radio" name="sort" type="radio" id="studno-sort-input"  value="number" onChange={changeSortOption}></input>
                        <label className="radio-label" >Student number</label>
                        <input className="sort-radio" name="sort" type="radio" id="studname-sort-input" value="name" onChange={changeSortOption}></input>
                        <label className="radio-label" >Student name</label>
                    </form>
                </div>
            </div>

            {/* list of students */}
            <StudentAppsList data={result} setBoolRes = {setBoolRes} boolRes = {boolRes}/>
        </div>
    )
}