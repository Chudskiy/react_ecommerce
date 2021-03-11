import {Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Header from "./components/nav/Header";
import {useDispatch} from "react-redux";
import {auth} from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {createOrUpdateUser, currentUser} from "./functions/auth";

const App = () => {
    const dispatch = useDispatch();

    // to take firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                // console.log('user = ', user);

                currentUser(idTokenResult.token)
                    .then(res => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            }
                        })
                    })
                    .catch(error => {
                        console.log('error = ', error);
                    })
            }
        })

        // cleanup
        return () => unsubscribe();

    }, [dispatch])

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/register' component={Register}/>
                <Route exact path='/register/complete' component={RegisterComplete}/>
                <Route exact path='/forgot/password' component={ForgotPassword}/>
            </Switch>
        </>
    );
}

export default App;
