import React from 'react';
import {useSelector} from "react-redux";
import {Route} from "react-router";

const UserRoute = ({children, ...rest}) => {
    const {user} = useSelector(state => ({...state}));

    return user && user.token ? (
        <Route {...rest} render={() => children}/>
    ) : (
        <h4 className='text-danger'>Loading...</h4>
    )
}

export default UserRoute;
