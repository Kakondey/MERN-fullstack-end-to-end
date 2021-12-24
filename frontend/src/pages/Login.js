import { Component, useState } from "react";
import '../css/login.css';
import { useNavigate } from "react-router-dom";

import React from 'react'
import generalApi from "../apis/generalApi";
import axiosInstance from "../apis/authorizedApis";

const Login = () => {
    let navigate = useNavigate();
    const formData = {
        email: "",
        password: ""
    }

    const [loginDetails, setLoginDetails] = useState(formData)

    const handleChange = (e) => {
        setLoginDetails({
            ...loginDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault()

        if (loginDetails.email && loginDetails.password) {
            axiosInstance.post('users/login', {
                email: loginDetails.email,
                password: loginDetails.password
            })
                .then(res => {
                    sessionStorage.setItem("token", res.data.token)
                    if (res.data.role === 'admin') {
                        navigate("/")
                    } else {
                        navigate("/dashboard")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }



    }
    return (
        <div className="App">
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group mb-2">
                            <label>Email address</label>
                            <input type="email" name="email" value={loginDetails.email} onChange={e => handleChange(e)} className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group mb-2">
                            <label>Password</label>
                            <input type="password" name="password" value={loginDetails.password} onChange={e => handleChange(e)} className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={(e) => handleLogin(e)}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login