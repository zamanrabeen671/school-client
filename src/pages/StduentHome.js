import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/GlobalState';
import Courses from '../Student/Courses';
import StudentMcqTest from '../Student/StudentMcqTest';
export default function StduentHome() {
    const [state, dispatch] = useContext(DataContext);
    const Navigate = useNavigate()
    const handleLogOut = () => {
        sessionStorage.removeItem('token')
        dispatch({type: 'AUTH', payload: {}})
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
                    <h4>Letest Courses</h4>
                    <Courses />
                </div>
                <div>
                    <h4>Current MCQ Test</h4>
                    <StudentMcqTest />
                </div>
            </div>
        </div>
    )
}
