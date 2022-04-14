/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { createMCQQuestion } from '../api/McqQuestion';
import { DataContext } from '../Context/GlobalState';
export default function CreateMCQBody({ questionHeader }, counter, setCounter) {
  const { examName, expirationDate } = questionHeader;
  const { register, handleSubmit, reset } = useForm();
  const [state] = useContext(DataContext);

  const [message, setMessage] = useState('')
  const [questionArr, setQuestionArr] = useState([])
  const Navigate = useNavigate()
  const token = sessionStorage.getItem('token')
  const onSubmit = async (data) => {
    const newArr = [data.a, data.b, data.c, data.d]
    const newObj = {
      quizname: data.quizname,
      quiz: newArr,
      answer: data.answer
    }
    setQuestionArr([...questionArr, newObj])
    reset();
    setCounter(counter - 1)
    // const newResponse = await createMCQQuestion(newObj)
  }
  useEffect(() => {
    handleRequest(questionArr)
  }, [questionArr])

  const handleRequest = async (configData) => {
    if (configData.length >= 5) {
      const config = {
        examName: examName,
        expirationDate: expirationDate,
        author: state.auth?.id,
        status: 'new',
        question: questionArr
      }
      const response = await createMCQQuestion(token, config)
      if (response.status === 'success') {
        setMessage(response.message)
      }
    }
  }
  const handleNavigate = () => {
    if (message.length) {
      Navigate('/teacher')
    }
  }
  return (
    <div className='container'>

      {
        message.length > 0 ?

          <div className='d-flex justify-content-center flex-column'>
            <p className='text-success text-center fs-3'>{message}</p>
            <p>Wann go home page? Link the Button</p>
            <button className="btn btn-primary mb-3" onClick={handleNavigate}>Go Home</button>
          </div>
          :
          <form onSubmit={handleSubmit(onSubmit)} className='bg-light py-5 px-3 shadow-sm rounded'>
            <div className="mb-3 row">
              <label htmlFor="quizname" className="col-sm-2 col-form-label">Quiz Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="quizname" {...register("quizname", { required: true })} />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="quiz" className="">Multiple Quiz</label>
              <div className='row ms-5 my-2'>
                <div className="col-6 my-2">
                  <input type="text" className="form-control" id="quiz"  {...register("a", { required: true })} />
                </div>
                <div className="col-6 my-2">
                  <input type="text" className="form-control" id="quiz"  {...register("b", { required: true })} />
                </div>
                <div className="col-6 my-2">
                  <input type="text" className="form-control" id="quiz"  {...register("c", { required: true })} />
                </div>
                <div className="col-6 my-2">
                  <input type="text" className="form-control" id="quiz"  {...register("d", { required: true })} />
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="answer" className="col-sm-2 col-form-label">Quiz Answer</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="answer" {...register("answer", { required: true })} />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mb-3" >Next</button>
            </div>
          </form>
      }

    </div>
  )
}
