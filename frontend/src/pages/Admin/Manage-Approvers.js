import React from "react";

// import components from student components
import { Header } from "../ScreenComponents";
import { adminInfo} from "../../data";
import { useState, useEffect } from "react";
import { Menu, CreateApproverModal, ApproverSort, ApproversList } from "./AdminComponents";

export default function ManageApprovers() {
    
    const [approver, setApprover] = useState([]);
    const [search, setSearch] = useState("")

     // Fetch data from API on component mount
     useEffect(() => {
        fetchData();
    }, []);

    //Display default
    const fetchData = async () => {
        try {
            await fetch('http://localhost:3001/get-approver', 
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })  .then(response => response.json())
                .then((body) => {
                    setApprover(body) 
                })
        } catch (error) {
        console.error('Error fetching data:', error);
        }
  };
    
    const handleSearch = (e) => {
        setSearch(e.target.value);

        fetch('http://localhost:3001/search-approver-by-name', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({
                    search: e.target.value
                })
            })
            .then(response => response.json())
            .then((body) => {
                setApprover(body)
            })
    }
 
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

    return (
        <div>
            {/* to change */}
            <Header data={adminInfo} />

            {/* Menu */}
            <div className="admin-menu">
                <Menu option="ManageApprovers" />
            </div>

            {/* heading */}
            <div className="row student-sort-section">
                {/* text */}
                <div>
                    <p className="roboto-slab section-name-text">Approver Accounts</p>
                </div>

                {/* add approver button */}
                <div className="create-approver-div">
                    <CreateApproverModal />
                </div>
            </div>

            {/* search section */}
            <div className="row">
                {/* search bar */}
                <div className="search-bar">
                    <input className="search-input" type="text" placeholder="Search.." name="search" onChange={handleSearch}/>
                    {/* removed className="search-icon"  */}
                    <button className="search-button" type="submit"><i className="fa fa-search"></i></button>
                </div>

                {/* sort options */}
                {/* <ApproverSort setApprover= {setApprover} search = {search}/> */}
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

            </div>

            {/* list of approvers */}
            <ApproversList data={approver} setApprover={setApprover}/>
        </div>
    )
}