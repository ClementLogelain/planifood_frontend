import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Context from '../context/context'

const AuthedRoutes = () => {
    const { user } = useContext(Context);
    const authed = user == null;
    return authed ? (
    <Outlet />
    ) : (
    <Navigate to="/" />
    )
}

export default AuthedRoutes;