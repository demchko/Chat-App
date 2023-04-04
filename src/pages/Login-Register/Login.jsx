import React, {useState} from 'react';
import './Register.css';
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/firebase";

const Login = () => {

    const [err, setErr] = useState(false);
    const nav = useNavigate();

    const submitLogin = async e => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const passwd = e.target.elements.password.value;

        try {
            await signInWithEmailAndPassword(auth, email, passwd);
            nav('/');
        } catch (err){
            setErr(true);
        }
    }


    return (
        <div className='wrapper'>
            <div className='inputWrapper' >
                <form className='inputForm' onSubmit={submitLogin} >
                    <h1>Chat</h1>
                    <p>Login</p>
                    <input type='text' name='email' placeholder='your email...' />
                    <input type='password' name='password' placeholder='password...' />

                    <button>Sign in</button>
                    {err && <span>Something went wrong</span>}
                    <p>Don't you have an account? <Link to={'/register'}>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;