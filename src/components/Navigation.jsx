import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Navigation extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">OAuth Application</Link>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link className="nav-link" to="/upload">Upload</Link>*/}
                            {/*</li>*/}
                            {/*<li className="nav-item">*/}
                            {/*    <Link className="nav-link" to="/view">View</Link>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About us</Link>
                            </li>
                        </ul>
                        <span className="navbar-text fw-bold">
                            by Team &lt;/BackSlash&gt;
                        </span>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
