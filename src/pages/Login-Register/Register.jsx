import React, {useState} from 'react';
import './Register.css';
import avatar from '../../images/avatar.png';
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc, collection} from "firebase/firestore"
import {Link, useNavigate} from "react-router-dom";


const Register = () => {

    const [err, setErr] = useState(false);
    const nav = useNavigate();

    const submitRegister = async e => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const passwd = e.target[2].value;
        const file = e.target[3].files[0];
        if (!file) {
            // handle error: file not selected
            return;
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, passwd);

            const storageRef = ref(storage, `${displayName}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // handle upload progress
                },
                (error) => {
                    // handle upload error
                    setErr(true);
                },
                () => {
                    // get download URL and update user profile
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(collection(db, "users"), res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(collection(db, "userChat"), res.user.uid), {});
                        nav('/Chat-App');
                    });
                }
            );
        } catch (err){
            setErr(true);
        }
    }

    return (
        <div className='wrapper' >
            <div className='inputWrapper' >
                <form className='inputForm' onSubmit={submitRegister} >
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
                    {err && <span>Something went wrong...</span>}
                    <p>Do you have an account? <Link to='/Chat-App/login'>Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;