/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { getLogin } from '../api/Authentication';
import { DataContext } from '../Context/GlobalState';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const [loader, setLoader] = useState(false)
    const [state, dispatch] = useContext(DataContext);
    const Navigate = useNavigate();
    const onSubmit = async (data) => {
        setLoader(true)
        const config = {
            email: data.email,
            password: data.password,
        }
        const reply = await getLogin(config)
        if (reply.status === 'success') {
            setLoader(false)
            dispatch({ type: 'AUTH', payload: reply.signedInUser })
            sessionStorage.setItem('token', reply.token)
            sessionStorage.setItem('user', JSON.stringify(reply.signedInUser))
            Navigate(`/${reply.signedInUser?.role}`)
        }
        else{
            setLoader(false)
        }
    };
    return (
        <div className='d-flex justify-content-center align-items-center mt-5 '>
            <div className='w-80 bg-light px-4 py-2 rounded shadow-sm'>
                <div>
                    <h2>Hi, Welcome Back</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("email", { required: true })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" {...register("password", { required: true })} />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    {
                        loader ?
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            : <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </form>
                <Link to="/registration">Registration</Link>
            </div>
        </div>
    )
}
