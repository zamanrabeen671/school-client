/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getCourseByTecher } from '../api/Courses';
import { DataContext } from '../Context/GlobalState';

export default function Courses() {
    const [courseData, setCourseData] = useState([]);
    const [loader, setLoader] = useState(true);
    const token = sessionStorage.getItem('token')
    const [state] = useContext(DataContext)
    const getData = async () => {
        const reply = await getCourseByTecher(token, state.auth?.id)
        if (reply.status === 'success') {
            setLoader(false)
            setCourseData(reply.teacherCourse)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            {
                loader ?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div>
                        {
                            courseData.length <= 0 ?

                                <div className='text-center text-danger'>
                                    <h3>You Have No Course at the moment. You can create course </h3>
                                </div>
                                :
                                <div className='row'>
                                    {
                                        courseData.map((item, index) => {
                                            return (
                                                <div className='col-md-4' key={index}>
                                                    <div className={`card ${index % 2 === 0 ? 'text-dark bg-warning' : 'text-white bg-dark'} mb-3`} >
                                                        <div className="card-header">{item.coursetitle}</div>
                                                        <div className="card-body">
                                                            <h5 className="card-title text-center">Participant <span className='p-2 bg-success rounded-pill text-white'>{item.studentRef.length}</span></h5>
                                                            <p className="card-text">{item.description}</p>
                                                            <p className="card-text">End Date: {item.expirationDate}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }
                    </div>
            }

        </div>
    )
}
