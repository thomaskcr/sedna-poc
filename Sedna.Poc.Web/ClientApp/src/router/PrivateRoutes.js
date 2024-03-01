import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import userStore from "../store/userStore"

export const PrivateRoutes = () => {
    return userStore(state => state.signedIn)
        ? <Outlet />
        : <Navigate to="/login" />
}