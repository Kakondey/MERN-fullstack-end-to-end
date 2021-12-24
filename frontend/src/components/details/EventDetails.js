import React, { useEffect, useState } from 'react'
import CommentSection from '../CommentSection'
import { useParams } from "react-router-dom"
import moment from "moment";
import generalApi from '../../apis/generalApi';

const EventDetails = () => {
    const { id } = useParams()
    const [eventDetails, setEventDetails] = useState()
    useEffect(() => {
        (async () => {
            const eventDetailsRes = await generalApi.get(`/events/${id}`)
            setEventDetails(eventDetailsRes.data)
        })()
    }, [id])

    return (
        <div className="container-fluid px-1">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 ">
                    <div className="card">
                        <div className="col-xs-12 col-sm-12">
                            <form className='form-vertical'>
                                <div className="form-group mb-4">
                                    <div className="col-xs-3 text-right">
                                        <h2 htmlFor="cpTitle">{eventDetails?.title}</h2>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="col-xs-3 text-right">
                                        <label htmlFor="cpDesc">Description</label>
                                    </div>
                                    <div className="col-xs-9">
                                        <p className="form-control" rows="3" placeholder="Description of the event" id="cpDesc">{eventDetails?.description}</p>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <div className="col-xs-3 text-right">
                                        <label htmlFor="cpAddr">Categories</label>
                                    </div>
                                    <div className='container'>
                                        <div className="row justify-content-around">
                                            {eventDetails?.categories.map((category, index) => {
                                                return <p key={index} className="form-control col-sm" rows="3" placeholder="Description of the event" id="cpDesc">{category.name}</p>
                                            })}

                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="col-xs-3 text-right">
                                                <label htmlFor="cpAddr">location</label>
                                            </div>
                                            <div className="col-xs-6">
                                                <p className="form-control col-sm" rows="3" placeholder="Description of the event" id="cpDesc">{eventDetails?.location?.name}</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="col-xs-3 text-right">
                                                <label htmlFor="cpAddr">Date</label>
                                            </div>
                                            <div className="col-xs-9">
                                                <p className="form-control col-sm" rows="3" placeholder="Description of the event" id="cpDesc">{moment(eventDetails?.date).format("DD/MM/YYYY")}</p>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </form>
                        </div>

                    </div>
                    <CommentSection event_id={eventDetails?._id} />
                </div>
            </div>
        </div>
    )
}

export default EventDetails
