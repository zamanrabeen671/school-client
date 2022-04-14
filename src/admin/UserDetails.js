/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getCourseByTecher } from '../api/Courses';
import { getEnrollCours } from '../api/Enrollment';
import { getParticipendMCQ } from '../api/Exam';
import { getMCQBYTeacher } from '../api/McqQuestion';

export default function UserDetails() {
    const { state } = useLocation();
    const token = sessionStorage.getItem('token');
    const [roles, setRoles] = useState('')
    const [courses, setCourses] = useState([])
    const [exams, setExams] = useState([])
    const fetchAPIData = async () => {
        if (state.role === 'student') {
            const newCourses = await getEnrollCours(token, state._id)
            const newExam = await getParticipendMCQ(token, state._id)
            if (newCourses.status === 'success') setCourses(newCourses.response)
            if (newExam.status === 'success') setExams(newExam.response)
            setRoles(state.role)
        }
        if (state.role === 'teacher') {
            const newCourse = await getCourseByTecher(token, state._id);
            const newExam = await getMCQBYTeacher(token, state._id)
            if (newCourse.status === 'success') setCourses(newCourse.teacherCourse)
            if (newExam.status === 'success') setExams(newExam.mcq)
            setRoles(state.role)
        }
    }
    useEffect(() => {
        fetchAPIData()
    }, [])
    return (
        <div className='container'>
            <div className='d-flex justify-content-center'>
                <div className="card text-center text-dark bg-light">
                    <div className="card-header">
                        This is a {state.role}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{state.username}</h5>
                        <p className="card-text">{state.email}</p>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center mt-5'>
            <div className='me-2'>
                <div className="card text-dark bg-warning mb-3" style={{width: '19rem'}}>
                    <div className="card-header">Courses</div>
                    <div className="card-body">
                        <h5 className="card-title text-center "> <span className='rounded-circle p-2 bg-success text-white fw-bold fs-4'>{courses.length}</span></h5>
                        <p className="card-text text-center">{roles === 'student' ? 'Enroll' : 'Create'} Courses</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="card text-dark bg-success text-white mb-3" style={{width: '19rem'}}>
                    <div className="card-header">Exam</div>
                    <div className="card-body">
                        <h5 className="card-title text-center"><span className='rounded-circle p-2 bg-warning text-secondary fw-bold fs-4'>{exams.length}</span></h5>
                        <p className="card-text text-center">{roles === 'student' ? 'Participant' : 'Create'} Exams</p>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}
