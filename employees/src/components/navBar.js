import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../navBar.css";

function navBar(){
    return (
            <Nav className=" navbar navbar-default, Navig" style={{background: 'white', color: '#699ee7'}}>
                <div className="container-fluid">
                    <h2>Employee Management System</h2>
                    <div className="navbar-header">
                        <Link to="/Welcome" className="btn" style={{margin:3}}>Home</Link>
                        <Link to="/employees" className="btn" >Employees</Link>
                    </div>
                </div>
            </Nav>
        
        
    )
}

export {navBar};