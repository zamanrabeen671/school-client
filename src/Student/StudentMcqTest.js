/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMcqQuestion } from '../api/McqQuestion';
import { DataContext } from '../Context/GlobalState';
const usersData = [
  {
    name: 'react-interview',
    id: 142,
    examDate: '2022-05-10',
    status: 'ok',
  },
  {
    name: 'Javascript-interview',
    id: 142,
    examDate: '2022-05-10',
    status: 'ok',
  },
  {
    name: 'node js interview',
    id: 142,
    examDate: '2022-05-10',
    status: 'invalid',
  },
  {
    name: 'database-interview',
    id: 142,
    examDate: '2022-05-10',
    status: 'ok',
  },
]

export default function StudentMcqTest() {
  const Navigate = useNavigate();
  const [state] = useContext(DataContext)
  const [questions, setQuestions] = useState([]);
  const token = sessionStorage.getItem('token')
const fetchingQuestionAPI = async() =>{
  const response = await getAllMcqQuestion(token);
  if(response.status === 'success') {
    setQuestions(response.mcq)
  }
}
  useEffect(() => {
    fetchingQuestionAPI();
  },[])
  const handleNavigate = (item) => {

    Navigate(`/student/exam/${item._id}`, {state: {quizarr: item.question, studentId: state.auth.id}})
  }
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Exam Date</th>
            <th scope="col">Status</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.examName}</td>
                <td>{item.expirationDate}</td>
                <td>{item.status}</td>
                <td>
                  <button className='btn btn-info text-white text-uppercase' onClick={() => handleNavigate(item)}>Attend</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
