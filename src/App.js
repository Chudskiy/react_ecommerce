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

const App = () => {
    const dispatch = useDispatch();

    // to take firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();

                // console.log('user = ', user);

                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    }
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
