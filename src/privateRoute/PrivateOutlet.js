import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
export default function PrivateOutlet() {
    const user = {id: 101, name: 'sourab'}
  return user ? <Outlet /> : <Navigate to="/login" />
}
