import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { attendExam } from '../api/Exam';

export default function MCQForm() {
    const { state } = useLocation();
    const { id } = useParams();
    const Navigate = useNavigate()
    const token = sessionStorage.getItem('token')
    // const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState('')
    const [quizAnswer, setQuizAnswer] = useState([])
    const handleNavigate = () => {
        Navigate('/student')
    }
    const handleHange = (e) => {
        const newObj = {
            quizId: e.target.name,
            answer: e.target.value
        }
        setQuizAnswer([...quizAnswer, newObj])
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            studentId: state.studentId,
            mcqExamId: id,
            studentAnswer: quizAnswer
        }
        const response = await attendExam(token, config);
        console.log(response)
        if (response.status === 'success') {
            // console.log(response.message)
            setMessage(response.message);
        }
    }
    return (
        <div className='container mt-5'>
            {
                message.length > 0 ? <div className='d-flex justify-content-center align-items-center flex-column text-success'>
                    <h4>Thank you for pariticipend</h4>
                    <p>Exam is finish successfully</p>
                    <button className='btn btn-success' onClick={handleNavigate}>Go Home</button>
                </div> :
                    <div>
                        <div>
                            <h5 className='text-center text-info'>You Have 5 Question for answer</h5>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                {
                                    state?.quizarr.map((item, index) => {
                                        return (
                                            <div key={index} className="d-flex justify-content-center">
                                                <div className='col-md-6 border border-primay p-2 bg-secondary text-white m-2 rounded'>
                                                    <h5 className='text-uppercase'>{item.quizname}</h5>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <div className='d-flex'>
                                                                <p>A:</p>
                                                                <div className="form-check ms-2">
                                                                    <input className="form-check-input" type="radio" name={item._id} id="exampleRadios1" onChange={handleHange} value={item.quiz[0]} />
                                                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                                                        {item.quiz[0]}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='col-6'>
                                                            <div className='d-flex'>
                                                                <p>B: </p>
                                                                <div className="form-check ms-2">
                                                                    <input className="form-check-input" type="radio" name={item._id} id="exampleRadios2" onChange={handleHange} value={item.quiz[1]} />
                                                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                                                        {item.quiz[1]}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='col-6'>
                                                            <div className='d-flex'>
                                                                <p>C: </p>
                                                                <div className="form-check ms-2">
                                                                    <input className="form-check-input" type="radio" name={item._id} id="exampleRadios3" onChange={handleHange} value={item.quiz[2]} />
                                                                    <label className="form-check-label" htmlFor="exampleRadios3">
                                                                        {item.quiz[2]}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='col-6'>
                                                            <div className='d-flex'>
                                                                <p>D: </p>
                                                                <div className="form-check ms-2">
                                                                    <input className="form-check-input" type="radio" name={item._id} id="exampleRadios4" onChange={handleHange} value={item.quiz[3]} />
                                                                    <label className="form-check-label" htmlFor="exampleRadios4">
                                                                        {item.quiz[3]}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <button type='submit' className='btn btn-success px-3 py-2'>Submit</button>
                            </div>
                        </form>
                    </div>
            }

        </div>
    )
}
