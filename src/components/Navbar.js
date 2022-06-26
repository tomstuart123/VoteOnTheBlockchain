import React, { Component } from 'react';
import './App.css';

class Navbar extends Component {
  
  render() {
    return (
    <nav className="navigation">
        <a
          className="navLink"
          target="_blank"
          rel="noopener noreferrer" 
          style={{color: "white"}}
        >
          Voting App
        </a>
    </nav>
    );
  }
}

export default Navbar;
