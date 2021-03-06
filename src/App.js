import {Route, Switch} from "react-router-dom";
import {useEffect} from "react";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import Header from "./components/nav/Header";
import History from "./pages/user/History";
import {useDispatch} from "react-redux";
import {auth} from "./firebase";
import ForgotPassword from "./pages/auth/ForgotPassword";
import {currentUser} from "./functions/auth";
import UserRoute from "./components/routes/UserRoute";
import Wishlist from "./pages/user/Wishlist";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";

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

                <UserRoute exact path='/user/history' component={History}/>
                <UserRoute exact path='/user/password' component={Password}/>
                <UserRoute exact path='/user/wishlist' component={Wishlist}/>

                <AdminRoute exact path='/admin/dashboard' component={AdminDashboard}/>
                <AdminRoute exact path='/admin/category' component={CategoryCreate}/>
                <AdminRoute exact path='/admin/category/:slug' component={CategoryUpdate}/>

                <AdminRoute exact path='/admin/sub' component={SubCreate}/>
                <AdminRoute exact path='/admin/sub/:slug' component={SubUpdate}/>

                <AdminRoute exact path='/admin/product' component={ProductCreate}/>
                <AdminRoute exact path='/admin/products' component={AllProducts}/>
                <AdminRoute exact path='/admin/product/:slug' component={ProductUpdate}/>

                <Route exact path='/product/:slug' component={Product}/>
            </Switch>
        </>
    );
}

export default App;
