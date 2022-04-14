import React, { useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { DataContext } from '../Context/GlobalState'
import Courses from '../Teacher/Courses'
import MCQTest from '../Teacher/MCQTest'
export default function TeacherHome() {
    const [state, dispatch] = useContext(DataContext);
    const Navigate = useNavigate()
    const handleLogOut = () => {
        sessionStorage.removeItem('token')
        dispatch({ type: 'AUTH', payload: {} })
        Navigate('/')
    }
    return (
        <div>
            <div className='container'>
                <div className='d-flex justify-content-between py-2'>
                    <h2 className='text-uppercase'>Hi, Welcome Back,{state.auth?.username}</h2>
                    <button className='btn btn-lg btn-danger' onClick={handleLogOut}>LogOut</button>
                </div>
                <div>
                    <Link to="/teacher/course" className='btn btn-primary py-2'>Add More Course</Link>
                    <h4>Letest Courses</h4>
                    <Courses />
                </div>
                <div className='border-top border-secondary py-2'>
                    <Link to="/teacher/mcq" className='btn btn-primary py-2'>Create a MCQ Question</Link>
                    <h4 className='my-3'>Current MCQ Test</h4>
                    <MCQTest />
                </div>
            </div>
            <Outlet />
        </div>
    )
}
