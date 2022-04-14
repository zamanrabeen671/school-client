/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getParticipendMCQ } from '../api/Exam';
import { DataContext } from '../Context/GlobalState';
// const usersData = [
//     {
//         name: 'react-interview',
//         id: 142,
//         examDate: '2022-05-10',
//         status: 'ok',
//     },
//     {
//         name: 'Javascript-interview',
//         id: 142,
//         examDate: '2022-05-10',
//         status: 'ok',
//     },
//     {
//         name: 'node js interview',
//         id: 142,
//         examDate: '2022-05-10',
//         status: 'invalid',
//     },
//     {
//         name: 'database-interview',
//         id: 142,
//         examDate: '2022-05-10',
//         status: 'ok',
//     },
// ]

export default function ParticipendMCQ() {
    const [exams, setExams] = useState([]);
    const [state] = useContext(DataContext)
    const token = sessionStorage.getItem('token');
    const fetchParticipendExam = async () => {
        const response = await getParticipendMCQ(token, state.auth.id)
        if (response.status === 'success') {
            setExams(response.response)
        }
    }
    useEffect(() => {
        fetchParticipendExam()
    }, [])
    return (
        <div className='container mt-3'>
            <div className='text-center text-info'>
                <h3>You are participend in {exams.length} Exams</h3>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Exam Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {exams.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.mcqExamId.examName}</td>
                                <td>{item.mcqExamId.expirationDate}</td>
                                <td>{item.mcqExamId.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
