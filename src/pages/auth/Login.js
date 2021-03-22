import React, {useState, useEffect} from 'react';
import {Button} from "antd";
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify';
import {GoogleOutlined, MailOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";


const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        const intended = history.location.state;
        if (intended) {
            return;
        } else {
            if (user && user.token) {
                history.push('/');
            }
        }
    }, [user, history])

    const dispatch = useDispatch();

    const roleBasedRedirect = (res) => {
        // check if intended
        const intended = history.location.state;
        if (intended) {
            history.push(intended.from);
        } else {
            if (res.data.role === 'admin') {
                history.push('/admin/dashboard');
            } else {
                history.push('/user/history');
            }
        }

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then(res => {
                    console.log('RESPONSE = ', res);
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
                    roleBasedRedirect(res);
                })
                .catch(error => {
                    console.log('error = ', error);
                })
            // history.push('/');

        } catch (error) {
            console.log('error = ', error);
            toast.error(error.message);
            setLoading(false);
        }
    }

    const googleLogin = async () => {
        await auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const {user} = result;
                const idTokenResult = await user.getIdTokenResult();

                // console.log('user = ', user);

                createOrUpdateUser(idTokenResult.token)
                    .then(res => {
                        console.log('RESPONSE = ', res);
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
                        roleBasedRedirect(res);
                    })
                    .catch(error => {
                        console.log('error = ', error);
                    })

                // history.push('/');
            })
            .catch(error => {
                console.log('error = ', error);
                toast.error(error.message);
            })
    }

    const loginForm = () => <form>
        <div className="form-group">
            <input
                type='email'
                value={email}
                placeholder='Enter your email'
                onChange={e => setEmail(e.target.value)}
                className='form-control'
                autoFocus
            />
        </div>
        <div className="form-group">
            <input
                type='password'
                value={password}
                placeholder='Enter your password'
                onChange={e => setPassword(e.target.value)}
                className='form-control'
                autoFocus
            />
        </div>
        <br/>
        <Button
            onClick={handleSubmit}
            type='primary'
            shape='round'
            size='large'
            className='mb-3'
            block
            icon={<MailOutlined/>}
            disabled={!email || password.length < 6}
        >
            Login with Email/Password
        </Button>
    </form>

    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className='text-danger'>Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type='danger'
                        shape='round'
                        size='large'
                        className='mb-3'
                        block
                        icon={<GoogleOutlined/>}
                    >
                        Login with Google
                    </Button>

                    <Link
                        to='/forgot/password'
                        className='float-right text-danger'
                    >
                        Forgot Password
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default Login;
