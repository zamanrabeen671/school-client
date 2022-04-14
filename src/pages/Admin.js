import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardContent from '../admin/CardContent'
import Userstable from '../admin/Userstable'
import { DataContext } from '../Context/GlobalState'

export default function Admin() {
    const [state, dispatch] = useContext(DataContext);
    const Navigate = useNavigate();
    const handleLogOut = () => {
        sessionStorage.removeItem('token')
        dispatch({ type: 'AUTH', payload: {} })
        Navigate('/')
    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light mb-3">
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <Link to="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-table"></i> <span className="ms-1 d-none d-sm-inline">Users</span></Link>
                                </li>


                                <li>
                                    <Link to="#" className="nav-link px-0 align-middle">
                                        <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Content</span> </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col py-3 mt-2">
                        <div className='d-flex justify-content-between py-2'>
                            <h2>Hi, Welcome Back, <span className='text-uppercase text-danger'>{state.auth.username}</span></h2>
                            <button className='btn btn-lg btn-danger' onClick={handleLogOut}>LogOut</button>
                        </div>
                        <CardContent />
                        <Userstable />
                    </div>
                </div>
            </div>
        </div>
    )
}
