import React, { Component } from "react";
import EventForm from "../components/forms/EventForm";
import Layout from "../components/Layout";
import jwt from "jwt-decode"
import { Link } from "react-router-dom";


const Home = () => {
    let role = ""
    try {
        const token = jwt(sessionStorage.getItem('token'))
        role = token
    } catch (err) {
        console.log(err)
    }

    return (
        <Layout>
            {sessionStorage.getItem('token') && role.role === 'admin' ? (
                <EventForm />
            )
                :
                (
                    <div className="container-fluid px-1 mx-auto">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-7 col-lg-8 col-md-9 col-11 ">
                                <div className="card">
                                    <form className='form-vertical mb-3'>
                                        <div className="row">
                                            <div className="col">
                                                <div className="col-xs-3 text-right">
                                                    <label htmlFor="cpAddr">Name</label>
                                                </div>
                                                <div className="col-xs-6">
                                                    <p className="margin-bottom" placeholder="Name of Facility" id="cpAddr">{role.name}</p>
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="col-xs-3 text-right">
                                                    <label htmlFor="cpAddr">Email</label>
                                                </div>
                                                <div className="col-xs-9">
                                                    <p className="margin-bottom" placeholder="Name of Facility" id="cpAddr">{role.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <Link to="/" type="submit" className="btn btn-primary">View Events</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        </Layout>
    )
}

export default Home
