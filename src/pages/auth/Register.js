import React, {useState, useEffect} from 'react';
import {toast} from "react-toastify";
import {auth} from "../../firebase";
import {useSelector} from "react-redux";

const Register = ({history}) => {
    const [email, setEmail] = useState('');

    const {user} = useSelector(state => ({...state}));

    useEffect(() => {
        if (user && user.token) {
            history.push('/');
        }
    }, [history, user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        try {
            await auth.sendSignInLinkToEmail(email, config);
        } catch (error) {
            console.error(error)
        }
        toast.success(
            `Email is send to ${email}. Click the link to complete your registration.`
        )

        // save user email in local storage
        localStorage.setItem('emailForRegistration', email);

        setEmail('');
    }

    const registerForm = () => <form onSubmit={handleSubmit}>
        <input
            type='email'
            className='form-control'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='Your email'
            autoFocus
        />

        <br/>

        <button className='btn btn-raised'>
            Register
        </button>
    </form>

    return (
        <div className='container p-5'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    {registerForm()}
                </div>
            </div>
        </div>
    );
};

export default Register;

