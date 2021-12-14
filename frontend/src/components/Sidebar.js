import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Sidebar extends Component {
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">
                                Events
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/locations">
                                Locations
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}