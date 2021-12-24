import "./styles/eventform-style.css"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import moment from "moment"
import { useContext, useState } from "react";
import { categoriesContext, locationsContext } from "../../contexts/otherContext";
import axiosInstance from "../../apis/authorizedApis";
import { EventsContext } from "../../contexts/EventsContext";
import generalApi from "../../apis/generalApi";

const EventForm = () => {
    const animatedComponents = makeAnimated();
    const { categories } = useContext(categoriesContext);
    const { locations } = useContext(locationsContext);
    const { setEvents } = useContext(EventsContext)


    const modifiedCategoryOptions = categories.map(
        (category, index) => {
            return {
                label: category.name,
                value: category._id
            }
        }
    )

    const modifiedLocationsOptions = locations.map(
        (location, index) => {
            return {
                label: location.name,
                value: location._id
            }
        }
    )

    const eventForm = {
        title: "",
        description: "",
        date: ""
    }

    const [eventDetails, setEventDetails] = useState(eventForm)
    const [selectedLocation, setSelectedLocation] = useState()
    const [selectedCategories, setselectedCategories] = useState([])

    const handleChange = (e) => {
        setEventDetails({
            ...eventDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateEvent = e => {
        e.preventDefault()

        const finalCategories = selectedCategories.map(
            (category, index) => { return category.value }
        )
        console.log(finalCategories)
        axiosInstance.post('events/create', {
            title: eventDetails.title,
            description: eventDetails.description,
            categories: finalCategories,
            location: selectedLocation.value,
            date: eventDetails.date
        }).then(res => {

            // updating the events list globally here
            (async () => {
                try {
                    const eventsRes = await generalApi.get("/events")
                    setEvents(eventsRes.data)
                } catch (err) {
                    console.log(err)
                }
            })()

            setEventDetails(eventForm)
            setSelectedLocation("")
            setselectedCategories([])
        })
    }

    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 ">
                    <h4>Add new EVENT:</h4>
                    <div className="card">

                        <div className="col-xs-12 col-sm-12">
                            <form className='form-vertical'>
                                <div className="form-group mb-4">
                                    <div className="col-xs-3 text-right">
                                        <label htmlFor="cpTitle">Title</label>
                                    </div>
                                    <div className="col-xs-9">
                                        <input type="text" name="title" value={eventDetails.title} onChange={e => handleChange(e)} className="form-control" placeholder="Title of the event" id="cpTitle" />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="col-xs-3 text-right">
                                        <label htmlFor="cpDesc">Description</label>
                                    </div>
                                    <div className="col-xs-9">
                                        <textarea className="form-control" name="description" value={eventDetails.description} onChange={e => handleChange(e)} rows="3" placeholder="Description of the event" id="cpDesc"></textarea>
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="col-xs-3 text-right">
                                        <label htmlFor="cpAddr">Categories</label>
                                    </div>
                                    <div className="col-xs-9">
                                        <Select
                                            closeMenuOnSelect={true}
                                            components={animatedComponents}
                                            isMulti
                                            options={modifiedCategoryOptions}
                                            name="selectedCategories"
                                            value={selectedCategories}
                                            onChange={e => setselectedCategories(e)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-4">
                                    <div className="row">
                                        <div className="col">
                                            <div className="col-xs-3 text-right">
                                                <label htmlFor="cpAddr">Location</label>
                                            </div>
                                            <div className="col-xs-6">
                                                <Select
                                                    closeMenuOnSelect
                                                    components={animatedComponents}
                                                    options={modifiedLocationsOptions}
                                                    name="selectedLocation"
                                                    value={selectedLocation}
                                                    onChange={e => setSelectedLocation(e)}
                                                    defaultValue={selectedLocation}
                                                />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="col-xs-3 text-right">
                                                <label htmlFor="cpAddr">Date</label>
                                            </div>
                                            <div className="col-xs-9">
                                                <input type="date" name="date" value={eventDetails.date} onChange={e => handleChange(e)} className="form-control margin-bottom" placeholder="Name of Facility" id="cpAddr" />
                                            </div>
                                        </div>
                                    </div>


                                </div>

                            </form>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={e => handleCreateEvent(e)}>Submit</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventForm
