import React from 'react';
import style from './Home.module.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Chat from "../../components/Chat/Chat";

const Home = () => {
    return (
        <div className={style.home} >
            <div className={style.container} >
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
};

export default Home;