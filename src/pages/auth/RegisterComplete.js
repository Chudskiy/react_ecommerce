import React, {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import {auth} from "../../firebase";
import {useDispatch} from "react-redux";
import {createOrUpdateUser} from "../../functions/auth";


const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setEmail(localStorage.getItem('emailForRegistration'));
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        if(!email || !password) {
            toast.error('Email and password is required');
            return;
        }

        if(password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href,
            );

            if (result.user.emailVerified) {
                // remove user email from local storage
                localStorage.removeItem('emailForRegistration');

                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);

                const idTokenResult = await user.getIdTokenResult();

                // redux store
                createOrUpdateUser(idTokenResult.token)
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

                // redirect
                history.push('/');
            }

        } catch (error) {
            console.log('error = ', error);
            toast.error(error.message);
        }
    }

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control'
                value={email}
                disabled
            />

            <br />
            <input
                type='password'
                className='form-control'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='password'
                autoFocus
            />

            <br/>

            <button className='btn btn-raised'>
                Complete Registration
            </button>
        </form>
    )

    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;


