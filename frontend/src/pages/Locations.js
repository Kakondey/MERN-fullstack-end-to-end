import { useContext, useEffect, useState } from "react";
import jwt from "jwt-decode"
import axiosInstance from "../apis/authorizedApis";
import { locationsContext } from "../contexts/otherContext";


const Locations = () => {

    let role = ""
    try {
        const token = jwt(sessionStorage.getItem('token'))
        role = token.role
    } catch (err) {
        console.log(err)
    }

    // const [locations, setLocations] = useState([])
    const [newLocation, setNewLocation] = useState()
    const { locations, setLocations } = useContext(locationsContext)


    const handleAddLocation = (e) => {
        e.preventDefault()

        axiosInstance.post('locations/create', {
            name: newLocation
        }).then(res => {
            (async () => {
                try {
                    const locationsRes = await axiosInstance.get('locations/')
                    setLocations(locationsRes.data)

                } catch (err) {
                    console.log(err)
                }
            })()

            setNewLocation("")
        }).catch(err => {
            console.log(err)
        })
    }

    const handleDeleteLocation = (e, location_id) => {
        e.preventDefault()

        axiosInstance.delete(`locations/delete/${location_id}`).then(res => {
            (async () => {
                try {
                    const locationsRes = await axiosInstance.get('locations/')
                    setLocations(locationsRes.data)

                } catch (err) {
                    console.log(err)
                }
            })()
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        <>
            <div className="container-fluid px-1 mx-auto">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-9 col-11 ">
                        <h4>Add new Location:</h4>
                        <div className="card">
                            <div className="form-group mb-4">
                                <div className="col-xs-3 text-right">
                                    <label for="cpTitle">Title</label>
                                </div>
                                <div className="col-xs-9">
                                    <input type="text" name="location" value={newLocation} onChange={e => setNewLocation(e.target.value)} className="form-control" placeholder="Add new location here" id="cpTitle" />
                                </div>
                            </div>
                            <button type="submit" onClick={e => handleAddLocation(e)} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Locations</h3>
            <p>
                {sessionStorage.getItem('token') && role === 'admin' &&
                    (
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Names</th>
                                    {/* <th scope="col">Attached events</th> */}
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {locations.map((location, index) => {
                                    return <tr key={location._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{location.name}</td>
                                        {/* <td>Otto</td> */}
                                        <td><button className="btn btn-danger btn-sm" onClick={e => handleDeleteLocation(e, location._id)}>Delete</button></td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    )
                }
            </p>
        </>
    )
}

export default Locations
