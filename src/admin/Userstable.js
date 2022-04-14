/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { deleteUser, getAllUsers } from '../api/Authentication';

export default function Userstable() {
    const [users, setUsers] = useState([])
    const token = sessionStorage.getItem('token');
    const Navigate = useNavigate();

    const handleNavigate = (item) => {
        Navigate(`/admin/user/${item._id}`, {state: item})
    }
    const fetchUser = async()=> {
        const response = await getAllUsers(token);
        if(response.status === 'success') {
            setUsers(response.users)
        }
    }
    useEffect(() => {
        fetchUser()
    },[])
    const handleBanUser= async(id) => {
        const response = await deleteUser(token, id);
        const newArr = users.filter(idx => idx._id !== id);
        if(response.status === 'success') setUsers(newArr)
        
        console.log(response)
    }
    return (
        <div className='mt-3'>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Role</th>
                        <th scope='col'>Action</th>
                        <th scope="col">More</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.role}</td>
                                <td><AiOutlineDelete className='text-danger fs-2 cursor-pointer' style={{cursor: 'pointer'}} onClick={() => handleBanUser(item._id)}/></td>
                                <td> <button className='btn btn-primary' onClick={() => handleNavigate(item)}>View</button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
