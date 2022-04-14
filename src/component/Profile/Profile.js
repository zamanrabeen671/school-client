/* eslint-disable no-unused-vars */
// import { yupResolver } from '@hookform/resolvers/yup';
import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
// import * as Yup from 'yup';
import { profileUpdate } from '../../api/Authentication';
import { DataContext } from '../../Context/GlobalState';
import Header from '../Common/Header';

export default function Profile() {
  const [state] = useContext(DataContext);
  const [message, setMessage] = useState('')
  const routingObj = {
    home: `/${state.auth?.role}`,
    course: `/${state.auth?.role}/course`,
    mcq: `/${state.auth?.role}/mcq`
  }
  // const formSchema = Yup.object().shape({
  //   password: Yup.string()
  //     .min(6, 'Password length should be at least 6 characters'),
  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref('password')], 'Passwords must and should match'),
  // })
  const token = sessionStorage.getItem('token')
  // const validationOpt = { resolver: yupResolver(formSchema) }
  const { register, handleSubmit, formState: { errors } , reset} = useForm();
  const onSubmit = async (data) => {
    const config = {
      id: state.auth.id,
      username: data.username,
      password: data.password,
    }
    const response = await profileUpdate(token, config)
    if(response.status === 'success') {
      setMessage('Your Profile Successfully updated')
      reset()
      setTimeout(() => {
        setMessage('')
      },5000)
    }
  };
  return (
    <div>
      <Header routingObj={routingObj} />
      <div className='container'>

        <div className='text-center' style={{ color: '#fd7e14' }}>
          <h2>Hey, You are {state.auth.username} !</h2>
          <p className='fs-3 text-secondary'>your email is <span className='fw-bold' style={{ color: '#fd7e14' }}>{state.auth.email}</span> <small className='text-muted fs-6 ms-2'>you can't change your email</small></p>
          <p className='fs-3'> your are an <span className='fw-bold'>{state.auth?.status}</span> user</p>
        </div>
        <div>
          {message.length > 0 && <p className='text-success text-center'>{message}</p>}
          <h4>You can change your password and username</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">User Name</label>
              <input type="text" className="form-control" {...register("username")} id="userName" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input type="password" className="form-control" {...register("password")} id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" {...register("confirmPassword")} id="confirmPassword" />
              {/* <p className="text-danger">{errors.confirmPassword && "password did  not match"}</p> */}
            </div>
            <button type="submit" className="btn btn-info px-3 py-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}
