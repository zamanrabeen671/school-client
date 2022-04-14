/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getAllCourses } from '../api/Courses';
import { enrollMent } from '../api/Enrollment';
import { DataContext } from '../Context/GlobalState';

export default function Courses() {
  const [courseData, setCourseData] = useState([]);
  const [state] = useContext(DataContext);
  const [loader, setLoader] = useState(true);
  const token = sessionStorage.getItem('token');
  const getData = async () => {
    const reply = await getAllCourses(token)
    if (reply.status === 'success') {
      setLoader(false)
      setCourseData(reply.course)
    }
  }
  useEffect(() => {
    getData();
  }, [])

  const handleOnEnroll = async (id) => {
    const config = {
      studentId: state.auth?.id,
      courseId: id
    }
    const response = await enrollMent(token, config);
    console.log(response)
  }
  return (
    <div>
      {loader ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        :
        <div className='row'>
          {
            courseData.map((item, index) => {
              return (
                <div className='col-md-4' key={index}>
                  <div className={`card ${index % 2 === 0 ? 'text-white bg-primary' : 'text-white bg-success'} mb-3`} >
                    <div className="card-header">{item.coursetitle}</div>
                    <div className="card-body">
                      <h5 className="card-title">{item.coursetitle}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text ">End Date: {item.expirationDate}</p>
                    </div>
                    <div className='d-flex justify-content-center py-2'>
                      {item.studentRef.find(idx => idx === state.auth?.id) ?
                        <button className='btn btn-secondary'>Already Enrolled</button>
                        :
                        <button className='btn btn-danger' onClick={() => handleOnEnroll(item._id)}>Enrol</button>
                      }

                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      }

    </div>
  )
}
