import React from "react";
import logo from '../assets/ICS.png';
import '../assets/styles/Home.css'

class Home extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <nav className="menu">
                    <ul>
                        <a href="/"><li>Home</li></a>
                        <a href="/signup"><li>Sign Up</li></a>
                        <a href="/login"><li>Log in</li></a>
                    </ul>
                </nav>
                <div className="container">
                  <img src={logo} alt=""/>
                  <div className="box">
                      <h2>Institute of Computer Science</h2>
                      <h3>CLEARANCE APPROVAL SYSTEM</h3>
                  </div>
                </div>
            </div>
        )
    }
}

export default Home