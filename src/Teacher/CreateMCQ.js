/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { DataContext } from '../Context/GlobalState';
import CreateMCQBody from './CreateMCQBody';

let quizs = [];
export default function CreateMCQ() {
  const { register, handleSubmit, reset } = useForm();
  const [state] = useContext(DataContext)
  const [counter, setCounter] = useState(0)
  const [questionShow, setQuestionShow] = useState(false)
  const [questionArr, setQuestionArr] = useState([])
  const [questionHeader, setQuestioinHeader] = useState({})
  const onSubmit = async (data) => {

    const newObj = {
      examName: data.examName,
      expirationDate: data.expirationDate
    }
    setQuestioinHeader(newObj)
    setQuestionShow(true)
    // if (quizs.length >= 5) {
    //   setCounter(5);
    //   const config = {
    //     examName: data.examName,
    //     expirationDate: data.expirationDate,
    //     author: state.auth?.id,
    //     status: 'new',
    //     question: quizs
    //   }
    //   const response = await createMCQQuestion(config)
    //   if(response) quizs = [];
    // }
    // const newResponse = await createMCQQuestion(newObj)
  }
  return (
    <div className='container'>
      <div className='text-center py-3'>
        <h2>Create MCQ Question Exam</h2>
        <h6>You can create only 5 MCQ Question</h6>
      </div>
      {
        questionShow ?
          <CreateMCQBody questionHeader={questionHeader} />
          :

          <form onSubmit={handleSubmit(onSubmit)} className='bg-light py-5 px-3 shadow-sm rounded'>
            <div className=''>
              <div className="mb-3 row">
                <label htmlFor="quizname" className="col-sm-2 col-form-label">Name of Exan</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="quizname" {...register("examName", { required: true })} />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="expirationDate" className="col-sm-2 col-form-label">Expirtion Date</label>
                <div className="col-sm-10">
                  <input type="date" className="form-control" id="expirationDate" data-date-format="YYYY MM DD" {...register("expirationDate", { required: true })} />
                </div>
              </div>

              <div className="mb-3 row">
                <label htmlFor="comment" className="col-sm-2 col-form-label">Comment</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" id="comment" {...register("comment", { required: true })} />
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mb-3">Next</button>
            </div>
          </form>
      }

    </div>
  )
}
