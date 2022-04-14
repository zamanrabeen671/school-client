/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/Authentication';
export default function CardContent() {
    const [student, setStudent] = useState([])
    const [teacher, setTeacher] = useState([])
    const token = sessionStorage.getItem('token');
    const fetchUser = async()=> {
        const response = await getAllUsers(token);
        if(response.status === 'success') {
           const newStudent = response.users.filter(idx => idx.role === 'student')
           const newTeacher = response.users.filter(idx => idx.role === 'teacher');
           setStudent(newStudent)
           setTeacher(newTeacher)
        }
    }
    useEffect(() => {
        fetchUser()
    },[])
    return (
        <div className='d-flex justify-content-around mt-3'>
            <div className="card" style={{width: '25rem'}}>
                <div className="card-body">
                    <h5 className="card-title text-center"><span className='rounded-circle p-2 bg-success text-white fw-bold fs-4'>{student.length}</span></h5>
                    <h6 className="card-subtitle my-2 text-center">Students</h6>
                    <p className="card-text text-center">Some of good learners stay </p>
                </div>
            </div>
            <div className="card " style={{width: '25rem'}}>
                <div className="card-body">
                    <h5 className="card-title text-center"><span className='rounded-circle p-2 bg-warning text-secondary fw-bold fs-4'>{teacher.length}</span></h5>
                    <h6 className="card-subtitle my-2 text-center">Teachers</h6>
                    <p className="card-text text-center">Some of Valueable asstes to us</p>
                </div>
            </div>
        </div>
    )
}
