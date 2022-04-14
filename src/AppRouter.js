import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import UserDetails from './admin/UserDetails';
import Profile from './component/Profile/Profile';
import AdminLayout from './Layout/AdminLayout';
import StudentLayout from './Layout/StudentLayout';
import TeacherLayout from './Layout/TeacherLayout';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Registration from './pages/Registration';
import StduentHome from './pages/StduentHome';
import TeacherHome from './pages/TeacherHome';
import PrivateOutlet from './privateRoute/PrivateOutlet';
import EnrollCourse from './Student/EnrollCourse';
import MCQForm from './Student/MCQForm';
import ParticipendMCQ from './Student/ParticipendMCQ';
import CreateCourse from './Teacher/CreateCourse';
import CreateMCQ from './Teacher/CreateMCQ';
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route element={<PrivateOutlet />} >
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Admin />} />
                    <Route path='user/:id' element={<UserDetails />} />
                </Route>
                <Route path="student" element={<StudentLayout />} >
                    <Route index element={<StduentHome />} />
                    <Route path='course' element={<EnrollCourse />} />
                    <Route path='mcq' element={<ParticipendMCQ />} />
                    <Route path="exam/:id" element={<MCQForm />} />
                </Route>
                <Route path="teacher" element={<TeacherLayout />}>
                    <Route index element={<TeacherHome />} />
                    <Route path='course' element={<CreateCourse />} />
                    <Route path="mcq" element={<CreateMCQ />} />
                </Route>
                <Route path='/profile' element={<Profile />} />
            </Route>
        </Routes>
    )
}
