import { useContext, useEffect, useState } from "react";
import jwt from 'jwt-decode'

import React from 'react'
import axiosInstance from "../apis/authorizedApis";
import { categoriesContext } from "../contexts/otherContext";

const Categories = () => {
    let role = ""
    try {
        const token = jwt(sessionStorage.getItem('token'))
        role = token.role
    } catch (err) {
        console.log(err)
    }

    // const [categories, setCategories] = useState([])
    const [newCategory, setNewCategory] = useState()
    const { categories, setCategories } = useContext(categoriesContext)


    const handleAddCategory = e => {
        e.preventDefault()

        axiosInstance.post('categories/create', {
            name: newCategory
        }).then(res => {
            (async () => {
                try {
                    const locationsRes = await axiosInstance.get('categories/')
                    setCategories(locationsRes.data)

                } catch (err) {
                    console.log(err)
                }
            })()

            setNewCategory("")
        }).catch(err => {
            console.log(err)
        })
    }

    const handleDeleteCategory = (e, category_id) => {
        e.preventDefault()

        axiosInstance.delete(`categories/delete/${category_id}`).then(res => {
            (async () => {
                try {
                    const locationsRes = await axiosInstance.get('categories/')
                    setCategories(locationsRes.data)

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
                        <h4>Add new Category:</h4>
                        <div className="card">
                            <div className="form-group mb-4">
                                <div className="col-xs-3 text-right">
                                    <label for="cpTitle">Title</label>
                                </div>
                                <div className="col-xs-9">
                                    <input type="text" name="category" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="form-control" placeholder="Add new Category here" id="cpTitle" />
                                </div>
                            </div>
                            <button type="submit" onClick={e => handleAddCategory(e)} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Categories</h3>
            <p>
                {sessionStorage.getItem('token') && role === 'admin' &&
                    (
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Names</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => {
                                    return <tr key={category._id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{category.name}</td>
                                        <td><button onClick={e => handleDeleteCategory(e, category._id)} className="btn btn-danger btn-sm">Delete</button></td>
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

export default Categories
