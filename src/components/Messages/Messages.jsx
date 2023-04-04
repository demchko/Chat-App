import React, {useContext, useEffect, useState} from 'react';
import Message from "../Message/Message";
import style from './Messages.module.css';
import {ChatContext} from "../../context/ChatContext";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const Messages = () => {

    const {data} = useContext(ChatContext);

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (item) => {
            item.exists() && setMessages(item.data().messages);
        });

        return () => {
            unsub();
        }
    }, [data.chatId]);

    return (
        <div className={style.messages} >
            {
                messages.map(item => {
                    return <Message message={item} key={item.id}/>
                })
            }
        </div>
    );
};

export default Messages;