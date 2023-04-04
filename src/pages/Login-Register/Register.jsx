import React from 'react';
import './Register.css';
import avatar from '../images/avatar.png';

const Register = () => {
    return (
        <div className='inputWrapper' >
            <div className='inputForm' >
                <h1>Chat</h1>
                <p>Register</p>
                <input type='text' placeholder='your name...' />
                <input type='text' placeholder='email...' />
                <input type='password' placeholder='password...' />
                <input style={{display: 'none'}} type='file' id='file' />
                <label htmlFor='file'>
                    <img src={avatar} alt='' />
                    <span>Add avatar</span>
                </label>
                <button>Sign up</button>
                <p>Do you have an account? Login</p>
            </div>
        </div>
    );
};

export default Register;