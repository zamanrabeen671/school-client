import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { getRegister } from '../api/Authentication';
export default function Registration() {
    const [loader, setLoader] = useState(false)
    const Navigate = useNavigate();
    const formSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password length should be at least 4 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must and should match'),
    })

    const validationOpt = { resolver: yupResolver(formSchema) }
    const { register, handleSubmit, formState: { errors } } = useForm(validationOpt);
    const onSubmit = async (data) => {
        setLoader(true)
        const config = {
            username: data.username,
            email: data.email,
            phone: data.phone,
            password: data.password,
            role: data.role
        }
        const reply = await getRegister(config)
        if (reply.status === 'success') {
            Navigate(`/login`)
        }
        console.log(reply)
    };
    return (
        <div className='d-flex justify-content-center align-items-center mt-3'>
            <div className='w-80 bg-light px-5 py-2 rounded shadow-sm'>
                <div>
                    <h2>Hi, Welcome to Online-School</h2>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                        <label for="exampleInputEmail1" className="form-label">User Name</label>
                        <input type="text" className="form-control" {...register("username", { required: true })} />
                    </div>
                    <div className="mb-2">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" {...register("email", { required: true })} />
                    </div>
                    <div className="mb-2">
                        <label for="phoneNumber" className="form-label">Phone Number</label>
                        <input type="text" className="form-control" id="phoneNumber" {...register("phone", { required: true })} />
                    </div>
                    <div className="mb-2">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" {...register("password", { required: true })} />
                    </div>
                    <div className="mb-2">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" {...register("confirmPassword", { required: true })} />
                        <p className="text-danger">{errors.confirmPassword && "password is not match"}</p>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="teacher" {...register("role", { required: true })} />
                        <label class="form-check-label" for="exampleRadios1">
                            Signup as a teacher
                        </label>
                    </div>
                    <div class="form-check mb-2">
                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="student" {...register("role", { required: true })} />
                        <label class="form-check-label" for="exampleRadios2">
                            signup as a student
                        </label>
                    </div>
                    {
                        loader ? <button className="btn btn-primary" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button> : <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </form>
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
