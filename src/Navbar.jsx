import React from 'react';
import '../src/styles/navbar.css'

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-logo">
                    {/* <img src="logo.png" alt="Logo" /> */}
                    <h1>Todo</h1>
                </div>
                <ul className="navbar-links">
                    {/* <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#contact">Contact</a></li> */}
                </ul>
            </nav>
        );
    }
}

export default Navbar;
