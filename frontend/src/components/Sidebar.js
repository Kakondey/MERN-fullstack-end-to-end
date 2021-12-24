import React from "react";
import { Link } from "react-router-dom";
import jwt from "jwt-decode"

const Sidebar = () => {

    let role = ""
    try {
        const token = jwt(sessionStorage.getItem('token'))
        role = token.role
    } catch (err) {
        console.log(err)
    }
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar w-auto">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <div className="nav-link active fs-2 text-success border border-success rounded mt-2">
                            {role}
                        </div>
                    </li>

                    {sessionStorage.getItem('token') && role === 'admin' &&
                        (<>
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
                        </>)
                    }
                    {!sessionStorage.getItem('token') &&
                        (
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar
