import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContext } from "../context";
import Login from "../pages/Login";
import Posts from "../pages/Posts";
import { publicRoutes, privateRoutes } from "../router/routes";
import Loader from "./UI/Loader/Loader";

const Approuter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }
    
    return (
        isAuth 
            ? 
            <Routes>
                {privateRoutes.map((route) => (
                    <Route
                        element={<route.element />}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Route exact path="*" element={<Posts />} />
            </Routes>
            : 
            <Routes>
                {publicRoutes.map((route) => (
                    <Route
                        element={<route.element />}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                ))}
                <Route exact path="*" element={<Login />} />
            </Routes>
    )}

export default Approuter;
