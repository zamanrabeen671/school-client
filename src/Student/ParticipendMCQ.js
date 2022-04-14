/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getParticipendMCQ } from '../api/Exam';
import { DataContext } from '../Context/GlobalState';

export default function ParticipendMCQ() {
    const [exams, setExams] = useState([]);
    const [loader, setLoader] = useState(true);
    const [state] = useContext(DataContext)
    const token = sessionStorage.getItem('token');
    const fetchParticipendExam = async () => {
        const response = await getParticipendMCQ(token, state.auth.id)
        if (response.status === 'success') {
            setLoader(false)
            setExams(response.response)
        }
    }
    useEffect(() => {
        fetchParticipendExam()
    }, [])
    return (
        <div className='container mt-3'>
            {
                loader ?
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    :
                    <div>
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
            }

        </div>
    )
}
