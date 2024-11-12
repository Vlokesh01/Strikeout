// PrivateRoutes.js
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    const auth = localStorage.getItem("accessToken"); // Get token from local storage
    return auth ? <Outlet /> : <Navigate to='/login' />; // If token exists, render Outlet, else redirect
};

export default PrivateRoutes;
