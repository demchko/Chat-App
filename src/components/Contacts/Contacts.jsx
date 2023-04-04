import React, {useContext, useEffect, useState} from 'react';
import {doc, onSnapshot} from "firebase/firestore";
import style from './Contacts.module.css';
import {db} from "../../firebase/firebase";
import {AuthContext} from "../../context/AuthContext";
import {ChatContext} from "../../context/ChatContext";

const Contacts = () => {

    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = () => {
            const unsub = onSnapshot(doc(db, "userChat", currentUser.uid), (item) => {
                setContacts(item.data())
            });

            return () => {
                unsub();
            }
        }

        currentUser.uid && getContacts();
    }, [currentUser.uid]);

    const handleSelect = user => {
        dispatch({type:"CHANGE_USER", payload: user})
    }

    return (
        <div className={style.list} >
            <p>Your chats</p>
            {
                Object.entries(contacts)?.sort((a, b) => b[1].date - a[1].date)?.map(item => (
                    <div className={style.block} key={item[0]} onClick={() => handleSelect(item[1].userInfo)} >
                        <img src={item[1].userInfo.photoURL} />
                        <div>
                            <span>{item[1].userInfo.displayName}</span>
                            {item[1].lastMessage && <p style={{fontSize: '12px'}}>{item[1].lastMessage.text}</p>}
                        </div>
                    </div>
                ))
            }

        </div>
    );
};

export default Contacts;