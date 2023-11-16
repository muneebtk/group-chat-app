import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

function AuthorPrivateRoute() {
    let { user } = useContext(AuthContext)
    return (
        user && user.is_active ? <Outlet /> : <Navigate replace to='/' />
    )
}

export default AuthorPrivateRoute