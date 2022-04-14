import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/Common/Header'
import { DataContext } from '../Context/GlobalState'

export default function AdminLayout({children}) {
    const [state] = useContext(DataContext)
    const routingObj = {
        home: `/${state.auth?.role}`,
        course: `/${state.auth?.role}`,
        mcq: `/${state.auth?.role}`
    }
  return (
    <div>
        <Header routingObj={routingObj} />
        {children}
        <Outlet />
    </div>
  )
}
