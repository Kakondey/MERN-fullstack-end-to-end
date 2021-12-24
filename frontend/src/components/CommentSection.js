import React, { useEffect, useState } from 'react'
import axiosInstance from '../apis/authorizedApis'
import moment from "moment";
import jwt from "jwt-decode";
import generalApi from '../apis/generalApi';

const CommentSection = ({ event_id }) => {
    let currentUser = {}
    try {
        currentUser = jwt(sessionStorage.getItem('token'))
    } catch (err) {
        console.log()
    }

    const [comments, setComments] = useState([])
    const [currentComment, setCurrentComment] = useState()
    useEffect(() => {
        try {
            (async () => {
                const commentList = await generalApi.get(`/events/comments/${event_id}`)
                setComments(commentList.data)
            })()
        } catch (err) {
            console.log(err)
        }


    }, [event_id])

    const handleAddComment = (e) => {
        e.preventDefault()

        axiosInstance.post('/events/comments/create', {
            title: currentComment,
            user: currentUser.id,
            event: event_id
        }).then(res => {

            // adding new comments to UI
            try {
                (async () => {
                    const latestCommentList = await generalApi.get(`/events/comments/${event_id}`)

                    setComments(latestCommentList.data)
                })()

            } catch (err) {
                console.log(err)
            }

            setCurrentComment("")
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="headings d-flex justify-content-between align-items-center mb-3">
                        <h5>Comment Section</h5>
                    </div>
                    <div className='overflow-scroll' style={{ height: "15rem" }}>
                        {comments.map((comment, index) => {
                            return <div key={index} className="card p-3" style={{ margin: "10px auto" }}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="user d-flex flex-row align-items-center"><span><small className="font-weight-bold text-primary">{comment?.user?.name}</small> <small className="font-weight-bold">{comment.title}</small></span> </div> <small>{moment().diff(moment(comment.createdAt), 'days')} days ago</small>
                                </div>
                            </div>
                        })}
                    </div>
                    {sessionStorage.getItem('token') && (
                        <div className="card p-3 mt-1">
                            <div className="align-items-center">
                                <div className="user  flex-row align-items-center">
                                    <div className="col mb-2">
                                        <textarea type="text" name="comment" value={currentComment} onChange={e => setCurrentComment(e.target.value)} className="form-control margin-bottom" placeholder="Comment here" id="cpAddr" />
                                    </div>
                                    <div className="col">
                                        <button type="submit" className="btn btn-primary" onClick={e => handleAddComment(e)}>Submit</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default CommentSection
