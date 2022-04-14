/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getCourseByTecher } from '../api/Courses';
import { DataContext } from '../Context/GlobalState';

export default function Courses() {
    const [courseData, setCourseData] = useState([]);
    const token = sessionStorage.getItem('token')
    const [state] = useContext(DataContext)
    const getData = async () => {
        const reply = await getCourseByTecher(token, state.auth?.id)
        if (reply.status === 'success') {
            setCourseData(reply.teacherCourse)
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div>
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
            </div>
        </div>
    )
}
