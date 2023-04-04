import React, {useContext} from 'react';
import style from './Sidebar.module.css';
import Navbar from "../Navbar/Navbar";
import {signOut} from 'firebase/auth';
import {auth} from "../../firebase/firebase";
import {AuthContext} from "../../context/AuthContext";

const Sidebar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className={style.sidebar} >
            <div className={style.info} >
                <img src={currentUser.photoURL} />
                <p>{currentUser.displayName}</p>
                <button onClick={() => signOut(auth)} >Logout</button>
            </div>
            <Navbar />
        </div>
    );
};

export default Sidebar;