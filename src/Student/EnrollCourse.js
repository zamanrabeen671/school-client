/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getAllCourses } from '../api/Courses';
import { DataContext } from '../Context/GlobalState';

export default function EnrollCourse() {
    const [courseData, setCourseData] = useState([]);
    const [state] = useContext(DataContext);
    const [loader, setLoader] = useState(true);
    const token = sessionStorage.getItem('token');
    const getData = async () => {
        const reply = await getAllCourses(token)
        if (reply.status === 'success') {
            setLoader(false);
            const newArr = reply.course.filter(idx => idx.studentRef.some(newIdx => newIdx === state.auth?.id))
            setCourseData(newArr)
        }
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container'>
            {
                loader ?

                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div className='row mt-3'>
                        <h3 className='text-center my-3 text-success'>You are enrolled on this course</h3>
                        {
                            courseData.map((item, index) => {
                                return (
                                    <div className='col-md-4' key={index}>
                                        {
                                            // item.studentRef.find(idx => idx === state.auth?.id) &&
                                            <div className={`card ${index % 2 === 0 ? 'text-white bg-primary' : 'text-white bg-success'} mb-3`} >
                                                <div className="card-header">{item.coursetitle}</div>
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.coursetitle}</h5>
                                                    <p className="card-text">{item.description}</p>
                                                    <p className="card-text ">End Date: {item.expirationDate}</p>
                                                </div>
                                            </div>
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
            }

        </div>
    )
}
