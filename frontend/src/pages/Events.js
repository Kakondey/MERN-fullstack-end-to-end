import { useContext } from "react";
import jwt from "jwt-decode"

import React from 'react'
import { Link } from "react-router-dom";
import { EventsContext } from "../contexts/EventsContext";
import axiosInstance from "../apis/authorizedApis";
import generalApi from "../apis/generalApi";

const Events = () => {
    let role = ""
    try {
        const token = jwt(sessionStorage.getItem('token'))
        role = token.role
    } catch (err) {
        console.log(err)
    }

    const { events, setEvents } = useContext(EventsContext)


    const handleDeleteEvent = (e, event_id) => {
        e.preventDefault()

        axiosInstance.delete(`events/delete/${event_id}`).then(res => {
            (async () => {
                try {
                    const eventsRes = await generalApi.get('events/')
                    setEvents(eventsRes.data)

                } catch (err) {
                    console.log(err)
                }
            })()
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            {sessionStorage.getItem('token') && role === 'admin' && <Link to="/dashboard" className="btn btn-primary mb-4">Add new Event</Link>}
            <h3>Events</h3>

            {sessionStorage.getItem('token') && role === 'admin' ?
                (
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Names</th>
                                <th scope="col">Details</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => {
                                return <tr key={event._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{event.title}</td>
                                    <td><Link to={`/event-details/${event._id}`} className="btn btn-success btn-sm">Check</Link></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={e => handleDeleteEvent(e, event._id)}>Delete</button></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                )
                :
                (
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Names</th>
                                <th scope="col">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => {
                                return <tr key={event._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{event.title}</td>
                                    <td><Link to={`/event-details/${event._id}`} className="btn btn-success btn-sm">Check</Link></td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                )
            }



        </div>
    )
}

export default Events
