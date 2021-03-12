import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import {Route} from "react-router";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdmin} from "../../functions/auth";

const AdminRoute = ({children, ...rest}) => {
    const {user} = useSelector(state => ({...state}));
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    console.log('current admin res = ', res)
                    setOk(true);
                })
                .catch(error => {
                    console.log('error = ', error);
                    setOk(false);
                })
        }
    }, [user])

    return ok ? (
        <Route {...rest}/>
    ) : (
        <LoadingToRedirect />
    )
};

export default AdminRoute;
