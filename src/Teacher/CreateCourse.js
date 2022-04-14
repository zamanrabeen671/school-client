import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { createCourse } from '../api/Courses';
import { DataContext } from '../Context/GlobalState';
export default function CreateCourse() {
  const [messageShow, setMessageShow] = useState(false)
  const [state] = useContext(DataContext)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, reset } = useForm();
  const token = sessionStorage.getItem('token')
  const onSubmit = async (data) => {
    const config = {
      coursetitle: data.coursetitle,
      expirationDate: data.expirationDate,
      description: data.description,
      instructor: state.auth.id
    }
    const reply = await createCourse(token, config)
    if (reply.status === 'success') {
      setMessageShow(true)
      setMessage(reply.message)
      setTimeout(() => {
        setMessageShow(false)
      }, 1500)
      reset();
    }
  };
  return (
    <div className='container bg-light py-2 my-2 shadow-sm rounded'>
      {messageShow && <div className='text-center'>
        <p className='text-primary'>{message}</p>
      </div>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3 mt-3">
          <label htmlFor="courseName" className="col-sm-2 col-form-label">Course Title</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="courseName" {...register("coursetitle", { required: true })} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="courseName" className="col-sm-2 col-form-label">Expiration Date</label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id="courseName" data-date-format="YYYY MM DD" {...register("expirationDate", { required: true })} />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="courseDetails" className="col-sm-2 col-form-label">Description</label>
          <div className="col-sm-10">
            <textarea className="form-control" id="courseDetails" rows="3" {...register("description", { required: true })}></textarea>
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <button type="submit" className="btn btn-primary">Done</button>
        </div>
      </form>
    </div>
  )
}
