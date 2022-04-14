/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { getMCQBYTeacher } from '../api/McqQuestion';
import { DataContext } from '../Context/GlobalState';

export default function MCQTest() {
  const [mcqExam, setMcqExam] = useState([]);
  const [state] = useContext(DataContext)
  const token = sessionStorage.getItem('token');
  const fetchMcqExam = async () => {
    const response = await getMCQBYTeacher(token, state.auth.id);
    if (response.status === 'success') {
      setMcqExam(response.mcq)
    }
  }
  useEffect(() => {
    fetchMcqExam()
  }, [])
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Exam Date</th>
            <th scope="col">Status</th>
            <th scope="col">Participant</th>
          </tr>
        </thead>
        <tbody>
          {mcqExam.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.examName}</td>
                <td>{item.expirationDate}</td>
                <td>{item.status}</td>
                <td className='p-2 bg-success rounded-pill text-center fw-bold fs-4 text-white'>{item.studentId.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
