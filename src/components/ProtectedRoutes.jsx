/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedUserValidationRoutes({ children, isAllowed }) {
  if (!isAllowed) {
    return <Navigate to="/login" />
  } else return children ? children : <Outlet />
}

export function ProtectedRoutes({ children, isAllowed, redirectTo = '/' }) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  } else return children ? children : <Outlet />
}
