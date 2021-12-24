import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
    let navigate = useNavigate();

    const handleSignOut = e => {
        e.preventDefault()
        sessionStorage.removeItem("token")
        navigate("/")
    }
    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Toppersnotes</a>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    {sessionStorage.getItem("token") ? <div className="nav-link btn" onClick={e => handleSignOut(e)}>Sign out</div> : <Link className="nav-link btn" to="/login">Sign in</Link>}

                </li>
            </ul>
        </nav>
    )
}

export default Header
