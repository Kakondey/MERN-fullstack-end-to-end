import  React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Toppesnotes</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap">
                        <Link className="nav-link" to="/login">Sign out</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}